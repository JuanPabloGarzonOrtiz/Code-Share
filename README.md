# Code-Share
Plataforma web para compartir proyectos de desarrolladores de forma simple y visual.

## Estado del Proyecto
En desarrollo

## Descripción General
Este proyecto corresponde al Front-end público de una plataforma orientada a desarrolladores de software que desean compartir sus proyectos y explorar los de otros, con un enfoque mucho más visual, social y accesible. Especialmente pensado para quienes encuentran plataformas como GitHub demasiado técnicas o complejas.

## ¿Cómo funciona?
Este proyecto está compuesto por dos partes principales:

### 1. Front-end — *(Este repositorio público)*
- Desarrollado con: `HTML`, `CSS` y `JavaScript`.
- Desplegado directamente en: `GitHub Pages`.
- Integra autenticación por: `GitHub OAuth`.
- Permite visualizar:
  - Perfiles de usuarios.
  - Proyectos publicados (principalmente los que usan GitHub Pages).

### 2. Back-end (privado)
- Python (Flask)
- PostgreSQL
- Render (Deployment)
- GitHub API

## Organización del Proyecto
```
Code-Share-Front-end/
│
├── index.html                 # Página principal (Feed de proyectos y bienvenida)
├── README.md                  # Documentación del proyecto
│
└── resources/                 # Recursos estáticos y plantillas visuales
    │
    ├── css/                   # Hojas de estilo CSS
    │   ├── style-index.css         # Estilos específicos de la página principal (Index)
    │   ├── style-profile.css       # Estilos de la página de perfil de usuario
    │   ├── style-search.css        # Estilos de la página de búsqueda de resultados
    │   └── style-shared.css        # Estilos compartidos entre varias páginas 
    │
    ├── images/                # Imágenes estáticas
    │   ├── icon_Page.png           # Logo del proyecto
    │   └── Index.png               # Imagen provisional usada en desarrollo
    │
    ├── js/                    # Scripts JavaScript
    │   ├── partials.js             # Inserción de componentes HTML reutilizables 
    │   └── requestsServer.js       # Gestión de solicitudes al backend e integración dinámica de datos
    │
    └── views/                 # Vistas/plantillas HTML secundarias
        ├── profile.html            # Página de perfil personal del usuario
        └── search.html             # Página de resultados de búsqueda

```


## Objetivo Principal de esta Fase
- Crear un espacio donde desarrolladores puedan logearse con GitHub.
- Mostrar sus proyectos (preferentemente hosteados en GitHub Pages).
- Mostrar perfiles visuales.
- Explorar proyectos de otros usuarios.
- Sistema básico de búsqueda de perfiles.

## Próximos Pasos
- Mejorar las páginas de perfil.
- Sistema de búsqueda más avanzado.
- Interacción social (likes, comentarios).
- Integrar otras plataformas además de GitHub Pages.

## Nota Importante
> El Back-end de este proyecto es privado por motivos de seguridad, ya que contiene credenciales y configuraciones sensibles (GitHub OAuth Client ID & Secret).
