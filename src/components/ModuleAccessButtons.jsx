import React from 'react';
import axios from 'axios';
import { Box, Button } from '@material-ui/core';
import { config } from '../config/config';
import { assertCookies, currentToken, SESSION_EVENT } from './sharedSession';
import { availableModules } from './moduleAccess';

export default function ModuleAccessButtons({ mobile = false }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    let requestSequence = 0;
    const refresh = async () => {
      const sequence = ++requestSequence;
      const token = currentToken();
      if (!token) { if (active) setUser(null); return; }
      try {
        assertCookies();
        const response = await axios({
          method: 'get',
          url: `${config.SERVER}/api/auth/session`,
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!active || sequence !== requestSequence || currentToken() !== token) return;
        setUser(response.data?.authenticated === true ? response.data.user : null);
      } catch (_) {
        if (active && sequence === requestSequence && currentToken() === token) setUser(null);
      }
    };
    const onSession = () => refresh();
    refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener(SESSION_EVENT, onSession);
    return () => {
      active = false;
      window.removeEventListener('focus', refresh);
      window.removeEventListener(SESSION_EVENT, onSession);
    };
  }, []);

  const modules = availableModules(user, {
    ADMINISTRADOR: config.ADMINISTRADOR,
    GESTION: config.GESTION,
  });
  if (!modules.length) return null;
  return (
    <Box style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: mobile ? 4 : 8, padding: mobile ? '8px 16px' : 0 }}>
      {modules.map(module => (
        <Button
          key={module.id}
          component="a"
          href={module.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={mobile ? 'text' : 'outlined'}
          color="inherit"
          size="small"
          style={{ justifyContent: mobile ? 'flex-start' : 'center', whiteSpace: 'nowrap' }}
        >
          Ingresar a {module.label}
        </Button>
      ))}
    </Box>
  );
}
