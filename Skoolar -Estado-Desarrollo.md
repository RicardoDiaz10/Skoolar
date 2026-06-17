# 📗 Skoolar — Estado de Desarrollo

> Registro vivo del avance real del proyecto. Mientras que `Skoolar -Documentacion-Proyecto.md` describe **qué se quiere construir** (el plan), este archivo documenta **qué se ha construido hasta la fecha**: estructura real, decisiones tomadas, fase/paso actual y pendientes.
>
> **Regla:** actualizar este archivo cada vez que se complete un avance significativo (nueva funcionalidad, cambio de estructura, decisión técnica relevante o cambio de plan).

| Campo | Detalle |
|---|---|
| **Producto** | Skoolar |
| **Documento** | Estado / Registro de avance |
| **Última actualización** | 2026-06-12 |
| **Fase actual** | Fase 0 — Fundaciones (en progreso) |
| **Estado general** | 🟡 Desarrollo iniciado |

---

## 1. Cómo leer este documento

- **Sección 2 — Resumen de estado:** vista rápida de en qué punto está el proyecto hoy.
- **Sección 3 — Avance por fases:** checklist de cada fase del plan, con su estado.
- **Sección 4 — Estructura del proyecto:** árbol real de carpetas y módulos a medida que existen.
- **Sección 5 — Decisiones técnicas tomadas:** registro de decisiones efectivas (no las del plan, sino las que ya se aplicaron).
- **Sección 6 — Cambios respecto al plan original:** todo desvío frente a `Skoolar -Documentacion-Proyecto.md`.
- **Sección 7 — Pendientes y próximos pasos:** lo inmediato a hacer.
- **Sección 8 — Bitácora:** historial cronológico de avances.

**Leyenda de estados:** ⬜ No iniciado · 🟡 En progreso · ✅ Completado · ⏸️ En pausa · ❌ Descartado

---

## 2. Resumen de estado (hoy)

| Indicador | Valor |
|---|---|
| Fase en curso | Fase 0 — Fundaciones |
| Paso actual | Primer módulo de dominio terminado: **Año escolar** (CRUD admin, tenant-scoped, con año activo único) — backend + pantalla. Siguiente: grados y secciones |
| % avance global estimado | ~42% |
| Repositorio inicializado | ✅ Sí (rama `main`) |
| Estructura monorepo (pnpm workspaces) | ✅ Sí |
| Backend NestJS (`apps/api`) | ✅ Sí (responde en `localhost:3000`) |
| Frontend React + Vite (`apps/web`) | ✅ Sí (sirve en `localhost:5173`) |
| Estilos (Tailwind CSS v4) | ✅ Sí |
| Pantalla de login | ✅ Conectada al backend (login real con JWT) |
| Entorno de desarrollo configurado | 🟡 Parcial (falta CI/CD y linters comunes) |
| Infraestructura local (Docker Compose) | ✅ Sí (PostgreSQL 16 en host `:5433` + Redis 7 en `:6379`) |
| Base de datos / modelo Prisma | 🟡 Parcial (School + User migrados; resto del dominio pendiente) |
| API conectada a la BD | ✅ Sí (endpoint `/health` consulta la BD) |
| Autenticación | ✅ Access + refresh tokens (rotación en Redis), login real |
| Roles (RBAC) | ✅ ADMIN / TEACHER / STUDENT con guard por rol |
| Aislamiento multi-tenant | ✅ Verificado (consultas filtradas por `schoolId` del token) |
| Primer despliegue | ⬜ No |

> Reemplazar esta tabla con el estado real conforme avance el desarrollo.

---

## 3. Avance por fases

### Fase 0 — Fundaciones · 🟡 En progreso
- 🟡 Setup de monorepo, Docker, CI/CD, linters, estructura de carpetas
  - ✅ Repositorio Git inicializado (rama `main`)
  - ✅ Estructura monorepo con pnpm workspaces (`apps/*`, `packages/*`)
  - ✅ Archivos raíz: `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.npmrc`, `.gitattributes`, `README.md`
  - ✅ Backend NestJS 11 + TypeScript en `apps/api` (paquete `@skoolar/api`); arranca y responde en `localhost:3000`
  - ✅ Frontend React 19 + Vite + TypeScript en `apps/web` (paquete `@skoolar/web`); sirve en `localhost:5173`
  - ✅ Tailwind CSS v4 configurado en el frontend (plugin de Vite)
  - ✅ Docker / Docker Compose (PostgreSQL 16 + Redis 7) — `docker-compose.yml` en la raíz
  - ⬜ CI/CD (GitHub Actions) + linters
