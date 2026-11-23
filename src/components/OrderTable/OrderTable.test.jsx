import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import OrderTable from './OrderTable';
const mockGet = jest.fn();

jest.mock('axios');
jest.mock('universal-cookie', () => jest.fn().mockImplementation(() => ({get: name => name === 'user' ? 'test' : 'token'})));
jest.mock('../utils/apiQuery/apiQuery', () => jest.fn().mockImplementation(() => ({get: (...args) => mockGet(...args)})));
test('expanding an order displays only the recipient status and explains provider acceptance', async () => {
  const id = '6b03ac423080ded40be349a0';
  mockGet.mockImplementation(url => Promise.resolve(url.includes('/my-notification') ? {status:'accepted'} : {dolar:1}));
  axios.mockResolvedValue({data:[{_id:id,timestamp:Date.now(),productList:[{id:'p',code:'1',name:'Prueba',qty:1}]}]});
  render(<OrderTable />);
  fireEvent.click(await screen.findByRole('button',{name:'expand row'}));
  expect(await screen.findByText(/Correo aceptado por el proveedor/)).toHaveTextContent('Esto no confirma su recepción');
  expect(mockGet).toHaveBeenCalledWith(`/api/order/${id}/my-notification`);
});
