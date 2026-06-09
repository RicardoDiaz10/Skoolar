# 📘 Documento de Especificación de Proyecto

# **Skoolar** — Plataforma SaaS de Gestión Escolar

| Campo | Detalle |
|---|---|
| **Nombre del producto** | **Skoolar** |
| **Versión del documento** | 1.0 |
| **Fecha** | Junio 2026 |
| **Tipo de producto** | SaaS multi-tenant (B2B) |
| **Mercado objetivo** | Colegios privados pequeños y medianos (50–800 alumnos) |
| **Estado** | Pre-desarrollo / Planificación |

---

> 📌 **Nombre oficial del producto:** este software se llama **Skoolar**. Cualquier referencia previa a otro nombre comercial queda reemplazada por **Skoolar** en todo el proyecto (código, documentación, dominios, marca y comunicaciones).

> ♻️ **Documento vivo:** este archivo es el **plan inicial** de desarrollo de Skoolar. Puede y debe modificarse a medida que las necesidades, el alcance o las funcionalidades cambien durante el desarrollo. No es un contrato cerrado: refleja la mejor decisión conocida en cada momento. Cada cambio relevante de plan debe registrarse también en el documento de seguimiento (`Skoolar -Estado-Desarrollo.md`).

---

## 0. Convenciones del Proyecto

### 0.1 Política de commits y control de versiones

Reglas **obligatorias** para todo el historial de Git que se suba a GitHub:

- **Prohibido mencionar a Claude Code o a cualquier IA.** En ninguna parte de los commits (mensaje, título, cuerpo, pie, `Co-Authored-By`, descripciones de PR, tags ni metadatos) se mencionará, aparecerá ni se hará referencia a que el software fue hecho con Claude Code o a que Claude Code participó en su creación. El historial debe verse como trabajo humano del autor del repositorio.
- **Cada commit describe la funcionalidad agregada.** El mensaje de cada commit debe indicar de forma clara y concreta la funcionalidad, cambio o corrección que introduce (qué hace), no la herramienta con la que se hizo.
- **Sin emojis.** Los mensajes de commit nunca contendrán emojis ni iconos. Solo texto plano, claro y profesional.
- **Formato sugerido:** mensajes en español, en modo imperativo o describiendo la funcionalidad. Ejemplos válidos:
  - `Agrega registro de notas por evaluación con cálculo de promedio`
  - `Implementa middleware multi-tenant por school_id`
  - `Corrige cálculo de promedio ponderado cuando un peso es 0`
- **Sin co-autores de IA:** no se añadirá `Co-Authored-By: Claude` ni líneas equivalentes a ningún commit.

### 0.2 Documentación del proyecto

El proyecto se documenta en **dos archivos** que se mantienen en paralelo:

1. **`Skoolar -Documentacion-Proyecto.md`** (este archivo) — el **plan de desarrollo**: visión, alcance, arquitectura, stack y fases. Es la referencia de *qué se quiere construir*.
2. **`Skoolar -Estado-Desarrollo.md`** — el **registro de avance**: documenta todo lo que se va desarrollando (estructura real del código, decisiones tomadas, fase/paso actual, pendientes). Es la referencia de *qué se ha construido hasta la fecha*. Debe actualizarse cada vez que se complete un avance significativo.

---

## 1. Resumen Ejecutivo

**Skoolar** es una plataforma web SaaS de gestión académica y administrativa para instituciones educativas. Centraliza la gestión de alumnos, matrículas, cursos, notas, asistencia y planillas del personal en un solo sistema accesible desde cualquier dispositivo.

El producto opera bajo un modelo **multi-tenant**: una sola instancia del software sirve a múltiples colegios, cada uno con sus datos completamente aislados, su propia configuración y su propio subdominio o espacio de trabajo.

### 1.1 Problema que resuelve

Los colegios pequeños y medianos gestionan su información académica con herramientas dispersas (Excel, cuadernos físicos, WhatsApp), lo que genera:

