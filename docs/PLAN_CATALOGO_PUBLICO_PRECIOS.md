# Plan de Implementación: Catálogo Público de Productos, Visibilidad de Precios por Administrador y Login para Pedidos

Este documento registra la arquitectura y los cambios planificados para permitir que cualquier usuario pueda navegar y ver los productos sin iniciar sesión, configurar la visibilidad de precios desde el panel de administración (por defecto ocultos) y requerir el inicio de sesión cuando un usuario no autenticado intente realizar un pedido.

## Repositorios e Estrategia de Ramas Git
Se utilizó la rama `feature/catalogo-publico-precios` en cada uno de los 3 repositorios:
- **Frontend Tienda**: [material-ecommerce](../../React/material-ecommerce) -> Rama: `feature/catalogo-publico-precios`
- **Backend API**: [express-ecommerce](../../Backend/express-ecommerce) -> Rama: `feature/catalogo-publico-precios`
- **Panel Administrador**: [admin-react](../../React/admin-react) -> Rama: `feature/catalogo-publico-precios`

---

## Decisiones de Diseño y Requerimientos
1. **Peticiones anónimas en Backend**: Se adaptó el backend para que rutas de lectura como `/api/products/...`, `/api/categorias/...`, `/api/search/...`, `/api/ofertas/...`, `/api/novedades/...` y `/api/promo` respondan adecuadamente a peticiones públicas (sin requerir token obligatorio).
2. **Configuración en Backend y Panel Administrador**: Se creó una configuración global persistente (`mostrarPreciosPublicos`) en el backend accesible por el panel administrador (`admin-react`) para alternar la visibilidad de precios para visitantes anónimos (valor por defecto: `false` / precios ocultos).
3. **Flujo de Inicio de Sesión al comprar**: Al intentar presionar "Agregar al carrito" o ingresar a `/cart` o `/order` sin estar logueado, se notifica al usuario (*"Debe iniciar sesión para realizar un pedido"*) y se lo redirige a la pantalla de Login.
4. **Leyenda de Precios Ocultos**: Cuando la configuración de precios públicos está deshabilitada y el usuario no ha iniciado sesión, los precios se reemplazan por *"Inicie sesión para ver precio"*.
