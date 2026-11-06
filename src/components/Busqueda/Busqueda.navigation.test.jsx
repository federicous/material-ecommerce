import React from 'react';
import {render,screen} from '@testing-library/react';
import {MemoryRouter,useLocation} from 'react-router-dom';
import Busqueda from './Busqueda';
function Location(){return <div data-testid="location">{useLocation().pathname}</div>}
test('mounting the empty search does not redirect the login screen',()=>{window.history.replaceState({},'', '/login');render(<MemoryRouter initialEntries={['/login']}><Busqueda/><Location/></MemoryRouter>);expect(screen.getByTestId('location').textContent).toBe('/login');window.history.replaceState({},'', '/');});