- Pérdida de tiempo en consolidación manual de notas y actas.
- Errores de cálculo en promedios y planillas.
- Falta de acceso de alumnos y padres a información académica en tiempo real.
- Imposibilidad de obtener reportes y estadísticas institucionales.
- Riesgo de pérdida de información histórica.

### 1.2 Propuesta de valor

- **Para el colegio:** digitalización completa de la gestión académica y de personal a una fracción del costo de un ERP educativo tradicional.
- **Para los docentes:** registro de notas y asistencia en minutos, desde cualquier dispositivo.
- **Para alumnos y padres:** acceso inmediato y transparente a notas, asistencia y comunicados.

---

## 2. Objetivos del Proyecto

### 2.1 Objetivo general

Desarrollar una plataforma web SaaS que permita a instituciones educativas gestionar de forma integral sus procesos académicos (matrículas, cursos, notas, asistencia) y administrativos (planillas del personal), con portales diferenciados por rol.

### 2.2 Objetivos específicos

1. Implementar arquitectura multi-tenant con aislamiento total de datos por colegio.
2. Gestionar el ciclo académico completo: año escolar → periodos → matrícula → evaluación → promoción de grado.
3. Automatizar el cálculo de promedios ponderados por periodo y promedio final.
4. Generar documentos oficiales en PDF: libretas de notas, actas consolidadas y boletas de pago.
5. Proveer portales de autoservicio para alumnos y apoderados.
6. Implementar módulo de planillas con cálculo de remuneraciones, descuentos y bonificaciones.
7. Garantizar seguridad de datos con autenticación robusta, control de acceso por roles (RBAC) y cifrado.
8. Alcanzar una disponibilidad del 99.5% y tiempos de respuesta menores a 500 ms en operaciones comunes.

### 2.3 Objetivos de negocio (SaaS)

- Lanzar MVP comercializable en 4–6 meses.
- Onboarding de un colegio nuevo en menos de 1 día (carga masiva de datos vía Excel/CSV).
- Modelo de suscripción mensual por alumno activo o por planes escalonados.

---

## 3. Alcance

### 3.1 Dentro del alcance (versión 1.0)

- Gestión multi-tenant de colegios (registro, configuración, branding básico).
- Gestión de usuarios con 5 roles: Super Admin (plataforma), Administrador (colegio), Docente, Alumno, Apoderado.
- Estructura académica: años escolares, periodos, niveles, grados, secciones, cursos.
- Matrícula de alumnos por año escolar con historial académico.
- Registro de evaluaciones con pesos configurables y cálculo automático de promedios.
- Flujo de publicación de notas (borrador → publicada).
- Registro de asistencia de alumnos.
- Módulo de planillas: personal, contratos, conceptos de pago, boletas en PDF.
- Portal del alumno y del apoderado.
- Reportes: libreta de notas PDF, acta consolidada, estadísticas por curso/sección.
- Notificaciones por correo electrónico (publicación de notas, comunicados).
- Carga masiva de alumnos vía CSV/Excel.

### 3.2 Fuera del alcance (versiones futuras)

- Facturación electrónica integrada con SUNAT u organismos tributarios.
- Pasarela de pago de pensiones escolares en línea.
- Aula virtual / LMS completo (tareas, exámenes en línea, videoconferencia).
- Aplicación móvil nativa (la web será responsive / PWA).
- Integración con SIAGIE u otros sistemas estatales.
- Módulo de biblioteca, transporte o comedor.

> ⚠️ Definir explícitamente lo que NO se hará es tan importante como definir lo que sí: protege el cronograma contra el *scope creep*.

---

## 4. Usuarios y Roles (RBAC)

