-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'SOCIETY', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'ALL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACCEPTED', 'PENDING', 'REJECT');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "price_per_month" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Kos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KosImage" (
    "id" SERIAL NOT NULL,
    "kos_id" INTEGER NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "KosImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KosFasilities" (
    "id" SERIAL NOT NULL,
    "kos_id" INTEGER NOT NULL,
    "fasility" JSONB NOT NULL,

    CONSTRAINT "KosFasilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "kos_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "kos_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KosFasilities_kos_id_key" ON "KosFasilities"("kos_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_user_id_key" ON "Reviews"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Books_user_id_key" ON "Books"("user_id");

-- AddForeignKey
ALTER TABLE "Kos" ADD CONSTRAINT "Kos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KosImage" ADD CONSTRAINT "KosImage_kos_id_fkey" FOREIGN KEY ("kos_id") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KosFasilities" ADD CONSTRAINT "KosFasilities_kos_id_fkey" FOREIGN KEY ("kos_id") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_kos_id_fkey" FOREIGN KEY ("kos_id") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_kos_id_fkey" FOREIGN KEY ("kos_id") REFERENCES "Kos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
