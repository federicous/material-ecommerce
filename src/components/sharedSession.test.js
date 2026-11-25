import Cookies from 'universal-cookie';
import axios from 'axios';
import {config} from '../config/config';
import {establishSession,currentToken,expireIfCurrent,closeSharedSession,clearSession,isAdministrator,isManagementUser,installSessionTransport} from './sharedSession';
jest.mock('axios',()=>({__esModule:true,default:Object.assign(jest.fn(),{interceptors:{request:{use:jest.fn()},response:{use:jest.fn()}}})}));
const cookies=new Cookies();
beforeEach(()=>{for(const n of ['token','user','IdVendedor'])cookies.remove(n,{path:'/'});axios.mockReset();});
test('administrator and management checks accept only explicit allowed flags',()=>{expect(isAdministrator({isAdmin:'on'})).toBe(true);expect(isAdministrator({isAdmin:true})).toBe(true);expect(isAdministrator({isAdmin:'off'})).toBe(false);expect(isAdministrator({isAdmin:1})).toBe(false);expect(isManagementUser({isManagement:'on'})).toBe(true);expect(isManagementUser({isManagement:true})).toBe(true);expect(isManagementUser({isAdmin:true,isManagement:'off'})).toBe(false);});
test('late401 retains renewed session',()=>{cookies.set('token','renewed',{path:'/'});expect(expireIfCurrent('old')).toBe(false);expect(currentToken()).toBe('renewed');});
test('confirmed shared close clears all three host cookies',async()=>{cookies.set('token','old',{path:'/'});cookies.set('user','operator',{path:'/'});cookies.set('IdVendedor','seller',{path:'/'});axios.mockResolvedValue({data:{browserClear:true,scope:'same-host-browser'}});await closeSharedSession();expect(currentToken()).toBeUndefined();expect(cookies.get('user')).toBeUndefined();expect(cookies.get('IdVendedor')).toBeUndefined();});
test('late close acknowledgement never erases a new identity',async()=>{cookies.set('token','old',{path:'/'});let release;axios.mockImplementation(()=>new Promise(r=>release=r));const pending=closeSharedSession();cookies.set('token','renewed',{path:'/'});release({data:{browserClear:true,scope:'same-host-browser'}});await expect(pending).rejects.toThrow('sesión cambió');expect(currentToken()).toBe('renewed');});
test('unknown logout scope does not clear valid cookies',async()=>{cookies.set('token','valid',{path:'/'});axios.mockResolvedValue({data:{browserClear:true,scope:'foreign-domain'}});await expect(closeSharedSession()).rejects.toThrow('alcance');expect(currentToken()).toBe('valid');});
test('transport rejects old headers before sending under a changed actor',()=>{cookies.set('token','actor',{path:'/'});installSessionTransport();const prepare=axios.interceptors.request.use.mock.calls[0][0];expect(()=>prepare({url:config.SERVER+'/api/order',headers:{Authorization:'Bearer other'},method:'post'})).toThrow('sesión cambió');const prepared=prepare({url:config.SERVER+'/api/order',headers:{},method:'post'});expect(prepared.headers.Authorization).toBe('Bearer actor');expect(prepared.withCredentials).toBe(true);});

test.each([[28800, 28800], [3600, 3600], [undefined, 3600], [86400, 3600], [-1, 3600], ['28800', 3600]])(
  'stores login cookies consistently for reported lifetime %p',
  (sessionMaxAgeSeconds, maxAge) => {
    const set = jest.spyOn(Cookies.prototype, 'set');
    try {
      establishSession({token: 'signed', email: 'buyer@example.test', IdVendedor: 'seller', sessionMaxAgeSeconds});
      const options = {path: '/', secure: false, sameSite: 'lax', maxAge};
      expect(set.mock.calls).toEqual([
        ['token', 'signed', options],
        ['user', 'buyer@example.test', options],
        ['IdVendedor', 'seller', options],
      ]);
      expect(currentToken()).toBe('signed');
    } finally {
      set.mockRestore();
    }
  }
);
