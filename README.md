# 📑 Peer Review PWA

> **Estatus del Proyecto:** Incremento 1 Finalizado ✅

---

## 🏗️ Arquitectura

La aplicación sigue un modelo de responsabilidades separadas para garantizar la mantenibilidad:

* **Capa de Presentación**: `index.html` + UI Controller.
* **Capa de Lógica**: `ArticleManager.js`.
* **Capa de Persistencia**: `ArticleStorage.js` (basado en **IndexedDB**).
* **Estilos**: `styles.css` con enfoque *responsive design*.
* **PWA**: `manifest.json` + `icon.svg` + `sw.js`.

---

## ✨ Características

| Feature | Detalle |
| :--- | :--- |
| **MVP Cumplido** | Subida de artículos como autor. |
| **Validación** | Título obligatorio y restricción técnica a PDFs. |
| **Persistencia** | Almacenamiento local mediante IndexedDB. |
| **Responsive** | Diseño adaptativo *Mobile-first*. |
| **PWA Ready** | Instalable y con capacidades *Offline*. |
| **Tecnologías** | Estándares modernos: HTML5, CSS3 y ES6. |

---

## 🚀 Instrucciones para Probar

### 1. Abrir la aplicación
Para habilitar las funciones de PWA, se recomienda servir los archivos:
```bash
# Opción con Python:
python -m http.server 8000
```
# O utilizar la extensión "Live Server" en VS Code.

## Flujo de Datos

1. **Usuario** completa formulario → **UI Controller**
2. **ArticleManager** valida datos → **ArticleStorage**
3. **IndexedDB** guarda artículo → **Retorna ID**
4. **UI** muestra mensaje éxito con ID

## Limitaciones Conocidas

- **Solo PDFs**: Restrición a archivos PDF únicamente
- **Sin backend**: Persistencia local (IndexedDB) únicamente
- **Sin revisión real**: Simulación del proceso de revisión
- **Sin multi-usuario**: Diseñado para uso individual

## Tecnologías Utilizadas

- **HTML5**: Semántica, formularios, PWA
- **CSS3**: Variables CSS, flexbox, responsive
- **ES6**: async/await, clases, módulos
- **IndexedDB**: Almacenamiento local estructurado
- **PWA**: Manifest, service worker ready
