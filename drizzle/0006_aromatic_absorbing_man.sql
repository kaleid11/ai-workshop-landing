CREATE TABLE `sessionFeedback` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`company` varchar(255),
	`currentChallenges` text NOT NULL,
	`topicsInterested` text NOT NULL,
	`preferredFormat` enum('live','recorded','both') NOT NULL,
	`additionalComments` text,
	`source` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessionFeedback_id` PRIMARY KEY(`id`)
);
