import React from 'react';
import {render} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import AlertMessage from './AlertMessage';
import {CartContext} from '../CartContext/CartContext';
test('does not clear local cart when server could not safely clean it',()=>{const clearLocalCart=jest.fn();render(<CartContext.Provider value={{clearLocalCart}}><MemoryRouter initialEntries={[{pathname:'/alert/123',state:{cleanupPending:true}}]}><Routes><Route path="/alert/:message" element={<AlertMessage/>}/></Routes></MemoryRouter></CartContext.Provider>);expect(clearLocalCart).not.toHaveBeenCalled()});
test('clears local cart after confirmed cleanup',()=>{const clearLocalCart=jest.fn();render(<CartContext.Provider value={{clearLocalCart}}><MemoryRouter initialEntries={['/alert/123']}><Routes><Route path="/alert/:message" element={<AlertMessage/>}/></Routes></MemoryRouter></CartContext.Provider>);expect(clearLocalCart).toHaveBeenCalledTimes(1)});
