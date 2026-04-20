/*
  Warnings:

  - Added the required column `bodyTemplate` to the `TemplateVersion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeholderLegend` to the `TemplateVersion` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TemplateRenderer" AS ENUM ('HANDLEBARS');

-- AlterTable with defaults to satisfy existing rows
ALTER TABLE "TemplateVersion"
ADD COLUMN "bodyTemplate" TEXT NOT NULL DEFAULT '',
ADD COLUMN "lastValidatedAt" TIMESTAMP(3),
ADD COLUMN "lastValidationErrors" JSONB,
ADD COLUMN "placeholderLegend" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN "rendererType" "TemplateRenderer" NOT NULL DEFAULT 'HANDLEBARS';
