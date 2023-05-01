USE `finanze`;

DELIMITER //
CREATE TRIGGER update_conti_after_insert_in_movimenti
AFTER INSERT ON `movimenti`
FOR EACH ROW
BEGIN
    UPDATE `conti`
    SET `saldo` = `saldo` + NEW.`movimento`
    WHERE `nome_conto` = NEW.`nome_conto`;
END;
//
DELIMITER ;