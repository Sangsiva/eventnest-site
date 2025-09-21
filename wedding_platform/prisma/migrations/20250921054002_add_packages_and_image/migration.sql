-- AlterTable
ALTER TABLE "vendors" ADD COLUMN "image" TEXT;

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "features" TEXT,
    "vendorId" TEXT NOT NULL,
    CONSTRAINT "packages_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
