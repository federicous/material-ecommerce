# Guía de Uso e Integración: Codebase Memory MCP (`codebase-memory-mcp`)

Este documento detalla la configuración, arquitectura, almacenamiento y comandos para aprovechar al máximo **`codebase-memory-mcp`** en el ecosistema de proyectos de ecommerce (Frontend Tienda, Backend Express y Panel de Administración).

---

## 📌 ¿Qué es `codebase-memory-mcp`?

[`codebase-memory-mcp`](https://github.com/DeusData/codebase-memory-mcp) es un servidor de **Model Context Protocol (MCP)** de alto rendimiento que indexa el código fuente de los repositorios en un **grafo de conocimiento local**.

En lugar de que la IA lea miles de líneas de código y gaste tokens de contexto de forma innecesaria:
1. Analiza el AST (árbol sintáctico mediante Tree-sitter) de JavaScript, React, Node.js, etc.
2. Identifica funciones, componentes, esquemas, controladores, rutas y dependencias.
3. Conecta proyectos mediante **Cross-Repo Intelligence** (por ejemplo, llamadas `fetch`/`axios` en el frontend vinculadas a los endpoints de Express en el backend).
4. Permite a la IA consultar la arquitectura y dependencias en **<10 ms**.

---

## 📁 Repositorios Vinculados

| Proyecto | Ruta Local | Descripción |
| :--- | :--- | :--- |
| **Frontend Tienda** | `/home/yemes/Documentos/Codehouse/React/material-ecommerce` | Aplicación pública de catálogo, carrito y compras con Material-UI |
| **Backend API** | `/home/yemes/Documentos/Codehouse/Backend/express-ecommerce` | API REST en Node.js/Express, Mongoose y MongoDB |
| **Admin Panel** | `/home/yemes/Documentos/Codehouse/React/admin-react` | Panel de gestión y administración en React |

---

## 🗄️ Dónde se Guarda la Información

### 1. Grafo y Bases de Datos Locales
Los datos del grafo se persisten en formato SQLite optimizado en:
```bash
~/.cache/codebase-memory-mcp/
├── _config.db                                                       # Configuración global
├── home-yemes-Documentos-Codehouse-Backend-express-ecommerce.db     # Base de datos del backend (~13 MB)
├── home-yemes-Documentos-Codehouse-React-admin-react.db             # Base de datos del admin (~5.5 MB)
├── home-yemes-Documentos-Codehouse-React-material-ecommerce.db      # Base de datos del frontend (~4.6 MB)
└── logs/                                                            # Logs de indexación y escaneo
```

### 2. Configuración del Servidor MCP (Antigravity & IDEs)
Ubicación del archivo de configuración global:
- `~/.gemini/config/mcp_config.json`

Contenido:
```json
{
  "mcpServers": {
    "codebase-memory-mcp": {
      "command": "/home/yemes/.local/bin/codebase-memory-mcp",
      "args": []
    }
  }
}
```

### 3. Binario Ejecutable
- `~/.local/bin/codebase-memory-mcp`

---

## 🛠️ Herramientas Disponibles para la IA

Cuando interactúas con la IA (Antigravity, Claude, etc.), el asistente cuenta con las siguientes herramientas MCP:

- **`search_graph(project, name_pattern)`**: Busca funciones, componentes, clases, variables o rutas por patrón regex.
- **`trace_path(project, function_name, direction)`**: Traza la cadena de llamadas (`inbound` para ver quién la llama, `outbound` para ver qué funciones invoca).
- **`get_code_snippet(project, qualified_name)`**: Extrae el código fuente exacto de una función/componente sin leer el archivo completo.
- **`get_architecture(project, aspects)`**: Retorna un resumen de la arquitectura, puntos de entrada, dependencias, rutas y hotspots.
- **`query_graph(project, query)`**: Permite ejecutar consultas directas en lenguaje Cypher sobre los nodos y aristas del grafo.
- **`check_index_coverage(project, paths)`**: Valida la cobertura del grafo sobre archivos específicos.
- **`detect_changes(project)`**: Detecta archivos modificados desde la última indexación.
- **`list_projects()`**: Muestra la lista de proyectos indexados y sus rutas.

---

## 💻 Comandos CLI Útiles

Puedes ejecutar comandos directamente desde la terminal con `codebase-memory-mcp cli <herramienta>`:

### 1. Ver Proyectos Indexados
```bash
codebase-memory-mcp cli list_projects
```

### 2. Re-indexar un Proyecto Manualmente
```bash
# Reindexar backend en modo full
codebase-memory-mcp cli index_repository \
  --repo-path /home/yemes/Documentos/Codehouse/Backend/express-ecommerce \
  --mode full

# Reindexar frontend tienda
codebase-memory-mcp cli index_repository \
  --repo-path /home/yemes/Documentos/Codehouse/React/material-ecommerce \
  --mode full

# Reindexar panel admin
codebase-memory-mcp cli index_repository \
  --repo-path /home/yemes/Documentos/Codehouse/React/admin-react \
  --mode full
```

### 3. Actualizar Relaciones Cruzadas (Cross-Repo Intelligence)
Para vincular llamadas HTTP y rutas compartidas entre los proyectos:
```bash
echo '{
  "repo_path": "/home/yemes/Documentos/Codehouse/React/material-ecommerce",
  "mode": "cross-repo-intelligence",
  "target_projects": [
    "home-yemes-Documentos-Codehouse-Backend-express-ecommerce",
    "home-yemes-Documentos-Codehouse-React-admin-react"
  ]
}' | codebase-memory-mcp cli index_repository
```

### 4. Consultar Configuración
```bash
codebase-memory-mcp config list
```

### 5. Iniciar o Consultar el Visualizador Web 3D
El servidor incluye una interfaz gráfica interactiva accesible en el navegador:
- URL: [http://localhost:9749](http://localhost:9749)
- Si deseas cambiar el puerto o activarlo/desactivarlo:
```bash
codebase-memory-mcp config set ui_port 9749
codebase-memory-mcp config set ui_enabled true
```

---

## 🔄 Sincronización Automática (`auto_watch` / `auto_index`)

El servidor tiene habilitados:
- **`auto_index = true`**: Indexa automáticamente cuando se inicia una sesión de trabajo.
- **`auto_watch = true`**: Monitorea cambios en los archivos fuente para mantener el grafo actualizado en segundo plano mientras programas.

---

## ❓ Preguntas Frecuentes y Solución de Problemas

1. **¿Qué hacer si agrego un nuevo proyecto a la solución?**
   Ejecuta:
   ```bash
   codebase-memory-mcp cli index_repository --repo-path /ruta/al/nuevo/proyecto --mode full
   ```
2. **¿Cómo limpiar o resetear la base de datos de un proyecto?**
   ```bash
   codebase-memory-mcp cli delete_project --name <nombre-del-proyecto>
   ```
   O bien eliminando el archivo `.db` correspondiente en `~/.cache/codebase-memory-mcp/`.
