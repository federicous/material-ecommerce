import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import NotificationAdmin from './NotificationAdmin';
jest.mock('axios');
test('only retries after explicit confirmation', async () => {
  axios.mockImplementation(({method,url}) => {
    if (method === 'get' && url.endsWith('/pending')) return Promise.resolve({data:[{ordenId:'123',email:'client@example.com',status:'review',attempts:1}]});
    if (method === 'get') return Promise.resolve({data:{status:'review',recipients:[{address:'client@example.com',status:'unknown'}]}});
    return Promise.resolve({data:{status:'pending'}});
  });
  window.confirm=jest.fn().mockReturnValue(false);
  render(<NotificationAdmin />);
  fireEvent.click(await screen.findByText('Ver detalle'));
  fireEvent.click(await screen.findByText('Reintentar notificación'));
  expect(window.confirm).toHaveBeenCalled();
  expect(axios.mock.calls.filter(([x]) => x.method === 'post')).toHaveLength(0);
  window.confirm.mockReturnValue(true);
  fireEvent.click(screen.getByText('Reintentar notificación'));
  await waitFor(() => expect(axios.mock.calls.filter(([x]) => x.method === 'post')).toHaveLength(1));
});

test('shows an error when the notification queue cannot be loaded', async () => {
  axios.mockReset();
  axios.mockRejectedValue(new Error('forbidden'));
  render(<NotificationAdmin />);
  expect(await screen.findByText(/No se pudo consultar la cola/)).toBeInTheDocument();
});

test('loads older notifications with the final order as cursor', async () => {
  axios.mockReset();
  const rows = Array.from({length:100}, (_, i) => ({ordenId: String(i).padStart(24, '0'), email:'x@example.com', status:'pending', attempts:1}));
  axios.mockImplementation(({url}) => Promise.resolve({data:url.includes('?before=') ? [] : rows}));
  render(<NotificationAdmin />);
  fireEvent.click(await screen.findByText('Ver anteriores'));
  await waitFor(() => expect(axios.mock.calls.some(([arg]) => arg.url.includes(`before=${rows[99].ordenId}`))).toBe(true));
});