| Rol | Ámbito | Permisos principales |
|---|---|---|
| **Super Admin** | Plataforma | Gestiona tenants (colegios), planes de suscripción, métricas globales del SaaS |
| **Administrador** | Colegio | Configura año escolar, grados, secciones, cursos; gestiona usuarios, matrículas y planillas; ve todos los reportes |
| **Docente** | Sus cursos | Registra evaluaciones, notas y asistencia de los cursos asignados; publica notas; sube material |
| **Alumno** | Sus datos | Ve sus cursos, horario, notas publicadas, asistencia y comunicados |
| **Apoderado** | Sus hijos | Ve el progreso académico de los alumnos vinculados; recibe alertas y comunicados |

**Reglas clave de autorización:**

- Todo acceso a datos está filtrado por `school_id` (tenant) a nivel de middleware y de consultas.
- Un docente solo puede modificar notas de cursos que tiene asignados en el año escolar activo.
- Las notas en estado *borrador* son invisibles para alumnos y apoderados.
- Las notas publicadas solo pueden modificarse mediante un flujo de rectificación con registro de auditoría.

---

## 5. Funcionalidades Detalladas por Módulo

### Módulo 1 — Gestión del Tenant (Colegio)

- Registro de colegio con datos institucionales, logo y colores (branding básico).
- Configuración del sistema de calificación: escala vigesimal (0–20) o literal (AD/A/B/C), nota mínima aprobatoria.
- Configuración de la estructura del año: bimestres o trimestres.
- Gestión del plan de suscripción y estado de la cuenta.

### Módulo 2 — Estructura Académica

- **Años escolares:** apertura, cierre y archivado. Solo un año activo a la vez.
- **Periodos académicos:** N periodos por año con fechas de inicio/fin y fecha límite de registro de notas.
- **Niveles y grados:** Inicial, Primaria, Secundaria con sus grados.
- **Secciones:** "5to A", "5to B", con capacidad máxima y tutor asignado.
- **Cursos:** catálogo de cursos por grado, con asignación de docente por sección y año.
- **Horarios:** horario semanal por sección (curso, día, hora, docente).

### Módulo 3 — Alumnos y Matrícula

- Ficha del alumno: datos personales, documento de identidad, foto, datos de salud relevantes, apoderados vinculados.
- **Matrícula por año escolar:** vincula alumno + grado + sección + año. Es la entidad que construye el historial académico.
- Estados de matrícula: activa, retirada, trasladada, finalizada.
- **Promoción de grado:** proceso de fin de año que matricula masivamente a los alumnos aprobados en el grado siguiente.
- Carga masiva de alumnos desde plantilla Excel/CSV con validación y reporte de errores.
- Historial académico completo del alumno a través de los años.

### Módulo 4 — Evaluaciones y Notas

- Definición de tipos de evaluación por curso/periodo (examen, práctica, tarea, participación) con **peso porcentual** (la suma debe ser 100%).
- Registro de notas por evaluación, con interfaz tipo planilla (grilla alumnos × evaluaciones) optimizada para ingreso rápido.
- Cálculo automático de: promedio por evaluación tipo, promedio del periodo, promedio final del curso, promedio general del alumno y orden de mérito.
- **Flujo de publicación:** borrador → publicada. Notificación automática a alumnos/apoderados al publicar.
- Rectificación de notas publicadas con motivo obligatorio y log de auditoría (quién, cuándo, valor anterior y nuevo).
- Indicador de alumnos en riesgo (bajo la nota mínima) visible para docentes y administración.

### Módulo 5 — Asistencia

- Registro diario de asistencia por sección: presente, tardanza, falta, falta justificada.
- Registro rápido tipo lista con marcado masivo.
- Justificación de inasistencias con observaciones.
- Reporte de asistencia por alumno, sección y periodo; alertas por inasistencias acumuladas.

### Módulo 6 — Planillas del Personal

