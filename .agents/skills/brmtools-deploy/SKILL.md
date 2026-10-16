---
name: brmtools-deploy
description: Procedimiento seguro y paso a paso para compilar, verificar y desplegar BRM Tools (Frontend React en /var/www/brmtools y Backend Express en PM2 sitecnia1) sin afectar los demás servicios del VPS compartido.
---

# 🚀 Skill de Despliegue de BRM Tools (VPS Compartido sitecnia1)

Este procedimiento describe el protocolo estandarizado y seguro para desplegar actualizaciones de **BRM Tools** en el servidor de producción `sitecnia.com` (`sitecnia1`).

> [!CAUTION]
> **Servidor Compartido en Producción**:
> `sitecnia1` aloja múltiples servicios críticos en ejecución (`almafer-api`, `blasbike-api`, `pharus-backend`, `sitecnia-api`, etc.).
> - **NUNCA** ejecutar `pm2 restart all` ni `pm2 kill`.
> - **NUNCA** reiniciar Apache sin ejecutar previamente `apache2ctl configtest`.
> - **NUNCA** compilar React dentro del VPS (consume el 100% de CPU y los 2GB de RAM, provocando caídas de procesos por OOM-Killer).

---

## 🏗️ Arquitectura de Producción

| Componente | Dominio / URL | Ubicación en VPS | Proceso / Webserver |
| :--- | :--- | :--- | :--- |
| **Tienda Frontend** | `https://app.distribuidorabrmtools.com` | `/var/www/brmtools/` | Apache 2.4 (VirtualHost SSL :443) |
| **Admin Frontend** | `https://app.distribuidorabrmtools.com:8081` | `/var/www/brmtools-admin/` | Apache 2.4 (VirtualHost SSL :8081) |
| **Gestión Frontend**| `https://app.distribuidorabrmtools.com:8082` | `/var/www/brmtools-gestion/` | Apache 2.4 (VirtualHost SSL :8082) |
| **API Backend** | `https://app.distribuidorabrmtools.com:8088` | `/opt/node-servers/brmtools/express-ecommerce/` | PM2 (`brmtools-server`, puerto 8088) |
| **Base de Datos** | `127.0.0.1:27017` | Local VPS | MongoDB Service |

---

## 📋 Checklist Pre-Despliegue

1. **Estado Git Local**: Verificar que todo cambio esté commiteado y pusheado a GitHub en la rama activa.
2. **Ambiente Node Local**: Usar Node 16 (`nvm use 16`) para compilar `material-ecommerce` localmente.
3. **Conectividad SSH**: Verificar acceso sin password hacia `root@sitecnia.com`:
   ```bash
   ssh -o BatchMode=yes -o ConnectTimeout=5 root@sitecnia.com "echo SSH_OK"
   ```
4. **Inspección Previa del VPS**:
   ```bash
   ssh root@sitecnia.com "pm2 status brmtools-server && apache2ctl configtest"
   ```

---

## 🌐 Fase 1: Despliegue de Frontend (`material-ecommerce`)

### Paso 1.1: Generar el Build Localmente
```bash
cd /home/yemes/Documentos/Codehouse/React/material-ecommerce
source ~/.nvm/nvm.sh && nvm use 16
npm run build
```
*Asegurarse de que el directorio `build/` contenga `index.html` y los archivos estáticos generados sin errores.*

### Paso 1.2: Backup Rápido de Emergencia en el VPS
Antes de sobreescribir `/var/www/brmtools`, guardar una copia del build actual:
```bash
ssh root@sitecnia.com "if [ -d /var/www/brmtools ]; then cp -r /var/www/brmtools /var/www/brmtools_backup_prev; fi"
```

### Paso 1.3: Sincronización Segura vía rsync
```bash
rsync -azv --delete --progress --exclude='*.log' \
  /home/yemes/Documentos/Codehouse/React/material-ecommerce/build/ \
  root@sitecnia.com:/var/www/brmtools/
```

### Paso 1.4: Ajuste de Permisos y Recarga de Apache
```bash
ssh root@sitecnia.com "chown -R enredes:enredes /var/www/brmtools && apache2ctl configtest && systemctl reload apache2"
```

---

## ⚙️ Fase 2: Despliegue de Backend (`express-ecommerce`)

### Paso 2.1: Verificar Estado de Git en el VPS
```bash
ssh root@sitecnia.com "cd /opt/node-servers/brmtools/express-ecommerce && git status -s && git branch --show-current"
```
*Si existen cambios locales en el VPS (por ejemplo `package.json` con `xlsx`), guardarlos antes del pull:*
```bash
ssh root@sitecnia.com "cd /opt/node-servers/brmtools/express-ecommerce && git stash"
```

### Paso 2.2: Actualizar Código desde Repositorio Remoto
```bash
ssh root@sitecnia.com "cd /opt/node-servers/brmtools/express-ecommerce && git pull origin \$(git branch --show-current) && git stash pop || true"
```

### Paso 2.3: Actualizar Dependencias (si aplica)
Solo si se agregaron paquetes nuevos al `package.json`:
```bash
ssh root@sitecnia.com "cd /opt/node-servers/brmtools/express-ecommerce && npm install --production"
```

### Paso 2.4: Reinicio Seguro en PM2
Reiniciar **únicamente** el proceso de BRM Tools actualizando variables de entorno:
```bash
ssh root@sitecnia.com "pm2 reload brmtools-server --update-env || pm2 restart brmtools-server --update-env"
```

### Paso 2.5: Verificación Inmediata de Logs de Inicio
```bash
ssh root@sitecnia.com "pm2 logs brmtools-server --lines 25 --nostream"
```

---

## 🩺 Fase 3: Smoke Tests y Validación Post-Despliegue

Ejecutar validaciones automáticas para confirmar que el sistema responde correctamente:

```bash
# 1. Probar Frontend Storefront (debe responder HTTP 200)
curl -s -o /dev/null -w "%{http_code}\n" https://app.distribuidorabrmtools.com

# 2. Probar Backend API (debe responder JSON válido con dolar o productos)
curl -s https://app.distribuidorabrmtools.com:8088/api/dolar

# 3. Comprobar que ningún otro servicio de PM2 haya caído
ssh root@sitecnia.com "pm2 status"
```

---

## ⏪ Plan de Rollback (En caso de incidencias)

### Rollback del Frontend:
Si la nueva versión de React presenta pantallas blancas o errores:
```bash
ssh root@sitecnia.com "if [ -d /var/www/brmtools_backup_prev ]; then rm -rf /var/www/brmtools && cp -r /var/www/brmtools_backup_prev /var/www/brmtools && chown -R enredes:enredes /var/www/brmtools && systemctl reload apache2; fi"
```

### Rollback del Backend:
Si el backend no levanta o arroja errores críticos:
```bash
ssh root@sitecnia.com "cd /opt/node-servers/brmtools/express-ecommerce && git reset --hard HEAD@{1} && pm2 restart brmtools-server --update-env"
```
