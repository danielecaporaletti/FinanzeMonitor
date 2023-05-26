USE `finanze`;

-- MySQL 5.7 --

CREATE OR REPLACE
VIEW `finanze`.`movimenti_mensili` AS
SELECT
    YEAR(`finanze`.`movimenti`.`data`) AS `anno`,
    MONTH(`finanze`.`movimenti`.`data`) AS `mese`,
    `finanze`.`movimenti`.`nome_conto` AS `nome_conto`,
    SUM(IF((`finanze`.`movimenti`.`movimento` > 0), `finanze`.`movimenti`.`movimento`, 0)) AS `entrate`,
    SUM(IF((`finanze`.`movimenti`.`movimento` < 0), `finanze`.`movimenti`.`movimento`, 0)) AS `uscite`
FROM
    `finanze`.`movimenti`
GROUP BY
    `anno`,
    `mese`,
    `finanze`.`movimenti`.`nome_conto`
ORDER BY
    `anno`,
    `mese`,
    `finanze`.`movimenti`.`nome_conto`;

-- MySQL 8 --
/*
create or replace
algorithm = UNDEFINED view `finanze`.`movimenti_mensili` as
select
    row_number() over (
    order by year(`finanze`.`movimenti`.`data`),
    month(`finanze`.`movimenti`.`data`),
    `finanze`.`movimenti`.`nome_conto` ) as `index`,
    year(`finanze`.`movimenti`.`data`) as `anno`,
    month(`finanze`.`movimenti`.`data`) as `mese`,
    `finanze`.`movimenti`.`nome_conto` as `nome_conto`,
    sum(if((`finanze`.`movimenti`.`movimento` > 0), `finanze`.`movimenti`.`movimento`, 0)) as `entrate`,
    sum(if((`finanze`.`movimenti`.`movimento` < 0), `finanze`.`movimenti`.`movimento`, 0)) as `uscite`
from
    `finanze`.`movimenti`
group by
    `anno`,
    `mese`,
    `finanze`.`movimenti`.`nome_conto`
order by
    `anno`,
    `mese`,
    `finanze`.`movimenti`.`nome_conto`;
*/