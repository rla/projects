INSERT INTO `answer_texts` (`answer_text`)
VALUES (:text) ON DUPLICATE KEY
UPDATE `answer_text` = VALUES(`answer_text`)
