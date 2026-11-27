import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ItemListContainer from './ItemListContainer';

jest.mock('axios');
jest.mock('../ItemList/ItemList', () => ({ products }) =>
  products.map(product => <div key={product.name}>{product.name}</div>)
);

const category = 'TORNILLO AUTOPERFORANTE C/ARANDELA HEXAGONAL MECHA';
const categoryPath = encodeURIComponent(category);

function renderCategory(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/category/:category" element={<ItemListContainer />} />
        <Route path="/:lista/category/:category" element={<ItemListContainer />} />
      </Routes>
    </MemoryRouter>
  );
}

beforeEach(() => {
  axios.mockReset();
});

test('conserva la barra codificada una sola vez y carga los productos', async () => {
  axios.mockResolvedValueOnce({ data: { allProducts: [{ name: 'Tornillo' }], total: 1 } });
  const path = `/buloneria%20bremen/category/${categoryPath}`;
  renderCategory(path);

  expect(screen.getByRole('heading').textContent).toBe(category);
  await screen.findByText('Tornillo');
  expect(axios).toHaveBeenCalledTimes(1);
  expect(axios.mock.calls[0][0].url).toContain(`/api/products${path}?page=1&pageSize=12`);
});

test('un 404 de la categoría detiene la carga y no pide la página siguiente', async () => {
  axios.mockRejectedValueOnce({ response: { status: 404 } });
  const originalObserver = window.IntersectionObserver;
  const observer = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
  window.IntersectionObserver = observer;
  try {
    renderCategory(`/buloneria%20bremen/category/${categoryPath}`);

    expect(screen.getByRole('progressbar')).toBeTruthy();
    expect((await screen.findByRole('alert')).textContent).toMatch(/No se pudieron cargar/);
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(axios).toHaveBeenCalledTimes(1);
    expect(observer).not.toHaveBeenCalled();
  } finally {
    window.IntersectionObserver = originalObserver;
  }
});

test('usa el endpoint sin marca cuando la ruta no tiene lista', async () => {
  axios.mockResolvedValueOnce({ data: { allProducts: [], total: 0 } });
  renderCategory('/category/REMACHE');

  await screen.findByText('Sin productos en esta categoría');
  expect(axios.mock.calls[0][0].url).toContain('/api/products/category/REMACHE?page=1&pageSize=12');
});
