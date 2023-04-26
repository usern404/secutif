/*
  Warnings:

  - You are about to drop the column `userId` on the `land_title` table. All the data in the column will be lost.
  - You are about to drop the `user_bank` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `land_title` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `land_title_bankId_fkey` ON `land_title`;

-- DropIndex
DROP INDEX `land_title_userId_fkey` ON `land_title`;

-- AlterTable
ALTER TABLE `land_title` DROP COLUMN `userId`,
    ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `user_bank`;

-- CreateTable
CREATE TABLE `ready` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `amount` INTEGER NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `bankId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `land_title` ADD CONSTRAINT `land_title_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `land_title` ADD CONSTRAINT `land_title_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ready` ADD CONSTRAINT `ready_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ready` ADD CONSTRAINT `ready_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
