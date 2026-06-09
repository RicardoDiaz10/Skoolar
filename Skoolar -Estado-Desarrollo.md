# 📗 Skoolar — Estado de Desarrollo

> Registro vivo del avance real del proyecto. Mientras que `Skoolar -Documentacion-Proyecto.md` describe **qué se quiere construir** (el plan), este archivo documenta **qué se ha construido hasta la fecha**: estructura real, decisiones tomadas, fase/paso actual y pendientes.
>
> **Regla:** actualizar este archivo cada vez que se complete un avance significativo (nueva funcionalidad, cambio de estructura, decisión técnica relevante o cambio de plan).

| Campo | Detalle |
|---|---|
| **Producto** | Skoolar |
| **Documento** | Estado / Registro de avance |
| **Última actualización** | 2026-06-09 |
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
| Paso actual | Estructura base del monorepo creada; siguiente: scaffolding del backend (NestJS) |
| % avance global estimado | ~3% |
| Repositorio inicializado | ✅ Sí (rama `main`) |
| Estructura monorepo (pnpm workspaces) | ✅ Sí |
| Entorno de desarrollo configurado | 🟡 Parcial (falta backend/frontend) |
| Base de datos / modelo Prisma | ⬜ No |
| Autenticación | ⬜ No |
| Primer despliegue | ⬜ No |

> Reemplazar esta tabla con el estado real conforme avance el desarrollo.

---

## 3. Avance por fases

### Fase 0 — Fundaciones · 🟡 En progreso
- 🟡 Setup de monorepo, Docker, CI/CD, linters, estructura de carpetas
  - ✅ Repositorio Git inicializado (rama `main`)
  - ✅ Estructura monorepo con pnpm workspaces (`apps/*`, `packages/*`)
  - ✅ Archivos raíz: `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.npmrc`, `README.md`
  - ⬜ Backend NestJS (`apps/api`)
  - ⬜ Frontend React + Vite (`apps/web`)
  - ⬜ Docker / Docker Compose (PostgreSQL + Redis)
  - ⬜ CI/CD (GitHub Actions) + linters
- ⬜ Modelo de datos completo en Prisma + migraciones iniciales
- ⬜ Autenticación JWT, RBAC y middleware multi-tenant
- ⬜ Seeds de datos de prueba realistas

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
├── apps/              (vacío por ahora → api y web)
├── packages/          (vacío por ahora → código compartido)
├── .gitignore
├── .npmrc             (engine-strict)
├── package.json       (raíz del workspace, pnpm)
├── pnpm-workspace.yaml
├── README.md
├── Skoolar -Documentacion-Proyecto.md
└── Skoolar -Estado-Desarrollo.md
```

**Módulos backend (NestJS) implementados:** _ninguno aún_

**Vistas / rutas frontend (React) implementadas:** _ninguna aún_

---

## 5. Decisiones técnicas tomadas

> Solo decisiones **ya aplicadas en el código**. Las decisiones de planificación viven en el documento de proyecto.

| Fecha | Decisión | Motivo | Afecta a |
|---|---|---|---|
| 2026-06-09 | Monorepo con **pnpm workspaces** | Rápido, eficiente en disco y estándar para monorepos; pnpm ya estaba instalado (v11.5.1) | Toda la organización del repo |
| 2026-06-09 | Node fijado a **>=20** en `engines` | El entorno tiene Node 24; se exige mínimo 20 LTS para compatibilidad | Backend y frontend |

---

## 6. Cambios respecto al plan original

> Registrar aquí cualquier desvío frente a `Skoolar -Documentacion-Proyecto.md` (funcionalidad agregada, quitada, pospuesta o rediseñada). El documento de proyecto es un documento vivo; cada cambio relevante de plan se anota aquí.

| Fecha | Cambio | Razón | ¿Documento de proyecto actualizado? |
|---|---|---|---|
| — | — | — | — |

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
| 2026-06-09 | Inicialización del repositorio Git y estructura base del monorepo (pnpm workspaces): `apps/`, `packages/` y archivos raíz de configuración. | Fase 0 — Fundaciones |
| 2026-06-09 | Creación de la documentación inicial del proyecto (plan + este registro de estado). Definición del nombre del producto: **Skoolar**. | Pre-desarrollo |
