CREATE TABLE `answer_texts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer_text` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY (`answer_text`)
);

CREATE TABLE `answers` (
    `save_id` INTEGER NOT NULL,
    `text_id` INTEGER NOT NULL,
    `answer` ENUM('yes', 'no', 'skip', 'dnk') DEFAULT NULL,
    `type` ENUM('answer', 'topic') NOT NULL,
    `order` SMALLINT NOT NULL,
    PRIMARY KEY (`save_id`, `text_id`)
);

CREATE TABLE `save_ids` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hashid` VARCHAR(255) DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);
