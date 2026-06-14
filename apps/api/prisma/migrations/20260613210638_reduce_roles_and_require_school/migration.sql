-- Reduce los roles a ADMIN, TEACHER y STUDENT, y hace schoolId obligatorio.

-- 1) schoolId pasa a ser NOT NULL (todo usuario pertenece a un colegio).
ALTER TABLE "users" ALTER COLUMN "schoolId" SET NOT NULL;

-- 2) Recrea el enum UserRole sin SUPER_ADMIN ni GUARDIAN.
--    En PostgreSQL no se pueden quitar valores de un enum: se crea uno nuevo,
--    se migra la columna y se elimina el viejo.
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole" USING ("role"::text::"UserRole");
DROP TYPE "UserRole_old";
