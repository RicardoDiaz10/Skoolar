# Skoolar

Plataforma SaaS multi-tenant de gestión escolar para colegios privados pequeños y medianos.

> 📘 Plan de desarrollo: [`Skoolar -Documentacion-Proyecto.md`](./Skoolar%20-Documentacion-Proyecto.md)
> 📗 Estado del desarrollo: [`Skoolar -Estado-Desarrollo.md`](./Skoolar%20-Estado-Desarrollo.md)

## Estructura del monorepo

```
skoolar/
├── apps/
│   ├── api/   → Backend (NestJS + Prisma + PostgreSQL)
│   └── web/   → Frontend (React + Vite)
└── packages/  → Código compartido (tipos, utilidades)
```

## Requisitos

- Node.js >= 20
- pnpm (gestor del monorepo)

## Comandos

```bash
pnpm install   # Instala dependencias de todo el monorepo
pnpm dev       # Levanta los entornos de desarrollo
```

> Skoolar está en desarrollo activo. Consulta el documento de estado para ver la fase actual.
