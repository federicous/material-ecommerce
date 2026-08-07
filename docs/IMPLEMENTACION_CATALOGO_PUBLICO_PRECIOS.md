# Documentación de Implementación: Catálogo Público, Precios Configurables y Login para Pedidos

Este documento detalla todos los cambios aplicados en los 3 proyectos del ecosistema para dar soporte al catálogo público de productos, la administración de visibilidad de precios y el requisito de autenticación para realizar pedidos.

---

## 1. Backend (`express-ecommerce`)
- **Rama**: `feature/catalogo-publico-precios`
- **Modelo y Esquema MongoDB**:
  - `schema/configuracion.js`: Almacena configuraciones clave-valor del sistema (ej. `mostrarPreciosPublicos`).
- **Endpoints de Configuración**:
  - `components/configuracion/index.js`
  - `components/configuracion/controllers/configuracionController.js`
  - `components/configuracion/services/configuracionService.js`
  - `GET /api/config/public-prices` (acceso público): Retorna `{ mostrarPreciosPublicos: boolean }` (default `false`).
  - `POST /PUT /api/config/public-prices` (protegido por `Autenticacion.administrador`): Guarda la configuración.
- **Acceso Público a Endpoints GET**:
  - Removido `Autenticacion.usuario` en endpoints GET de `products`, `categorias`, `search`, `ofertas`, `novedades` y `promo`.
  - En `components/permisos/controllers/permisosController.js`, `GET /permisos/nivel` retorna `false` cuando no hay token activo en lugar de error `401 Unauthorized`.

---

## 2. Panel Administrador (`admin-react`)
- **Rama**: `feature/catalogo-publico-precios`
- **Vista de Configuración**:
  - `src/components/Configuracion/Configuracion.jsx`: Interfaz con Switch de MUI para que el administrador active o desactive la visibilidad de precios públicos en vivo mediante `POST /api/config/public-prices`.
- **Integración con Menú Lateral**:
  - `src/components/Drawer/Drawer.jsx`: Agregada la opción "Configuración" con ícono de tuerca y la ruta `/configuracion`.

---

## 3. Frontend Tienda Público (`material-ecommerce`)
- **Rama**: `feature/catalogo-publico-precios`
- **Rutas Públicas y Navegación**:
  - `src/App.js`: Se convirtieron en públicas las rutas `/home`, `/category/:category`, `/brand/:brand`, `/ofertas`, `/novedades`, `/detail/:sku`, `/search/...`. Se mantuvieron protegidas `/cart`, `/order` y `/downloads`.
- **Gestión de Contexto de Precios**:
  - `src/components/CartContext/CartContext.js`: Consulta `GET /api/config/public-prices` y expone la variable calculada `canViewPrice = Boolean(token) || Boolean(showPublicPrices)`.
- **Visualización Condicional de Precios**:
  - `src/components/Item/Item.jsx`, `src/components/Item/ItemHorizontal.jsx` e `src/components/ItemDetail/ItemDetail.jsx`: Muestran el precio sólo si `canViewPrice` es `true`; de lo contrario muestran *"Inicie sesión para ver precio"*.
- **Control al Comprar**:
  - `src/components/ItemCount/ItemCount2.jsx` e `src/components/ItemCount/ItemCountHorizontal.jsx`: Si un usuario no logueado intenta agregar productos al carrito, muestra *"Debe iniciar sesión para realizar un pedido"* y redirige a la pantalla de login (`/`).
- **Navegación por Categorías y Drawer**:
  - `src/components/NavBar/NavBar.jsx`, `src/components/NavBar/PermanentDrawer2.jsx`, `src/components/NavBar/TemporaryDrawer.jsx`, `src/components/Category/CategoryCollapse.jsx`, `Category2.jsx` y `CategoryTekbond.jsx`: Permiten la carga pública de categorías y subcategorías por marca, y despliegan un botón destacado "Iniciar Sesión" en la barra de navegación cuando no hay una sesión activa.
