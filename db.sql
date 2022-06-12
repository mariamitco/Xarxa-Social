CREATE TABLE `app_db`.`users`(
    `id` INT NOT NULL AUTO_INCREMENT ,
    `email` VARCHAR(50) NOT NULL ,
    `password` VARCHAR(50) NOT NULL ,
    `name` VARCHAR(50) NOT NULL ,

    PRIMARY KEY (`id`), UNIQUE (`email`),
    UNIQUE (`name`)
) ENGINE = InnoDB;