- 🟡 Modelo de datos en Prisma + migraciones iniciales
  - ✅ Prisma 7 instalado y conectado a NestJS (driver adapter `@prisma/adapter-pg`)
  - ✅ Primera migración: modelos `School` (tenant) y `User` (con rol RBAC), enums `UserRole` y `Status`
  - ✅ Endpoint `/health` que verifica conectividad API ↔ BD
  - ⬜ Resto de entidades del dominio (años, grados, alumnos, notas, planillas…)
- ✅ Autenticación JWT, RBAC y aislamiento multi-tenant
  - ✅ Login con email/contraseña: hash con bcryptjs + JWT access token (15 min)
  - ✅ Estrategia y guard de Passport (`JwtAuthGuard`) + ruta protegida `/auth/me`
  - ✅ Frontend: login conectado a la API (guarda ambos tokens, muestra error/éxito)
  - ✅ Refresh tokens (7 días) con rotación y revocación en Redis (`/auth/refresh`, `/auth/logout`)
  - ✅ RBAC: decorador `@Roles`, `RolesGuard` (403 sin permiso) y `@CurrentUser`
  - ✅ Multi-tenant: consultas filtradas por `schoolId` del token; aislamiento verificado con dos colegios
- 🟡 Seeds de datos de prueba
  - ✅ Seed: dos colegios (`Colegio Demo` con un usuario por rol, `Colegio Norte` para probar aislamiento)
  - ⬜ Seeds realistas (alumnos, cursos, notas…) cuando exista el dominio

### Fase 1 — Núcleo Académico / MVP · 🟡 En progreso
- ✅ Frontend: esqueleto de la app (React Router, sesión, rutas por rol, layout de admin)
- 🟡 CRUD: colegio, años, periodos, grados, secciones, cursos, asignación docente
  - ✅ **Año escolar** (`AcademicYear`): CRUD admin tenant-scoped, con año activo único; pantalla en el panel de admin
  - ⬜ Periodos, grados, secciones, cursos, asignación docente
- ⬜ Gestión de alumnos + matrícula + carga masiva CSV
- ⬜ Registro de notas (grilla docente) con tipos de evaluación y pesos
- ⬜ Cálculo de promedios y flujo de publicación
- ⬜ Portal del alumno (cursos, notas, horario)
- ⬜ **Hito:** demo funcional end-to-end con usuarios de prueba

### Fase 2 — Documentos y Asistencia · ⬜ No iniciada
- ⬜ Libreta de notas y acta consolidada en PDF
- ⬜ Módulo de asistencia completo
- ⬜ Notificaciones por email
- ⬜ Portal del apoderado
- ⬜ **Hito:** piloto con un colegio real

### Fase 3 — Planillas · ⬜ No iniciada
- ⬜ Empleados, contratos, conceptos de pago
- ⬜ Generación de planilla mensual + boletas PDF + cierre de mes
- ⬜ **Hito:** primer ciclo de planilla real procesado

### Fase 4 — SaaS y Comercialización · ⬜ No iniciada
- ⬜ Panel Super Admin: gestión de tenants y planes
- ⬜ Onboarding self-service de colegios
- ⬜ Dashboard de estadísticas y reportes avanzados
- ⬜ Landing page comercial + precios
- ⬜ Hardening de seguridad, pruebas de carga, backups verificados
- ⬜ **Hito:** lanzamiento comercial v1.0

---

## 4. Estructura real del proyecto

> A completar conforme se cree el código. Mantener este árbol sincronizado con el repositorio real.