- Registro de empleados: docentes y administrativos, con datos laborales.
- Contratos: cargo, tipo de contrato, sueldo base, fecha de inicio/fin.
- Conceptos de planilla configurables: ingresos (sueldo, bonificaciones, horas extra) y descuentos (pensión, adelantos, tardanzas).
- Generación de planilla mensual: cálculo automático por empleado.
- **Boletas de pago en PDF** con desglose de conceptos, descargables y enviables por correo.
- Reporte consolidado mensual y anual de planilla.
- Cierre de planilla mensual (inmutable tras el cierre).

### Módulo 7 — Portal del Alumno

- Dashboard: cursos del periodo actual, próximas evaluaciones, últimas notas publicadas, resumen de asistencia.
- Detalle por curso: evaluaciones, notas publicadas, promedio parcial.
- Horario semanal.
- Comunicados del colegio y notificaciones.
- Descarga de su libreta de notas en PDF (de periodos cerrados).

### Módulo 8 — Portal del Apoderado

- Vista consolidada de todos sus hijos en el colegio.
- Notas publicadas, asistencia y alertas (bajo rendimiento, inasistencias).
- Comunicados institucionales.

### Módulo 9 — Reportes y Documentos

- **Libreta de notas** individual en PDF (por periodo y final).
- **Acta consolidada** de notas por sección en PDF.
- Orden de mérito por sección y por grado.
- Estadísticas: distribución de notas por curso, tasa de aprobación, comparativas entre secciones, evolución histórica.
- Exportación de datos a Excel.

### Módulo 10 — Administración de la Plataforma (Super Admin)

- Alta, suspensión y baja de colegios (tenants).
- Gestión de planes y límites (número de alumnos, almacenamiento).
- Métricas del SaaS: tenants activos, usuarios activos, uso por módulo.
- Logs y monitoreo de salud del sistema.

### Funcionalidades Transversales

- Autenticación con email/contraseña, recuperación de contraseña, sesiones con JWT (access + refresh token).
- Auditoría: log de acciones sensibles (cambios de notas, planillas, eliminaciones).
- Notificaciones por correo (transaccionales) con plantillas.
- Búsqueda global dentro del tenant (alumnos, docentes, cursos).
- Modo responsive completo (uso intensivo desde celulares por docentes y padres).

---

## 6. Requisitos No Funcionales

| Categoría | Requisito |
|---|---|
| **Seguridad** | Contraseñas con bcrypt/argon2; JWT con expiración corta + refresh tokens; HTTPS obligatorio; protección OWASP Top 10 (SQLi, XSS, CSRF); rate limiting en endpoints sensibles |
| **Multi-tenancy** | Aislamiento de datos por `school_id` en todas las consultas, validado en middleware; imposibilidad de acceso cruzado entre tenants |
| **Rendimiento** | Respuestas < 500 ms en operaciones CRUD comunes; registro de notas de una sección completa (40 alumnos) < 2 s; paginación en todos los listados |
| **Disponibilidad** | 99.5% uptime objetivo; backups automáticos diarios de base de datos con retención de 30 días |
| **Escalabilidad** | Arquitectura stateless en el backend (escalado horizontal); colas para tareas pesadas (PDFs masivos, emails, importaciones) |
| **Usabilidad** | Interfaz en español; diseño responsive mobile-first para portales de alumno/apoderado; onboarding guiado para administradores |
| **Auditoría** | Registro inmutable de cambios en notas y planillas (quién, qué, cuándo) |
| **Privacidad** | Cumplimiento de la Ley de Protección de Datos Personales (Ley N.º 29733 — Perú); datos de menores tratados con consentimiento del apoderado; política de privacidad y términos de servicio |
| **Mantenibilidad** | Cobertura de tests > 70% en lógica de negocio crítica (cálculo de notas y planillas); documentación de API con OpenAPI/Swagger |

---

## 7. Stack Tecnológico

### 7.1 Backend

