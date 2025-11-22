CREATE TABLE `forumComments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forumComments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forumPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pillarId` int,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`isPinned` int NOT NULL DEFAULT 0,
	`isLocked` int NOT NULL DEFAULT 0,
	`viewCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `forumPosts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `membershipTiers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`slug` varchar(64) NOT NULL,
	`priceMonthly` int NOT NULL,
	`priceAnnual` int NOT NULL,
	`foundingPriceMonthly` int,
	`foundingPriceAnnual` int,
	`stripePriceIdMonthly` varchar(255),
	`stripePriceIdAnnual` varchar(255),
	`features` text NOT NULL,
	`maxWorkshopsPerMonth` int NOT NULL DEFAULT 0,
	`forumAccess` int NOT NULL DEFAULT 0,
	`prioritySupport` int NOT NULL DEFAULT 0,
	`displayOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `membershipTiers_id` PRIMARY KEY(`id`),
	CONSTRAINT `membershipTiers_name_unique` UNIQUE(`name`),
	CONSTRAINT `membershipTiers_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `pillars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`slug` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`iconUrl` varchar(255),
	`status` enum('active','coming_soon') NOT NULL DEFAULT 'active',
	`launchDate` timestamp,
	`displayOrder` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pillars_id` PRIMARY KEY(`id`),
	CONSTRAINT `pillars_name_unique` UNIQUE(`name`),
	CONSTRAINT `pillars_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `prompts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(64),
	`tool` varchar(64),
	`useCase` text,
	`promptText` text NOT NULL,
	`ripeRole` text,
	`ripeInstructions` text,
	`ripeParameters` text,
	`ripeExamples` text,
	`tags` text,
	`status` enum('approved','pending','archived') NOT NULL DEFAULT 'approved',
	`tierRequired` enum('free','starter','lite','pro','elite') NOT NULL DEFAULT 'free',
	`source` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`createdBy` int,
	CONSTRAINT `prompts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` enum('playbook','cheatsheet','template','workflow','video') NOT NULL,
	`pillarId` int,
	`fileUrl` varchar(500) NOT NULL,
	`thumbnailUrl` varchar(500),
	`tierRequired` enum('free','starter','lite','pro','elite') NOT NULL DEFAULT 'free',
	`downloadCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tools` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(64),
	`url` varchar(500),
	`pricingModel` varchar(64),
	`features` text,
	`useCase` text,
	`tags` text,
	`logoUrl` varchar(500),
	`status` enum('approved','pending','archived') NOT NULL DEFAULT 'approved',
	`tierRequired` enum('free','starter','lite','pro','elite') NOT NULL DEFAULT 'free',
	`quickStartGuide` text,
	`documentationUrl` varchar(500),
	`g2Url` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tools_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`tierId` int NOT NULL,
	`stripeSubscriptionId` varchar(255),
	`stripeCustomerId` varchar(255),
	`status` enum('active','cancelled','past_due','trialing') NOT NULL DEFAULT 'active',
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`cancelAtPeriodEnd` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSubscriptions_stripeSubscriptionId_unique` UNIQUE(`stripeSubscriptionId`)
);
--> statement-breakpoint
CREATE TABLE `workshopRegistrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`workshopId` int NOT NULL,
	`userId` int NOT NULL,
	`status` enum('registered','attended','no_show') NOT NULL DEFAULT 'registered',
	`registeredAt` timestamp NOT NULL DEFAULT (now()),
	`attendedAt` timestamp,
	CONSTRAINT `workshopRegistrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workshops` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`pillarId` int NOT NULL,
	`tierRequired` enum('lite','pro','elite') NOT NULL DEFAULT 'lite',
	`sessionType` enum('lite','pro') NOT NULL DEFAULT 'lite',
	`durationMinutes` int NOT NULL,
	`scheduledAt` timestamp NOT NULL,
	`googleMeetUrl` varchar(500),
	`recordingUrl` varchar(500),
	`materialsUrl` varchar(500),
	`maxAttendees` int,
	`status` enum('scheduled','completed','cancelled') NOT NULL DEFAULT 'scheduled',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workshops_id` PRIMARY KEY(`id`)
);
