SELECT
  `answer_text` AS `text`,
  `answer`,
  `type`
FROM `answers`
INNER JOIN `answer_texts`
ON (`answers`.`text_id` = `answer_texts`.`id`)
WHERE `save_id` = :saveId
ORDER BY `order` ASC