| Componente | Tecnología | Justificación |
|---|---|---|
| Runtime | **Node.js 20 LTS** | Estabilidad y soporte a largo plazo |
| Framework | **NestJS** (recomendado) o Express | NestJS aporta arquitectura modular, inyección de dependencias y TypeScript de fábrica — ideal para un SaaS que crecerá |
| Lenguaje | **TypeScript** | Tipado estático, crítico para el dominio complejo (notas, planillas) |
| ORM | **Prisma** | Migraciones versionadas, tipado end-to-end con PostgreSQL |
| Autenticación | **JWT** (access + refresh) + Passport | Estándar, stateless, compatible con escalado horizontal |
| Validación | **Zod** o class-validator | Validación de entrada en todos los endpoints |
| Colas | **BullMQ + Redis** | PDFs masivos, envío de correos, importaciones CSV |
| PDFs | **Puppeteer** (HTML → PDF) o pdfmake | Libretas, actas y boletas con diseño fiel |
| Email | **Nodemailer** + Resend/SES | Correos transaccionales |
| Documentación API | **Swagger / OpenAPI** | Generada automáticamente desde NestJS |

### 7.2 Frontend

| Componente | Tecnología | Justificación |
|---|---|---|
| Framework | **React 18 + Vite** | Rapidez de desarrollo y ecosistema |
| Lenguaje | **TypeScript** | Consistencia con el backend |
| Estado servidor | **TanStack Query** | Caché, sincronización y estados de carga sin boilerplate |
| Estado global | **Zustand** | Ligero, para sesión y UI |
| UI | **Tailwind CSS + shadcn/ui** | Desarrollo rápido con diseño profesional |
| Formularios | **React Hook Form + Zod** | Validación compartida con el backend |
| Tablas | **TanStack Table** | Grillas de notas y listados con orden/filtro/paginación |
| Gráficos | **Recharts** | Dashboards y estadísticas |
| Router | **React Router v6** | Rutas protegidas por rol |

### 7.3 Base de Datos e Infraestructura

| Componente | Tecnología | Justificación |
|---|---|---|
| Base de datos | **PostgreSQL 16** | Integridad referencial, transacciones, row-level security opcional para multi-tenancy |
| Caché / colas | **Redis** | Sesiones de refresh tokens, BullMQ, caché de reportes |
| Almacenamiento | **S3-compatible** (AWS S3 / Cloudflare R2) | Fotos, logos, PDFs generados, material de clase |
| Contenedores | **Docker + Docker Compose** | Entorno reproducible dev/prod |
| CI/CD | **GitHub Actions** | Lint + tests + build + deploy automático |
| Hosting inicial | **Railway / Render / VPS (Hetzner)** | Bajo costo para MVP; migrable a AWS al escalar |
| Monitoreo | **Sentry** (errores) + Uptime monitor | Detección temprana de fallos |

### 7.4 Estrategia Multi-Tenant

**Decisión: base de datos compartida con discriminador (`school_id`) en cada tabla.**

- ✅ Menor costo operativo y mantenimiento simple (una sola BD, una sola migración).
- ✅ Adecuado para decenas/cientos de colegios pequeños.
- 🔒 Aislamiento garantizado por: middleware que inyecta el tenant desde el JWT, scopes obligatorios en Prisma, y opcionalmente **Row-Level Security** de PostgreSQL como segunda barrera.
- 🔁 Si un cliente grande exige aislamiento físico, se puede migrar ese tenant a esquema o BD dedicada (la arquitectura no lo impide).

---

## 8. Modelo de Datos (Entidades Principales)

