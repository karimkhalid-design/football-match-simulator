CREATE TABLE `custom_lineups` (
	`id` varchar(48) NOT NULL,
	`ownerOpenId` varchar(64),
	`name` varchar(120) NOT NULL,
	`playerIds` json NOT NULL,
	`formation` varchar(20) NOT NULL DEFAULT '4-3-3',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `custom_lineups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `match_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(48) NOT NULL,
	`minute` int NOT NULL,
	`eventType` enum('goal','yellow','red','substitution','chance') NOT NULL,
	`team` enum('home','away') NOT NULL,
	`player` varchar(160) NOT NULL,
	`assist` varchar(160),
	`detail` varchar(240) NOT NULL,
	CONSTRAINT `match_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `match_records` (
	`id` varchar(48) NOT NULL,
	`ownerOpenId` varchar(64),
	`homeTeamId` varchar(80) NOT NULL,
	`homeTeamName` varchar(160) NOT NULL,
	`awayTeamId` varchar(80) NOT NULL,
	`awayTeamName` varchar(160) NOT NULL,
	`homeScore` int NOT NULL,
	`awayScore` int NOT NULL,
	`matchStats` json NOT NULL,
	`playedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `match_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `player_careers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`playerId` varchar(120) NOT NULL,
	`period` varchar(80) NOT NULL,
	`club` varchar(160) NOT NULL,
	`appearances` int NOT NULL DEFAULT 0,
	`goals` int NOT NULL DEFAULT 0,
	`note` varchar(180),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `player_careers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `player_profiles` (
	`id` varchar(120) NOT NULL,
	`name` varchar(180) NOT NULL,
	`nationality` varchar(80) NOT NULL,
	`position` enum('GK','DF','MF','FW') NOT NULL,
	`club` varchar(160) NOT NULL,
	`age` int NOT NULL,
	`status` enum('active','retired') NOT NULL,
	`overall` int NOT NULL,
	`appearances` int NOT NULL DEFAULT 0,
	`goals` int NOT NULL DEFAULT 0,
	`assists` int NOT NULL DEFAULT 0,
	`passes` int NOT NULL DEFAULT 0,
	`tackles` int NOT NULL DEFAULT 0,
	`source` varchar(120) NOT NULL DEFAULT 'simulator-catalogue',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `player_profiles_id` PRIMARY KEY(`id`)
);
