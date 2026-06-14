import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Script de datos de prueba (seed): crea un colegio y un usuario admin para
// poder iniciar sesión en desarrollo. Es idempotente (usa upsert): se puede
// ejecutar varias veces sin duplicar registros.
//
// Ejecutar:  pnpm --filter @skoolar/api db:seed

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 12;

async function main() {
  // 1) Colegio de demostración (el tenant).
  const school = await prisma.school.upsert({
    where: { slug: 'colegio-demo' },
    update: {},
    create: { name: 'Colegio Demo', slug: 'colegio-demo' },
  });

  // 2) Usuario administrador del colegio, con contraseña hasheada.
  const passwordHash = await bcrypt.hash('admin1234', SALT_ROUNDS);
  const admin = await prisma.user.upsert({
    where: {
      schoolId_email: { schoolId: school.id, email: 'admin@demo.skoolar' },
    },
    update: {},
    create: {
      schoolId: school.id,
      email: 'admin@demo.skoolar',
      passwordHash,
      firstName: 'Admin',
      lastName: 'Demo',
      role: 'ADMIN',
    },
  });

  console.log('Seed completado:');
  console.log(`  Colegio: ${school.name} (${school.slug})`);
  console.log(`  Admin:   ${admin.email}  /  contraseña: admin1234`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