```
School (tenant)
 ├── User (admin, docente, alumno, apoderado) — rol + school_id
 ├── AcademicYear ── Period (bimestre/trimestre)
 ├── Level ── Grade ── Section (tutor, capacidad)
 ├── Course (curso del catálogo, por grado)
 ├── CourseAssignment (curso + sección + docente + año)
 ├── Student (ficha) ── Guardian (apoderado, N:M)
 ├── Enrollment (alumno + grado + sección + año + estado)  ⭐ historial
 ├── EvaluationType (nombre + peso %, por curso/periodo)
 ├── Evaluation (instancia: "Examen Bimestral 1", fecha)
 ├── Grade/Score (alumno + evaluación + nota + estado + auditoría)
 ├── Attendance (alumno + fecha + estado + justificación)
 ├── Employee ── Contract (cargo, sueldo base, vigencia)
 ├── PayrollConcept (ingreso/descuento, fórmula o monto)
 ├── Payroll (mes/año, estado: abierta/cerrada)
 │     └── Payslip (empleado + conceptos + neto) → PDF
 ├── Announcement (comunicados)
 └── AuditLog (acción, usuario, entidad, valores antes/después)
```

**Decisiones de diseño documentadas:**

1. **`Enrollment` (Matrícula) es la entidad pivote del historial académico**: un alumno nunca se relaciona directamente con un grado; siempre a través de una matrícula con año escolar. Esto permite reconstruir toda su trayectoria.
2. **Las notas guardan estado y auditoría**: nunca se sobreescribe una nota publicada sin dejar rastro.
3. **La planilla cerrada es inmutable**: una vez cerrado el mes, las boletas no cambian; las correcciones se hacen en el mes siguiente.
4. **Todo lleva `school_id`**, incluso tablas hijas, para permitir Row-Level Security y consultas seguras sin joins profundos.

---

## 9. Arquitectura del Sistema

```
                    ┌─────────────────────────────┐
                    │   Frontend SPA (React)       │
                    │   app.skoolar.com           │
                    └──────────────┬──────────────┘
                                   │ HTTPS / REST JSON
                    ┌──────────────▼──────────────┐
                    │   API REST (NestJS)          │
                    │  - Auth (JWT + RBAC)         │
                    │  - Middleware multi-tenant   │
                    │  - Módulos de dominio        │
                    └───────┬──────────┬──────────┘
                            │          │
              ┌─────────────▼──┐   ┌───▼──────────────┐
              │ PostgreSQL 16  │   │ Redis             │
              │ (datos + RLS)  │   │ (colas + caché)   │
              └────────────────┘   └───┬──────────────┘
                                       │ BullMQ workers
                            ┌──────────▼─────────────┐
                            │ Jobs: PDFs, emails,     │
                            │ importaciones CSV       │
                            └──────────┬─────────────┘
                                       │
                            ┌──────────▼─────────────┐
                            │ S3 (archivos y PDFs)    │
                            └────────────────────────┘
```

- **Monolito modular** (no microservicios) para el MVP: módulos NestJS bien separados que podrían extraerse en el futuro. Es la decisión correcta para un equipo pequeño.
- API **stateless**: cualquier instancia puede atender cualquier request (escalado horizontal simple).
- Tareas pesadas **siempre por cola**, nunca bloqueando la request HTTP.

---

## 10. Plan de Desarrollo por Fases

### Fase 0 — Fundaciones (Semanas 1–2)
- Setup de monorepo, Docker, CI/CD, linters, estructura de carpetas.
- Modelo de datos completo en Prisma + migraciones iniciales.
- Autenticación JWT, RBAC y middleware multi-tenant.
- Seeds de datos de prueba realistas (1 colegio, 200 alumnos, 15 docentes).

### Fase 1 — Núcleo Académico / MVP (Semanas 3–8)
- CRUD: colegio, años, periodos, grados, secciones, cursos, asignación docente.
- Gestión de alumnos + matrícula + carga masiva CSV.
- Registro de notas (grilla docente) con tipos de evaluación y pesos.
- Cálculo de promedios y flujo de publicación.
- Portal del alumno (cursos, notas, horario).
- ✅ **Hito: demo funcional end-to-end con usuarios de prueba.**

### Fase 2 — Documentos y Asistencia (Semanas 9–12)
- Libreta de notas y acta consolidada en PDF.
- Módulo de asistencia completo.
- Notificaciones por email.
- Portal del apoderado.
- ✅ **Hito: piloto con un colegio real (gratis a cambio de feedback).**