```
skoolar/
├── apps/
│   ├── api/           Backend NestJS (@skoolar/api)
│   │   ├── prisma/
│   │   │   ├── schema.prisma      Modelo de datos (School, User, enums)
│   │   │   ├── seed.ts            Datos de prueba (dos colegios + usuarios por rol)
│   │   │   └── migrations/        Migraciones SQL versionadas
│   │   ├── src/
│   │   │   ├── main.ts            Arranque (CORS + validación global, :3000)
│   │   │   ├── app.module.ts      Módulo raíz (.env + Prisma + Redis + Auth + Users)
│   │   │   ├── app.controller.ts  Rutas HTTP (incluye GET /health)
│   │   │   ├── app.service.ts     Lógica de negocio + healthCheck()
│   │   │   ├── prisma/
│   │   │   │   ├── prisma.module.ts   Módulo global de Prisma
│   │   │   │   └── prisma.service.ts  Cliente Prisma (adapter pg)
│   │   │   ├── redis/
│   │   │   │   ├── redis.module.ts    Módulo global de Redis
│   │   │   │   └── redis.service.ts   Cliente Redis (ioredis)
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts        Configura JWT + Passport
│   │   │   │   ├── auth.controller.ts    /auth/login, /refresh, /logout, /me, /admin-only
│   │   │   │   ├── auth.service.ts       Valida credenciales, firma y rota tokens
│   │   │   │   ├── jwt.strategy.ts       Estrategia Passport (verifica el token)
│   │   │   │   ├── jwt-auth.guard.ts     Guard de autenticación (token válido)
│   │   │   │   ├── roles.guard.ts        Guard de autorización por rol (RBAC)
│   │   │   │   ├── roles.decorator.ts    Decorador @Roles
│   │   │   │   ├── current-user.decorator.ts  Decorador @CurrentUser
│   │   │   │   └── dto/                  Validación de login y refresh
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts       Módulo de usuarios
│   │   │   │   ├── users.controller.ts   GET /users (admin, por colegio)
│   │   │   │   └── users.service.ts      Consulta filtrada por schoolId (multi-tenant)
│   │   │   └── academic-years/
│   │   │       ├── academic-years.module.ts      Módulo de años escolares
│   │   │       ├── academic-years.controller.ts  CRUD /academic-years (admin)
│   │   │       ├── academic-years.service.ts     Lógica tenant-scoped + año activo único
│   │   │       └── dto/                          Validación de crear/actualizar
│   │   ├── test/                  Pruebas e2e
│   │   ├── prisma.config.ts       Config de Prisma 7 (URL de la BD vía dotenv)
│   │   ├── .env / .env.example    Variables de entorno (la real no se versiona)
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── web/           Frontend React + Vite (@skoolar/web)
│       ├── src/
│       │   ├── main.tsx           Entrada: BrowserRouter + AuthProvider
│       │   ├── App.tsx            Definición de rutas (router)
│       │   ├── auth/
│       │   │   ├── auth-context.ts     Contexto de sesión + hook useAuth
│       │   │   ├── AuthProvider.tsx    Estado de sesión (login/logout/bootstrap)
│       │   │   ├── ProtectedRoute.tsx  Protege rutas por sesión y rol
│       │   │   └── roles.ts            Mapa rol → ruta de inicio
│       │   ├── layouts/
│       │   │   └── AdminLayout.tsx     Menú lateral + barra + cerrar sesión
│       │   ├── pages/
│       │   │   ├── Login.tsx           Login (redirige según rol)
│       │   │   ├── admin/Dashboard.tsx Panel del admin
│       │   │   ├── admin/AcademicYears.tsx  Gestión de años escolares
│       │   │   ├── RolePlaceholder.tsx Vista provisional (profesor/alumno)
│       │   │   └── NotFound.tsx        Página 404
│       │   ├── lib/
│       │   │   ├── api.ts          Cliente API (login, refresh, logout, apiFetch)
│       │   │   └── tokens.ts       Tokens en localStorage
│       │   ├── index.css          Importa Tailwind + reset a pantalla completa
│       │   └── assets/
│       │       └── institucion.svg  Imagen placeholder de la institución
│       ├── index.html             HTML base (título "Skoolar")
│       ├── vite.config.ts         Plugins: React + Tailwind
│       ├── tsconfig*.json
│       └── package.json
├── packages/          (vacío por ahora → código compartido)
├── docker-compose.yml   PostgreSQL 16 (host :5433) + Redis 7 (:6379)
├── .claude/launch.json  Config para arrancar el dev server
├── pnpm-lock.yaml     Candado de versiones exactas
├── .gitignore
├── .npmrc             (engine-strict)
├── package.json       (raíz del workspace, pnpm)
├── pnpm-workspace.yaml
├── README.md
├── Skoolar -Documentacion-Proyecto.md
└── Skoolar -Estado-Desarrollo.md
```

