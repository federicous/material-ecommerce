import React from 'react';
import {render,screen} from '@testing-library/react';
import {MemoryRouter,useLocation} from 'react-router-dom';
import Busqueda from './Busqueda';
import {ThemeProvider,createTheme} from '@material-ui/core/styles';
function Location(){return <div data-testid="location">{useLocation().pathname}</div>}
test('mounting the empty search does not redirect the login screen',()=>{window.history.replaceState({},'', '/login');render(<ThemeProvider theme={createTheme()}><MemoryRouter initialEntries={['/login']}><Busqueda/><Location/></MemoryRouter></ThemeProvider>);expect(screen.getByTestId('location').textContent).toBe('/login');window.history.replaceState({},'', '/');});
