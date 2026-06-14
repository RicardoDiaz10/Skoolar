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

  // 2) Un usuario de prueba por cada rol, con su contraseña hasheada.
  const usuarios = [
    { email: 'admin@demo.skoolar', pass: 'admin1234', role: 'ADMIN' as const, firstName: 'Admin', lastName: 'Demo' },
    { email: 'profesor@demo.skoolar', pass: 'profesor1234', role: 'TEACHER' as const, firstName: 'Profe', lastName: 'Demo' },
    { email: 'estudiante@demo.skoolar', pass: 'estudiante1234', role: 'STUDENT' as const, firstName: 'Estu', lastName: 'Demo' },
  ];

  console.log('Seed completado:');
  console.log(`  Colegio: ${school.name} (${school.slug})`);
  for (const u of usuarios) {
    const passwordHash = await bcrypt.hash(u.pass, SALT_ROUNDS);
    await prisma.user.upsert({
      where: { schoolId_email: { schoolId: school.id, email: u.email } },
      update: {},
      create: {
        schoolId: school.id,
        email: u.email,
        passwordHash,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role,
      },
    });
    console.log(`  ${u.role.padEnd(7)} ${u.email}  /  contraseña: ${u.pass}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