**Módulos backend (NestJS) implementados:** `AppModule` (raíz), `PrismaModule` y `RedisModule` (globales), `AuthModule` (login + tokens + RBAC), `UsersModule` (listado por colegio) y `AcademicYearsModule` (CRUD de años escolares). Rutas: `GET /` y `/health`; auth → `POST /auth/login`, `/auth/refresh`, `/auth/logout`, `GET /auth/me`, `GET /auth/admin-only`; usuarios → `GET /users` (ADMIN); años escolares → `POST/GET /academic-years`, `GET/PATCH/DELETE /academic-years/:id`, `PATCH /academic-years/:id/activate` (todo ADMIN, filtrado por `schoolId`). Resto del dominio (grados, cursos, alumnos, notas…) aún no existe.

**Vistas / rutas frontend (React) implementadas:** ya hay **React Router** y sesión persistente.
- **`/login`** (`pages/Login.tsx`): formulario correo/contraseña; al entrar redirige a la zona del rol. Si ya hay sesión, salta directo a ella.
- **`/admin`** (protegida, rol ADMIN): `AdminLayout` (menú lateral + barra con correo y cerrar sesión) con el panel `admin/Dashboard.tsx` como página inicial.
- **`/profesor`** y **`/alumno`** (protegidas por su rol): vistas provisionales (`RolePlaceholder`) que se construirán más adelante.
- **`/`** redirige a `/login`; cualquier otra ruta muestra `NotFound` (404).

**Sesión (frontend):** `AuthProvider` mantiene el usuario; al cargar la app recupera la sesión desde los tokens (`GET /auth/me`). `apiFetch` adjunta el access token y, si recibe 401, **renueva automáticamente** con el refresh token y reintenta. `ProtectedRoute` bloquea por sesión y por rol.

---

## 5. Decisiones técnicas tomadas

> Solo decisiones **ya aplicadas en el código**. Las decisiones de planificación viven en el documento de proyecto.

