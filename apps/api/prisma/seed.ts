import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Script de datos de prueba (seed): crea dos colegios con sus usuarios para
// poder iniciar sesión y probar el aislamiento multi-tenant en desarrollo.
// Es idempotente (usa upsert): se puede ejecutar varias veces sin duplicar.
//
// Ejecutar:  pnpm --filter @skoolar/api db:seed

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 12;

interface SeedUser {
  email: string;
  pass: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

// Crea (o reutiliza) un colegio con su lista de usuarios.
async function seedSchool(
  name: string,
  slug: string,
  usuarios: SeedUser[],
): Promise<void> {
  const school = await prisma.school.upsert({
    where: { slug },
    update: {},
    create: { name, slug },
  });

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
    console.log(`    ${u.role.padEnd(7)} ${u.email}  /  contraseña: ${u.pass}`);
  }
}

async function main() {
  console.log('Seed completado:');

  // Colegio A: un usuario por cada rol.
  await seedSchool('Colegio Demo', 'colegio-demo', [
    { email: 'admin@demo.skoolar', pass: 'admin1234', role: 'ADMIN', firstName: 'Admin', lastName: 'Demo' },
    { email: 'profesor@demo.skoolar', pass: 'profesor1234', role: 'TEACHER', firstName: 'Profe', lastName: 'Demo' },
    { email: 'estudiante@demo.skoolar', pass: 'estudiante1234', role: 'STUDENT', firstName: 'Estu', lastName: 'Demo' },
  ]);

  // Colegio B: sirve para verificar el aislamiento multi-tenant.
  await seedSchool('Colegio Norte', 'colegio-norte', [
    { email: 'admin@norte.skoolar', pass: 'admin1234', role: 'ADMIN', firstName: 'Admin', lastName: 'Norte' },
  ]);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
