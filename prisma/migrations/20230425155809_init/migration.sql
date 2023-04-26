/*
  Warnings:

  - You are about to drop the `ready` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `land_title_bankId_fkey` ON `land_title`;

-- DropIndex
DROP INDEX `land_title_clientId_fkey` ON `land_title`;

-- DropTable
DROP TABLE `ready`;

-- CreateTable
CREATE TABLE `loans` (
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
ALTER TABLE `loans` ADD CONSTRAINT `loans_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loans` ADD CONSTRAINT `loans_bankId_fkey` FOREIGN KEY (`bankId`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
