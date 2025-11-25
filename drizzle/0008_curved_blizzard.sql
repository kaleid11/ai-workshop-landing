CREATE TABLE `userOnboarding` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`completedItems` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userOnboarding_id` PRIMARY KEY(`id`),
	CONSTRAINT `userOnboarding_userId_unique` UNIQUE(`userId`)
);
