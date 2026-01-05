-- CreateEnum
CREATE TYPE "UserRolesEnum" AS ENUM ('ADMIN', 'MEDIA', 'OFFICE');

-- CreateTable
CREATE TABLE "users" (
    "userId" UUID NOT NULL,
    "email" TEXT,
    "phoneNumber" BIGINT,
    "hash" TEXT,
    "role" "UserRolesEnum",
    "activeToken" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");
