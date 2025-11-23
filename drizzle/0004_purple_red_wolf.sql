CREATE TABLE `assessmentResults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`assessmentType` enum('quick','full') NOT NULL,
	`score` int NOT NULL,
	`answers` text NOT NULL,
	`recommendations` text NOT NULL,
	`reportGenerated` int NOT NULL DEFAULT 0,
	`emailSent` int NOT NULL DEFAULT 0,
	`crmPushed` int NOT NULL DEFAULT 0,
	`source` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assessmentResults_id` PRIMARY KEY(`id`)
);
