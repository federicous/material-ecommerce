import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { config } from '../../config/config';

export default function NotificationAdmin() {
  const [rows, setRows] = React.useState([]);
  const [detail, setDetail] = React.useState(null);
  const [error, setError] = React.useState('');
  const [before, setBefore] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const request = (method, path, data) => axios({ method, url: `${config.SERVER}${path}`, data, withCredentials: true, headers: { Authorization: `Bearer ${new Cookies().get('token')}` } });
  const load = async (cursor = null) => {
    setError('');
    try { const response = await request('get', `/api/order/notifications/pending${cursor ? `?before=${cursor}` : ''}`); setRows(response.data); setBefore(cursor); }
    catch (_) { setError('No se pudo consultar la cola. Verificá tus permisos o intentá más tarde.'); }
  };
  React.useEffect(() => { load(before); const timer = setInterval(() => load(before), 60000); return () => clearInterval(timer); }, [before]); // eslint-disable-line react-hooks/exhaustive-deps
  const inspect = async id => {
    try { const response = await request('get', `/api/order/${id}/notification`); setDetail({ id, ...response.data }); }
    catch (_) { setError('No se pudo consultar la notificación.'); }
  };
  const retry = async () => {
    if (!window.confirm('Algunos destinatarios podrían haber recibido el correo. ¿Confirmás que revisaste el caso y querés reintentar?')) return;
    setBusy(true); setError('');
    try { await request('post', `/api/order/${detail.id}/notification/retry`, { acknowledgeDuplicateRisk: true }); setDetail(null); await load(); }
    catch (_) { setError('No se pudo programar el reintento. Actualizá el estado antes de volver a intentar.'); }
    finally { setBusy(false); }
  };
  return <Box sx={{ width: '100%', my: 3 }}>
    <Typography variant="h5">Notificaciones de pedidos</Typography>
    <Typography>Las aceptadas por el proveedor no garantizan entrega en la bandeja.</Typography>
    {error && <Alert severity="error">{error}</Alert>}
    {rows.some(row => row.status === 'review') && <Alert severity="warning">Hay notificaciones que requieren revisión manual.</Alert>}
    <Button onClick={() => load()}>Actualizar</Button>{rows.length === 100 && <Button onClick={() => load(rows[rows.length - 1].ordenId)}>Ver anteriores</Button>}{before && <Button onClick={() => load()}>Volver al inicio</Button>}
    <Paper><Table size="small"><TableHead><TableRow><TableCell>Pedido</TableCell><TableCell>Cliente</TableCell><TableCell>Estado</TableCell><TableCell>Intentos</TableCell><TableCell /></TableRow></TableHead><TableBody>
      {rows.map(row => <TableRow key={row.ordenId}><TableCell>{row.ordenId}</TableCell><TableCell>{row.email}</TableCell><TableCell>{row.status}</TableCell><TableCell>{row.attempts}</TableCell><TableCell><Button onClick={() => inspect(row.ordenId)}>Ver detalle</Button></TableCell></TableRow>)}
    </TableBody></Table></Paper>
    {detail && <Box sx={{ my: 2 }}><Typography variant="h6">Pedido {detail.id}: {detail.status}</Typography><Typography>{detail.lastError || 'Sin error registrado'}</Typography>{(detail.recipients || []).map(r => <Typography key={r.address}>{r.address}: {r.status}</Typography>)}{detail.status === 'review' && <Button disabled={busy} variant="contained" onClick={retry}>Reintentar notificación</Button>}</Box>}
  </Box>;
}
