# Categorías con barras en Apache

El título de una categoría puede contener una barra literal, p. ej. `TORNILLO AUTOPERFORANTE C/ARANDELA HEXAGONAL MECHA`. En los enlaces públicos y en los endpoints de Express el nombre debe ocupar un único segmento, por lo que la barra viaja como `%2F`.

## Diagnóstico

- En producción, tanto el enlace directo a la tienda (:443) como la consulta pública de productos (:8088) respondieron 404 de Apache. El error de API no incluye encabezado CORS porque Express no recibe esa solicitud.
- La misma consulta de productos contra Express por loopback (:18089) devolvió HTTP 200 y un total de 11. El control con la categoría `REMACHE` por :8088 también devolvió HTTP 200.
- En un Apache 2.4 local con rewrite SPA y proxy inverso, los dos 404 se reprodujeron con la configuración predeterminada. Con `NoDecode`, la tienda entregó `index.html` y el proxy pasó `%2F` intacto al backend simulado.

## Configuración aplicada

Agregar la siguiente directiva **dentro de cada uno de los dos VirtualHost de BRM Tools**, no globalmente:

```apacheconf
AllowEncodedSlashes NoDecode
```

Rutas activas observadas (confirmar con `apache2ctl -S` antes de desplegar):

- Tienda :443: `/etc/apache2/sites-enabled/brmtools-admin-le-ssl.conf` (el nombre histórico del archivo no corresponde al DocumentRoot activo).
- API :8088: `/etc/apache2/sites-enabled/brmtools-mvp-api-8088.conf`.

Con el bloque `<Location />` de producción, el proxy general vuelve a codificar `%2F` como `%252F`. En :8088, agregar antes del `ProxyPass` general una excepción con `nocanon` solo para rutas de categoría con barra codificada. El grupo de captura incluye la query para preservar la paginación. La validación del host y el proxy general quedan intactos.

```apacheconf
ProxyPassMatch "^(/api/products/(?:[^/?]+/)?category/[^/?]*%2[Ff][^/?]*(?:[?].*)?)$" http://127.0.0.1:18089$1 connectiontimeout=5 timeout=120 retry=0 nocanon
```

Evitar `AllowEncodedSlashes On`: la barra debe llegar codificada a Express, no convertirse en separador de ruta. Referencia: [documentación de Apache](https://httpd.apache.org/docs/2.4/mod/core.html#allowencodedslashes).

## Validación de un despliegue

El cambio de Apache permite servir los enlaces existentes sin reconstruir la tienda. La protección frontend contra el bucle se puede desplegar aparte, sobre la revisión activa de producción.

1. Respaldar ambos archivos activos y trasladar la directiva a la configuración operativa versionada correspondiente.
2. Verificar con `apache2ctl configtest` antes de recargar Apache de forma segura. Este cambio no requiere reiniciar PM2.
3. Abrir el enlace directo y navegar a la categoría desde el menú. Comprobar que se ven productos y que la API devuelve 200 con JSON y encabezado CORS para el origen de la tienda. Verificar también una categoría sin barra y los endpoints de salud de BRM Tools.
4. Si aparece una regresión, restaurar ambos respaldos, volver a validar la configuración y recargar.

Respaldo del despliegue: `/opt/brmtools-mvp/recovery/category-slash-scoped-20261127T155447Z-KT1g`. La prueba pública posterior devolvió los 11 productos de la categoría.
