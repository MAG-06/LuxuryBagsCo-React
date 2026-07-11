# LuxuryBagsCo

Aplicación frontend (SPA) para una tienda en línea de bolsos de lujo, con gestión de carrito y usuarios mediante almacenamiento local.

---

## Resumen técnico

| Componente | Tecnología |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite |
| **Backend** | N/A (Lógica en capa de servicios) |
| **Base de datos** | `localStorage` (Simulada) |
| **ORM** | N/A |
| **Autenticación** | Implementación propia (Local) |
| **Despliegue** | N/A |

---

## Características

* Visualización del catálogo de productos y detalles específicos de cada artículo.
* Gestión de carrito de compras (agregar, eliminar, previsualización desplegable).
* Registro e inicio de sesión de usuarios (persistencia local).
* Gestión de perfil de usuario.
* Flujo completo de pago y generación de factura.
* Panel de administración interno (múltiples versiones).
* Aplicación de promociones y cupones de descuento.
* Integración con APIs externas (DummyJSON / MyMemory) para consumo de frases traducidas.

---

## Arquitectura

La aplicación sigue una arquitectura basada en componentes (React) y utiliza el patrón de diseño de capa de servicios. Dado que no existe un backend real, los componentes visuales interactúan con clases de servicio (`UserService`, `BolsoService`) que encapsulan toda la lógica de negocio y actúan como un puente directo al almacenamiento local del navegador (`localStorage`).

---

## Flujo de la aplicación

1. El usuario accede a una ruta de la SPA (por ejemplo, `/`) gestionada por `react-router-dom`.
2. El componente React correspondiente (`Index.tsx`) renderiza la interfaz y solicita datos (ej. lista de bolsos) a su servicio asociado (`BolsoService`).
3. El servicio consulta el `localStorage`, procesa las entidades tipadas y devuelve la información al componente.
4. Cualquier acción del usuario (ej. agregar al carrito) desencadena el servicio pertinente, el cual muta el estado localmente, provocando un re-renderizado automático en la interfaz gráfica.

---

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* React Router DOM
* ESLint

---

## Módulos principales

* **Catálogo y Productos**: Páginas de listado y detalle que consumen servicios de productos almacenados localmente.
* **Carrito y Checkout**: Lógica para gestionar la orden actual del usuario, pasarela de pago simulada y renderizado de factura.
* **Usuarios**: Sistema de autenticación simulada, registro y gestión de perfiles de usuario activo.
* **Administración**: Vistas protegidas lógicamente para la gestión del inventario y estado general de la tienda.

---

## Buenas prácticas implementadas

* Separación por capas (UI vs Servicios)
* Service Pattern
* Tipado estricto mediante Modelos/Entidades (TypeScript)

---

## Estructura del proyecto

```text
src/
├── assets/          # Recursos estáticos (imágenes, íconos)
├── components/      # Componentes UI reutilizables (Header, ProductCard, etc.)
├── css/             # Archivos de estilos globales y específicos
├── models/          # Interfaces y clases de dominio (Persona, Bolso, Carrito)
├── pages/           # Vistas principales asociadas a rutas
├── services/        # Lógica de persistencia local y llamadas a API externa
└── utils/           # Funciones utilitarias de soporte
```

---

## Requisitos previos

* Node.js
* npm (o cualquier gestor de paquetes compatible)

---

## Instalación

```bash
npm install
```

---

## Ejecución

Para iniciar el servidor de desarrollo local:

```bash
npm run dev
```

---

## Scripts disponibles

| Script | Comando | Descripción |
| :--- | :--- | :--- |
| `dev` | `vite` | Inicia el servidor de desarrollo de Vite con Hot Module Replacement (HMR). |
| `build` | `tsc -b && vite build` | Compila el código TypeScript y empaqueta la aplicación para producción. |
| `lint` | `eslint .` | Ejecuta el linter sobre los archivos del proyecto para verificar reglas de código. |
| `preview` | `vite preview` | Inicia un servidor local para previsualizar el build de producción. |
