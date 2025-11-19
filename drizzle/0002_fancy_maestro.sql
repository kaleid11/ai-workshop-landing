CREATE TABLE `adminTokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(64) NOT NULL,
	`used` int NOT NULL DEFAULT 0,
	`usedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`usedAt` timestamp,
	CONSTRAINT `adminTokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `adminTokens_token_unique` UNIQUE(`token`)
);
