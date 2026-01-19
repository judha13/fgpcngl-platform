/*
  Warnings:

  - The values [MEDIA,OFFICE] on the enum `UserRolesEnum` will be removed. If these variants are still used in the database, this will fail.
  - The `event_time` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `members` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRolesEnum_new" AS ENUM ('ADMIN', 'MODERATOR');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRolesEnum_new" USING ("role"::text::"UserRolesEnum_new");
ALTER TYPE "UserRolesEnum" RENAME TO "UserRolesEnum_old";
ALTER TYPE "UserRolesEnum_new" RENAME TO "UserRolesEnum";
DROP TYPE "UserRolesEnum_old";
COMMIT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "live_stream_url" TEXT,
ADD COLUMN     "registration_url" TEXT,
ADD COLUMN     "thumbnail_image" TEXT,
ADD COLUMN     "updated_by" INTEGER,
DROP COLUMN "event_time",
ADD COLUMN     "event_time" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "members" DROP CONSTRAINT "members_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "event_images" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
