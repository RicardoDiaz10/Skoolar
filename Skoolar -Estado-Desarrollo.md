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
| Paso actual | Login funcional de punta a punta: backend `POST /auth/login` (JWT access token) + frontend conectado. Siguiente: refresh tokens, guards por rol (RBAC) y middleware multi-tenant |
| % avance global estimado | ~25% |
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
| Autenticación | 🟡 Login con JWT (access token); faltan refresh tokens, RBAC y multi-tenant |
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
- 🟡 Autenticación JWT, RBAC y middleware multi-tenant
  - ✅ Login con email/contraseña: hash con bcryptjs + JWT access token (15 min)
  - ✅ Estrategia y guard de Passport (`JwtAuthGuard`) + ruta protegida `/auth/me`
  - ✅ Frontend: login conectado a la API (guarda el token, muestra error/éxito)
  - ⬜ Refresh tokens (con rotación en Redis)
  - ⬜ Guards por rol (RBAC) y middleware multi-tenant por `schoolId`
- 🟡 Seeds de datos de prueba
  - ✅ Seed inicial: un colegio (`Colegio Demo`) + un usuario admin
  - ⬜ Seeds realistas (alumnos, cursos, notas…) cuando exista el dominio

### Fase 1 — Núcleo Académico / MVP · ⬜ No iniciada
- ⬜ CRUD: colegio, años, periodos, grados, secciones, cursos, asignación docente
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
│   │   │   ├── seed.ts            Datos de prueba (colegio + admin)
│   │   │   └── migrations/        Migraciones SQL versionadas
│   │   ├── src/
│   │   │   ├── main.ts            Arranque (CORS + validación global, :3000)
│   │   │   ├── app.module.ts      Módulo raíz (.env + Prisma + Auth)
│   │   │   ├── app.controller.ts  Rutas HTTP (incluye GET /health)
│   │   │   ├── app.service.ts     Lógica de negocio + healthCheck()
│   │   │   ├── prisma/
│   │   │   │   ├── prisma.module.ts   Módulo global de Prisma
│   │   │   │   └── prisma.service.ts  Cliente Prisma (adapter pg)
│   │   │   └── auth/
│   │   │       ├── auth.module.ts        Configura JWT + Passport
│   │   │       ├── auth.controller.ts    POST /auth/login, GET /auth/me
│   │   │       ├── auth.service.ts       Valida credenciales y firma el JWT
│   │   │       ├── jwt.strategy.ts       Estrategia Passport (verifica el token)
│   │   │       ├── jwt-auth.guard.ts     Guard para rutas protegidas
│   │   │       └── dto/login.dto.ts      Validación del cuerpo del login
│   │   ├── test/                  Pruebas e2e
│   │   ├── prisma.config.ts       Config de Prisma 7 (URL de la BD vía dotenv)
│   │   ├── .env / .env.example    Variables de entorno (la real no se versiona)
│   │   ├── nest-cli.json
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── web/           Frontend React + Vite (@skoolar/web)
│       ├── src/
│       │   ├── main.tsx           Punto de entrada (monta React en #root)
│       │   ├── App.tsx            Componente raíz (renderiza Login)
│       │   ├── pages/
│       │   │   └── Login.tsx      Login conectado a la API (JWT)
│       │   ├── lib/
│       │   │   └── api.ts         Cliente de la API (función login)
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

**Módulos backend (NestJS) implementados:** `AppModule` (raíz, carga configuración, Prisma y Auth), `PrismaModule` (global, expone el cliente de BD) y `AuthModule` (login con JWT). El `AppController` mantiene la ruta de demostración (`/`) y `/health`. Rutas de auth: `POST /auth/login` (público) y `GET /auth/me` (protegido por `JwtAuthGuard`). Los módulos de dominio (alumnos, notas, etc.) aún no existen.

**Vistas / rutas frontend (React) implementadas:**
- **Login** (`src/pages/Login.tsx`): pantalla de inicio de sesión a pantalla completa, rejilla de 6 columnas → formulario (correo, contraseña, botón "Ingresar", enlace "¿Olvidó su contraseña?") en 2/6 a la izquierda e imagen de la institución en 4/6 a la derecha. **Conectado al backend**: llama a `POST /auth/login` (vía `src/lib/api.ts`), guarda el token en `localStorage` y muestra estados de carga, error y éxito. Como aún no hay dashboard ni router, al iniciar sesión muestra un saludo provisional.

Aún no hay router (React Router) ni más vistas (el dashboard llega en la Fase 1).

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
| 2026-06-12 | `schoolId` **opcional** en `User` | El rol `SUPER_ADMIN` es de plataforma y no pertenece a ningún colegio; email único por `[schoolId, email]` | Modelo `User` |
| 2026-06-12 | **`@nestjs/config`** para cargar variables de entorno | NestJS no lee `.env` por sí solo; se centraliza la configuración de forma global | Backend |
| 2026-06-12 | Hash de contraseñas con **`bcryptjs`** (no `bcrypt` nativo) | El `bcrypt` nativo compila binarios con node-gyp, problemático en Windows + pnpm; `bcryptjs` es el mismo algoritmo en JS puro, sin compilación | `AuthService`, seed |
| 2026-06-12 | Autenticación con **JWT access token** (expiración corta, 15 min) + **Passport** | Stateless y estándar; el plan pide JWT. Los refresh tokens se añaden en el siguiente bloque | Módulo `auth` |
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

---

## 7. Pendientes y próximos pasos

**Inmediato:**
1. Inicializar el repositorio Git (recordar la política de commits: sin referencias a IA, mensajes que describan la funcionalidad).
2. Decidir y montar la estructura del monorepo (backend + frontend).
3. Configurar entorno de desarrollo (Node, Docker, variables de entorno).

**Backlog cercano:**
- _por definir_

---

## 8. Bitácora de avances

> Historial cronológico, lo más reciente arriba. Una entrada por avance significativo.

| Fecha | Avance | Fase / Paso |
|---|---|---|
| 2026-06-12 | **Autenticación (login funcional end-to-end):** módulo `auth` con JWT access token (15 min) + Passport; hash con `bcryptjs`; rutas `POST /auth/login` y `GET /auth/me` (protegida); validación global y CORS; seed con un colegio y un admin de prueba (`admin@demo.skoolar` / `admin1234`). Frontend: `Login.tsx` conectado a la API vía `src/lib/api.ts`, con estados de carga/error/éxito. Verificado: login OK, 401 con credenciales inválidas, 400 por validación, y CORS desde el origen del navegador. | Fase 0 — Fundaciones |
| 2026-06-12 | **Capa de datos completa:** `docker-compose.yml` con PostgreSQL 16 (host `:5433`) y Redis 7; Prisma 7 instalado y conectado a NestJS vía `PrismaService` (adapter pg); primera migración con modelos `School` y `User`; endpoint `/health` verificado consultando la BD (`{status:ok, database:connected, schools:0}`). | Fase 0 — Fundaciones |
| 2026-06-09 | Tailwind CSS v4 configurado y primera pantalla real: **login** (`src/pages/Login.tsx`) con layout 2/6 (formulario) y 4/6 (imagen de la institución), a pantalla completa sin scroll. Imagen placeholder en `assets/institucion.svg`. | Fase 0 — Fundaciones |
| 2026-06-09 | Frontend React 19 + Vite generado en `apps/web` (`@skoolar/web`), dependencias instaladas y dev server verificado sirviendo en `localhost:5173`. Título de la app cambiado a "Skoolar". | Fase 0 — Fundaciones |
| 2026-06-09 | Backend NestJS 11 generado en `apps/api` (`@skoolar/api`), dependencias instaladas con pnpm y servidor verificado respondiendo en `localhost:3000`. | Fase 0 — Fundaciones |
| 2026-06-09 | Inicialización del repositorio Git y estructura base del monorepo (pnpm workspaces): `apps/`, `packages/` y archivos raíz de configuración. | Fase 0 — Fundaciones |
| 2026-06-09 | Creación de la documentación inicial del proyecto (plan + este registro de estado). Definición del nombre del producto: **Skoolar**. | Pre-desarrollo |
