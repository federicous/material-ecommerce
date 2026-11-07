import { availableModules } from './moduleAccess';
const urls = { ADMINISTRADOR: 'https://shop.test:8081', GESTION: 'https://shop.test:8082' };
test('shows separate buttons only for granted modules', () => {
  expect(availableModules({ isAdmin: 'on', isManagement: 'on' }, urls).map(item => item.id)).toEqual(['admin', 'management']);
  expect(availableModules({ isAdmin: true, isManagement: 'off' }, urls).map(item => item.id)).toEqual(['admin']);
  expect(availableModules({ isAdmin: false, isManagement: true }, urls).map(item => item.id)).toEqual(['management']);
  expect(availableModules({ isAdmin: false, isManagement: false }, urls)).toEqual([]);
  expect(availableModules(null, urls)).toEqual([]);
});

test('launchers enter protected screens using the existing shared session',()=>expect(availableModules({isAdmin:true,isManagement:true},urls).map(item=>item.href)).toEqual(['https://shop.test:8081/ordenes','https://shop.test:8082/facturas']));