| Fecha | Decisión | Motivo | Afecta a |
|---|---|---|---|
| 2026-06-09 | Monorepo con **pnpm workspaces** | Rápido, eficiente en disco y estándar para monorepos; pnpm ya estaba instalado (v11.5.1) | Toda la organización del repo |
| 2026-06-09 | Node fijado a **>=20** en `engines` | El entorno tiene Node 24; se exige mínimo 20 LTS para compatibilidad | Backend y frontend |
| 2026-06-09 | Backend con **NestJS 11** generado vía CLI oficial (`apps/api`, paquete `@skoolar/api`), TypeScript en modo estricto | Estructura modular probada, soporte TS de fábrica | Todo el backend |
| 2026-06-09 | Build de `unrs-resolver` autorizado en `pnpm-workspace.yaml` (`allowBuilds`) | pnpm bloquea scripts de instalación por seguridad; este es necesario para ESLint | Tooling de linting |
| 2026-06-09 | Frontend con **React 19 + Vite** generado vía `create vite` (`apps/web`, paquete `@skoolar/web`) | La herramienta oficial ya instala React 19 (estable y recomendada) | Todo el frontend |
| 2026-06-09 | **Tailwind CSS v4** como sistema de estilos (plugin `@tailwindcss/vite`) | Definido en el plan; clases de utilidad para desarrollo rápido | Todo el frontend |
| 2026-06-12 | **PostgreSQL en el puerto host `5433`** (no el estándar `5432`) | El equipo ya tiene un PostgreSQL 18 nativo ocupando el `5432`; se evita el conflicto sin tocar la instalación existente | `docker-compose.yml`, `DATABASE_URL` |
| 2026-06-12 | **Generador `prisma-client-js`** (clásico) en vez del nuevo `prisma-client` | El generador nuevo de Prisma 7 emite ESM y choca con el CommonJS de NestJS; el clásico se importa desde `@prisma/client` sin fricción | Backend |
| 2026-06-12 | Cliente Prisma con **driver adapter `@prisma/adapter-pg`** | Prisma 7 ya no admite la URL en `schema.prisma`; el cliente en runtime requiere un adapter que recibe la cadena de conexión | `PrismaService` |
| 2026-06-13 | `schoolId` **obligatorio** en `User` (antes opcional) | Al quitar `SUPER_ADMIN`, todo usuario pertenece a un colegio; simplifica el aislamiento multi-tenant. Email único por `[schoolId, email]` | Modelo `User` |
| 2026-06-12 | **`@nestjs/config`** para cargar variables de entorno | NestJS no lee `.env` por sí solo; se centraliza la configuración de forma global | Backend |
| 2026-06-12 | Hash de contraseñas con **`bcryptjs`** (no `bcrypt` nativo) | El `bcrypt` nativo compila binarios con node-gyp, problemático en Windows + pnpm; `bcryptjs` es el mismo algoritmo en JS puro, sin compilación | `AuthService`, seed |
| 2026-06-12 | Autenticación con **JWT access token** (expiración corta, 15 min) + **Passport** | Stateless y estándar; el plan pide JWT | Módulo `auth` |
| 2026-06-13 | **Refresh tokens** (JWT de 7 días, secreto propio) con **jti guardado en Redis** | Permite renovar la sesión sin reloguear, y rotar/revocar tokens (logout y anti-reuso). El TTL en Redis se calcula del `exp` del token | Módulo `auth`, `RedisService` |
| 2026-06-13 | Cliente de Redis con **`ioredis`** | Cliente robusto y estándar; compatible con BullMQ (que se usará más adelante) | `RedisModule` |
| 2026-06-13 | **RBAC** con decorador `@Roles` + `RolesGuard` (lee el rol del JWT) y `@CurrentUser` | Autorización declarativa por ruta; 403 si el rol no coincide. Separa 401 (sin identidad) de 403 (sin permiso) | Módulo `auth` |
| 2026-06-13 | Patrón **multi-tenant explícito**: cada servicio recibe el `schoolId` del token y filtra por él | Aislamiento simple y verificable sin magia oculta; el `schoolId` nunca viene del cliente. Convención para todos los módulos futuros | `UsersService` y siguientes |
| 2026-06-13 | **React Router** + contexto de sesión (`AuthProvider`/`useAuth`) + rutas protegidas por rol | Cada rol va a su zona (`/admin`, `/profesor`, `/alumno`); base navegable para todas las vistas | Frontend |
| 2026-06-13 | **Renovación automática del token** en el cliente (`apiFetch`: ante un 401 renueva con el refresh token y reintenta) | La sesión no se corta a los 15 min sin que el usuario lo note | Frontend |
| 2026-06-13 | Contexto y hook en archivos separados (`auth-context.ts`) del proveedor (`AuthProvider.tsx`) | Cumple la regla de *fast refresh* de React (un archivo no mezcla componente y no-componente); mantiene el lint verde | Frontend |
| 2026-06-17 | **Año escolar activo único**: al crear/activar uno, se desactivan los demás del colegio (en transacción) | Un colegio tiene un solo ciclo en curso; evita ambigüedad en el resto del dominio | `AcademicYearsService` |
| 2026-06-17 | Tras `prisma migrate dev` hay que ejecutar `prisma generate` y **reiniciar** el backend en watch | En este proyecto migrate no regenera el cliente solo, y `tsc --watch` no relee `node_modules`; sin reiniciar, los modelos nuevos no se ven | Flujo de desarrollo |
| 2026-06-12 | Login por **email** (no por "usuario") | El modelo `User` identifica por email; alinea con el plan (email/contraseña). El campo del formulario pasó a "Correo electrónico" | Login (front y back) |
| 2026-06-12 | **Validación global** con `class-validator` + `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`) | Rechaza cuerpos malformados o con campos de más; buena práctica de seguridad (OWASP) | Todas las rutas |
| 2026-06-12 | **CORS** habilitado para orígenes locales (`:5173`, `:3000`) | El frontend (Vite) y la API están en puertos distintos; el navegador exige CORS | `main.ts` |
| 2026-06-12 | **`tsx`** como runner para scripts (seed) | Ejecuta TypeScript directamente sin compilar, cómodo para el seed; trae `esbuild` (autorizado en `allowBuilds`) | Tooling |

---

## 6. Cambios respecto al plan original

> Registrar aquí cualquier desvío frente a `Skoolar -Documentacion-Proyecto.md` (funcionalidad agregada, quitada, pospuesta o rediseñada). El documento de proyecto es un documento vivo; cada cambio relevante de plan se anota aquí.

| Fecha | Cambio | Razón | ¿Documento de proyecto actualizado? |
|---|---|---|---|
| 2026-06-09 | **React 18 → React 19** en el frontend | `create vite` instala React 19 por defecto; es la versión estable actual y recomendada | ✅ Sí (sección 7.2) |
| 2026-06-13 | **Roles reducidos a 3** (ADMIN, TEACHER, STUDENT); se posponen SUPER_ADMIN y GUARDIAN | Decisión del producto: empezar con lo esencial. SUPER_ADMIN llegará en la Fase 4 (SaaS) y GUARDIAN en la Fase 2 (apoderados) | ⬜ Pendiente |

