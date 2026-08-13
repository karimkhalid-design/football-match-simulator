CREATE TABLE `teams` (
	`id` varchar(80) NOT NULL,
	`name` varchar(160) NOT NULL,
	`shortName` varchar(16) NOT NULL,
	`country` varchar(80) NOT NULL,
	`colour` varchar(20) NOT NULL,
	`accent` varchar(20) NOT NULL,
	`status` enum('active','retired') NOT NULL,
	`strength` int NOT NULL,
	`playerIds` json NOT NULL,
	`source` varchar(120) NOT NULL DEFAULT 'simulator-catalogue',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `teams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `match_records` ADD `homeLineupIds` json NOT NULL;--> statement-breakpoint
ALTER TABLE `match_records` ADD `awayLineupIds` json NOT NULL;