### Fase 3 — Planillas (Semanas 13–16)
- Empleados, contratos, conceptos de pago.
- Generación de planilla mensual + boletas PDF + cierre de mes.
- ✅ **Hito: primer ciclo de planilla real procesado.**

### Fase 4 — SaaS y Comercialización (Semanas 17–20)
- Panel Super Admin: gestión de tenants y planes.
- Onboarding self-service de colegios.
- Dashboard de estadísticas y reportes avanzados.
- Landing page comercial + precios.
- Hardening de seguridad, pruebas de carga, backups verificados.
- ✅ **Hito: lanzamiento comercial v1.0.**

---

## 11. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Fuga de datos entre tenants | Baja | Crítico | Middleware obligatorio + RLS en PostgreSQL + tests automáticos de aislamiento |
| Error en cálculo de promedios o planillas | Media | Alto | Suite de tests exhaustiva con casos límite; revisión con un docente/contador real |
| Scope creep (querer hacer el LMS completo) | Alta | Alto | Alcance v1.0 cerrado en este documento; backlog separado para v2 |
| Adopción lenta por resistencia al cambio | Alta | Medio | Onboarding asistido, carga masiva desde su Excel actual, piloto gratuito |
| Pérdida de datos | Baja | Crítico | Backups diarios automatizados + prueba de restauración mensual |
| Pico de carga en cierre de bimestre | Media | Medio | Generación de PDFs por colas; caché de reportes |

---

## 12. Métricas de Éxito

**Técnicas:**
- Cobertura de tests > 70% en módulos de notas y planillas.
- p95 de latencia < 500 ms; cero incidentes de acceso cruzado entre tenants.

**De producto:**
- Tiempo de onboarding de un colegio < 1 día.
- Un docente registra las notas de una sección en < 10 minutos.
- ≥ 60% de alumnos/apoderados activos mensualmente tras la publicación de notas.

**De negocio:**
- 1 colegio piloto en el mes 3; 3 colegios pagando en el mes 6.
- Churn < 5% anual (los colegios cambian de sistema raramente: alta retención natural).

---

## 13. Modelo de Negocio (resumen)

| Plan | Alumnos | Precio referencial | Incluye |
|---|---|---|---|
| **Básico** | Hasta 150 | ~US$ 39/mes | Académico completo, portal alumno |
| **Estándar** | Hasta 400 | ~US$ 79/mes | + Planillas, portal apoderado, asistencia |
| **Pro** | Hasta 800 | ~US$ 149/mes | + Reportes avanzados, branding, soporte prioritario |

- Cobro anual con descuento (alineado al ciclo escolar).
- Piloto gratuito de 1 bimestre como estrategia de entrada.

---

## 14. Entregables del Proyecto

1. Código fuente versionado (monorepo en GitHub) con README profesional.
2. API documentada con Swagger/OpenAPI.
3. Diagrama entidad-relación y diagrama de arquitectura.
4. Suite de tests automatizados + pipeline CI/CD.
5. Aplicación desplegada en producción con dominio propio y usuarios demo por rol.
6. Manual de usuario por rol (admin, docente, alumno).
7. Documento de políticas: privacidad, términos de servicio, backups.

---

## 15. Glosario

| Término | Definición |
|---|---|
| **Tenant** | Cada colegio cliente dentro de la plataforma, con datos aislados |
| **Matrícula (Enrollment)** | Vínculo alumno–grado–sección–año; unidad del historial académico |
| **Periodo** | Subdivisión del año escolar (bimestre o trimestre) |
| **RBAC** | Control de acceso basado en roles |
| **RLS** | Row-Level Security: seguridad a nivel de fila en PostgreSQL |
| **Planilla** | Proceso mensual de cálculo de remuneraciones del personal |
| **Boleta de pago** | Documento individual de pago de un empleado |
| **Orden de mérito** | Ranking de alumnos por promedio en una sección/grado |
