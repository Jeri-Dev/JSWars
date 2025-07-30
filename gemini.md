# Gemini Project Configuration

## About This Project

JSWars es una plataforma interactiva para aprender y competir en desafíos de JavaScript. Los usuarios pueden agregar amigos, enviar y aceptar solicitudes de amistad, y crear guerras (salas) con IDs aleatorios. Dentro de estas guerras se alojan batallas, que son ejercicios prácticos de JavaScript. El sistema también cuenta con un dashboard para visualizar y gestionar la actividad del usuario.

Aunque el proyecto tiene backend, en esta etapa solo se trabajará en el **frontend**.

## Project Tech Stack

- **Frontend:**
  - Next.js
  - TypeScript
  - Material UI
  - Tailwind CSS

- **Backend:**
  - Deno
  - MongoDB
  - Prisma

- **Testing:**
  - *(No se están utilizando herramientas de testing por ahora)*

## Important Commands

- **Install dependencies:** `npm install`
- **Run development server:** `npm run dev`
- **Lint files:** `npm run lint`
- **Build for production:** `npm run build`

## Coding Style and Conventions

### Tipado y Código Limpio

- Siempre usar **TypeScript con tipado estricto**.
- No se permite el uso de `any`.
- Ninguna función, objeto o variable debe estar sin su tipo declarado.
- No se usan `;` al final de líneas.
- Desestructuración explícita de props usando interfaces definidas.
- Código debe ser predecible, limpio y mantenible.

### Componentes y Arquitectura

- Seguir patrón **modular por funcionalidad**, no por tipo.
  - Componentes específicos se crean dentro de `modules/{modulo}/components/`
  - Hooks personalizados se colocan en `modules/{modulo}/hooks/`
- Archivos genéricos reutilizables van a `shared/` (como botones, inputs, helpers, etc.).
- Los componentes siempre reciben props tipadas mediante interfaces.
- En páginas, se evita colocar lógica innecesaria o imports globales como fuentes externas o estilos.

### Nomenclatura y Estilo

- **Component Naming:** PascalCase (ej: `UserCard.tsx`)
- **Variable Naming:** camelCase
- **Constantes:** SCREAMING_SNAKE_CASE si son globales
- **Archivos:** usar nombres descriptivos como `CreateWarModal.tsx`, no abreviaciones vagas

### Importaciones

- Ordenar importaciones desde más externas a más locales:
  1. Librerías de terceros (`react`, `next`, `@mui`)
  2. Componentes compartidos (`@/shared/components/...`)
  3. Hooks personalizados (`@/shared/hooks/...`)
  4. Módulos específicos (`@/modules/war/components/...`)
  5. Estilos o recursos (`./styles.css`, `./utils.ts`)

## API Design

- El sistema sigue un enfoque **RESTful** para las peticiones.
- Las rutas deben ser claras y consistentes (`/api/friends`, `/api/wars/{id}`).

## General Instructions

- Siempre trabajar con **abstracción**: no duplicar lógica, mantener funciones reutilizables.
- Priorizar **componentes funcionales** y lógica separada (hooks).
- Nunca dejar código a medio terminar, sin tipo o sin comentarios si es necesario.
- Mantener estilo consistente en todo el proyecto, reflejando profesionalismo y organización.
- Si tienes dudas, sigue patrones ya existentes en el código actual.

