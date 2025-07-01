# GILIA Web Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Ant Design](https://img.shields.io/badge/AntDesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white)

## Descripción General

GILIA Web Frontend es la interfaz de usuario de la sitio web de GILIA, diseñada para la gestión, visualización y administración de información sobre proyectos, publicaciones, equipo, líneas de investigación, extensión y más. El sistema está dividido en dos grandes áreas: una sección pública accesible para todos los usuarios y una sección administrativa protegida para la gestión interna.

## Secciones y Componentes Principales

### Sección Pública (`src/components/public`)
- **Nosotros**: Información sobre el grupo, miembros y objetivos.
- **Home**: Página principal con animaciones, novedades, presentación y tarjetas destacadas.
  - Presentacion: Introducción y bienvenida (`HomePresentation.jsx`)
  - Novedades: Noticias y logros recientes (`HomeExploration.jsx`)
  - TarjetaNovedad: Tarjetas de novedades (`Card.jsx`)
- **Galeria**: Visualización de imágenes y recursos multimedia.
  - ContenedorGaleria, SeccionContenedorGaleria, SeccionGaleria, SeccionGalerie
- **DetallesLineaDeInvestigación**: Detalles de líneas de investigación específicas.
- **linea_extension**: Listado y detalles de líneas de extensión.
- **Loader**: Indicador de carga reutilizable.
- **Navbar**: Barra de navegación principal.
- **Proyectos**: Listado y detalle de proyectos.
- **Publicaciones**: Listado, filtro, paginación y detalle de publicaciones (`PostList.jsx`, `PostItem.jsx`, `PostFilter.jsx`, `PostPagination.jsx`).

### Sección Administrativa (`src/components/admin`)
- **AdminHome**: Dashboard de administración.
- **AdminLogin**: Pantalla de login para administradores.
- **AdminProyectos**: Gestión de proyectos.
- **AdminPublicaciones**: Gestión de publicaciones.
- **AdminLineasInvestigacion**: Gestión de líneas de investigación.
- **AdminGaleria**: Gestión de la galería multimedia.
- **AdminEquipo**: Gestión de miembros del equipo.
- **AdminConfiguracion**: Configuración avanzada del sistema.

### Componentes Compartidos (`src/components/shared`)
- **FuturisticStyles.css**: Estilos globales y temáticos reutilizables.

### Otros
- **ProtectedRoute.jsx**: Componente para proteger rutas privadas.

---

## Sistema de Mock Centralizado

Este proyecto implementa un sistema de mock centralizado para simular las respuestas de la API durante el desarrollo o pruebas. Todos los datos de prueba (mock data) se encuentran en el archivo `asyncMock.js` en la raíz del frontend. Los componentes obtienen los datos de prueba a través de funciones mock, lo que permite simular el comportamiento de la API real sin necesidad de un backend activo.

## Alternar entre Mock y API Real

El frontend utiliza una variable de entorno para decidir si debe usar los datos mock o conectarse a la API real:

- **Variable:** `VITE_USE_MOCK_DATA`
- **Ubicación:** Archivo `.env` o `.env.local` en la raíz del proyecto frontend.

### Ejemplo de uso en `.env`:

```
VITE_USE_MOCK_DATA=true   # Usa datos mock (ideal para desarrollo sin backend)
# VITE_USE_MOCK_DATA=false  # Usa la API real (requiere backend activo)
```

Si la variable no está definida, el sistema usará los datos mock por defecto en modo desarrollo.

## Ventajas
- Permite desarrollo y pruebas sin depender del backend.
- Los datos de prueba están centralizados y son fácilmente modificables.
- El cambio entre mock y API es inmediato, solo requiere modificar la variable de entorno y reiniciar el servidor de desarrollo.

## Estructura relevante
- `asyncMock.js`: Contiene todos los datos y funciones mock.
- `src/config/environment.js`: Define la lógica para leer la variable de entorno y exponer la configuración.
- `src/services/dataService.js`: Abstrae el acceso a datos y decide si usar mock o API real según la configuración.

---

Para más detalles, consulta los archivos mencionados o contacta al equipo de desarrollo. 