---

## 7. Pendientes y próximos pasos

**Inmediato (para cerrar la Fase 0):**
1. CI/CD (GitHub Actions) + linters comunes en el monorepo.
2. (Frontend) Router + dashboard protegido + cerrar sesión; renovación automática del access token con el refresh token.

**Backlog cercano (inicio de Fase 1 — dominio):**
- Modelar y exponer las primeras entidades académicas (año escolar, grados, secciones), siguiendo el patrón multi-tenant (filtrar por `schoolId`).

---

## 8. Bitácora de avances

> Historial cronológico, lo más reciente arriba. Una entrada por avance significativo.

| Fecha | Avance | Fase / Paso |
|---|---|---|
| 2026-06-17 | **Módulo Año escolar (Fase 1):** modelo `AcademicYear` + migración; CRUD `AcademicYearsModule` solo ADMIN y filtrado por `schoolId`, con activación de un único año activo por colegio; pantalla del admin (lista + crear + activar + eliminar) y enlace en el menú. Verificado en backend: CRUD, validación de fechas (400), nombre duplicado (409), rol no-admin (403) y aislamiento entre colegios. | Fase 1 — Núcleo Académico |
| 2026-06-13 | **Esqueleto del frontend (Fase 1):** React Router con rutas protegidas por rol, `AuthProvider` (sesión persistente vía `GET /auth/me` y renovación automática del token), layout de admin (menú lateral + barra + cerrar sesión), panel inicial y vistas provisionales para profesor/alumno. Login refactorizado para redirigir según el rol. Lint y build en verde. | Fase 1 — Núcleo Académico |
| 2026-06-13 | **Autenticación completa:** refresh tokens (7 días) con rotación y revocación en Redis (`/auth/refresh`, `/auth/logout`); RBAC con `@Roles`/`RolesGuard`/`@CurrentUser`; roles reducidos a ADMIN/TEACHER/STUDENT y `schoolId` obligatorio; módulo `users` con `GET /users` filtrado por colegio. Aislamiento multi-tenant verificado con dos colegios (Demo y Norte): ningún colegio ve datos del otro, profesor recibe 403, no se expone `passwordHash`. | Fase 0 — Fundaciones |
| 2026-06-12 | **Autenticación (login funcional end-to-end):** módulo `auth` con JWT access token (15 min) + Passport; hash con `bcryptjs`; rutas `POST /auth/login` y `GET /auth/me` (protegida); validación global y CORS; seed con un colegio y un admin de prueba (`admin@demo.skoolar` / `admin1234`). Frontend: `Login.tsx` conectado a la API vía `src/lib/api.ts`, con estados de carga/error/éxito. Verificado: login OK, 401 con credenciales inválidas, 400 por validación, y CORS desde el origen del navegador. | Fase 0 — Fundaciones |
| 2026-06-12 | **Capa de datos completa:** `docker-compose.yml` con PostgreSQL 16 (host `:5433`) y Redis 7; Prisma 7 instalado y conectado a NestJS vía `PrismaService` (adapter pg); primera migración con modelos `School` y `User`; endpoint `/health` verificado consultando la BD (`{status:ok, database:connected, schools:0}`). | Fase 0 — Fundaciones |
| 2026-06-09 | Tailwind CSS v4 configurado y primera pantalla real: **login** (`src/pages/Login.tsx`) con layout 2/6 (formulario) y 4/6 (imagen de la institución), a pantalla completa sin scroll. Imagen placeholder en `assets/institucion.svg`. | Fase 0 — Fundaciones |
| 2026-06-09 | Frontend React 19 + Vite generado en `apps/web` (`@skoolar/web`), dependencias instaladas y dev server verificado sirviendo en `localhost:5173`. Título de la app cambiado a "Skoolar". | Fase 0 — Fundaciones |
| 2026-06-09 | Backend NestJS 11 generado en `apps/api` (`@skoolar/api`), dependencias instaladas con pnpm y servidor verificado respondiendo en `localhost:3000`. | Fase 0 — Fundaciones |
| 2026-06-09 | Inicialización del repositorio Git y estructura base del monorepo (pnpm workspaces): `apps/`, `packages/` y archivos raíz de configuración. | Fase 0 — Fundaciones |
| 2026-06-09 | Creación de la documentación inicial del proyecto (plan + este registro de estado). Definición del nombre del producto: **Skoolar**. | Pre-desarrollo |
