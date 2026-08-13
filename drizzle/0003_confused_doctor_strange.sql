ALTER TABLE `users` ADD `username` varchar(24);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);