/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `event_time` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `id` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "live_stream_url" TEXT,
ADD COLUMN     "registration_url" TEXT,
ADD COLUMN     "thumbnail_image" TEXT,
ADD COLUMN     "updated_by" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "event_time",
ADD COLUMN     "event_time" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'ACTIVE',
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "event_images" (
    "id" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "year" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
