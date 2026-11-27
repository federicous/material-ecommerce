import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import ItemListContainerSearch from './ItemListContainerSearch';
import ItemListContainerSearchDrawer from './ItemListContainerSearchDrawer';

jest.mock('axios');
jest.mock('../ItemList/ItemList', () => ({ products }) =>
  products.map(product => <div key={product.name}>{product.name}</div>)
);

const originalObserver = window.IntersectionObserver;
let observers;

beforeEach(() => {
  axios.mockReset();
  observers = [];
  window.IntersectionObserver = jest.fn(callback => {
    const observer = { callback, observe: jest.fn(), disconnect: jest.fn() };
    observers.push(observer);
    return observer;
  });
});

afterEach(() => {
  window.IntersectionObserver = originalObserver;
});

function renderSearch(path) {
  function NextSearch() {
    const navigate = useNavigate();
    return <button onClick={() => navigate('/search/martillo')}>Nueva búsqueda</button>;
  }
  render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter initialEntries={[path]}>
        <NextSearch />
        <Routes>
          <Route path="/search/:patron" element={<ItemListContainerSearch />} />
          <Route path="/searchDrawer" element={<ItemListContainerSearchDrawer />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

function intersect(observer) {
  observer.callback([{ isIntersecting: true }]);
}

test('un 400 para (t7 apaga el indicador y no activa la siguiente página', async () => {
  axios.mockRejectedValueOnce({ response: { status: 400 } });
  renderSearch('/search/(t7');

  expect(screen.getByRole('progressbar')).toBeTruthy();
  expect((await screen.findByRole('alert')).textContent).toMatch(/No se pudo completar/);
  expect(screen.queryByRole('progressbar')).toBeNull();
  expect(axios).toHaveBeenCalledTimes(1);
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test('un fallo en la página 2 conserva resultados y cambiar de término reinicia en página 1', async () => {
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Taladro' }], total: 24 } });
  axios.mockRejectedValueOnce(new Error('Sin conexión'));
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Martillo' }], total: 1 } });
  renderSearch('/search/taladro');

  await screen.findByText('Taladro');
  act(() => {
    intersect(observers[0]);
    intersect(observers[0]);
  });
  expect((await screen.findByRole('alert')).textContent).toMatch(/No se pudieron cargar más/);
  expect(screen.getByText('Taladro')).toBeTruthy();
  expect(screen.queryByRole('progressbar')).toBeNull();
  expect(axios.mock.calls.map(([request]) => request.url.split('/api/search/')[1])).toEqual([
    'taladro?page=1&pageSize=12',
    'taladro?page=2&pageSize=12',
  ]);
  expect(observers).toHaveLength(1);

  fireEvent.click(screen.getByText('Nueva búsqueda'));
  await screen.findByText('Martillo');
  expect(screen.queryByText('Taladro')).toBeNull();
  expect(screen.queryByRole('alert')).toBeNull();
  expect(axios.mock.calls[2][0].url).toContain('/martillo?page=1&');
});

test('una respuesta vacía no activa la paginación', async () => {
  axios.mockResolvedValueOnce({ data: { allProducts: [], total: 0 } });
  renderSearch('/search/inexistente');

  await screen.findByText('Sin resultados');
  expect(axios).toHaveBeenCalledTimes(1);
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test.each(['/search/ab', '/searchDrawer'])('no consulta a la API con un término insuficiente: %s', path => {
  renderSearch(path);
  expect(axios).not.toHaveBeenCalled();
  expect(screen.queryByRole('progressbar')).toBeNull();
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
});

test('agrega resultados de la página siguiente y se detiene al llegar al total', async () => {
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Taladro' }], total: 13 } });
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Mecha' }], total: 13 } });
  renderSearch('/search/taladro');

  await screen.findByText('Taladro');
  act(() => intersect(observers[0]));

  await screen.findByText('Mecha');
  expect(screen.getByText('Taladro')).toBeTruthy();
  expect(screen.getByText('No hay más productos')).toBeTruthy();
  expect(axios).toHaveBeenCalledTimes(2);
  expect(observers).toHaveLength(1);
});

test('cancela la búsqueda anterior e ignora su error si llega tarde', async () => {
  let failPrevious;
  axios.mockImplementationOnce(() => new Promise((resolve, reject) => { failPrevious = reject; }));
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Martillo' }], total: 1 } });
  renderSearch('/search/taladro');

  fireEvent.click(screen.getByText('Nueva búsqueda'));
  await screen.findByText('Martillo');
  expect(axios.mock.calls[0][0].signal.aborted).toBe(true);
  await act(async () => failPrevious(new Error('Error tardío')));
  expect(screen.getByText('Martillo')).toBeTruthy();
  expect(screen.queryByRole('alert')).toBeNull();
});
