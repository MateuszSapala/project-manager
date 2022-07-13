SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `project_manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `project_manager`;

CREATE TABLE `access` (
  `id` bigint NOT NULL,
  `project_role` int DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `project` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sprint` (
  `id` bigint NOT NULL,
  `end` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `closed` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `task` (
  `id` bigint NOT NULL,
  `created` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `task_state` int DEFAULT NULL,
  `assigned_to_id` bigint DEFAULT NULL,
  `created_by_id` bigint DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `sprint_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `admin` bit(1) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_access_in_project` (
  `id` bigint NOT NULL,
  `project_role` int DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `access`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKii97xs0qi64wnudlbl2j2fr5h` (`project_id`,`user_id`),
  ADD KEY `FKtqbjbrm8i7rsswxtksqw9f369` (`user_id`);

ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_3k75vvu7mevyvvb5may5lj8k7` (`name`);

ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKerwve0blrvfhqm1coxo69f0xr` (`project_id`);

ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt1sjwk9x13qt1i602os9r0nm5` (`assigned_to_id`),
  ADD KEY `FKsaw2pfw389opao1w32cljexhk` (`created_by_id`),
  ADD KEY `FKk8qrwowg31kx7hp93sru1pdqa` (`project_id`),
  ADD KEY `FKao8fqiovc2g9en1pq7jaengh6` (`sprint_id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

ALTER TABLE `user_access_in_project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKe31hiyuc5yaiyq4lkv8rhw9yw` (`project_id`,`user_id`),
  ADD KEY `FK7faovqsb2k85qyegt7do3bwg6` (`user_id`);


ALTER TABLE `access`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `project`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `sprint`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `task`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_access_in_project`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;


ALTER TABLE `access`
  ADD CONSTRAINT `FKalqx3el9datlm9v1p72g5bkm5` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FKtqbjbrm8i7rsswxtksqw9f369` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `sprint`
  ADD CONSTRAINT `FKerwve0blrvfhqm1coxo69f0xr` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

ALTER TABLE `task`
  ADD CONSTRAINT `FKao8fqiovc2g9en1pq7jaengh6` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`),
  ADD CONSTRAINT `FKk8qrwowg31kx7hp93sru1pdqa` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FKsaw2pfw389opao1w32cljexhk` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKt1sjwk9x13qt1i602os9r0nm5` FOREIGN KEY (`assigned_to_id`) REFERENCES `user` (`id`);

ALTER TABLE `user_access_in_project`
  ADD CONSTRAINT `FK7faovqsb2k85qyegt7do3bwg6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKbvdcs6lkfg8myq65f0o2jmch9` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);