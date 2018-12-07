CREATE schema patent;

LOAD DATA INFILE
'/tmp/group_clean.tsv' INTO TABLE cpc_group
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
`id`,
`title`
);


LOAD DATA INFILE
'/tmp/acquisitions_clean.csv' INTO TABLE acquisitions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
`year`,
`childCompany`,
`parentCompany`
);

LOAD DATA INFILE
'/tmp/us_term_of_grant_clean.csv' INTO TABLE us_term_of_grant
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
`patent_id`,
`disclaimer_date`
);

LOAD DATA INFILE
'/tmp/rawassignee.tsv' INTO TABLE assignee
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
@dummy,
`patent_id`,
`assignee_id`,
@dummy,
@dummy,
@dummy,
@dummy,
@dummy,
`assignee_organization`
);

LOAD DATA INFILE
'/tmp/cpc_2.tsv' INTO TABLE cpc_current
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
`patent_id`,
`section_id`,
`subsection_id`,
`group_id`,
`subgroup_id`
);

SELECT count(*) from assignee;


SELECT year, count(*) AS number_of_acquisitions
FROM acquisitions
GROUP BY year
ORDER BY count(*) DESC
LIMIT 5;


SELECT ParentCompany, count(*) AS number_of_acq_in_20yrs
FROM acquisitions
WHERE year >= 1988 AND year <= 2018
GROUP BY ParentCompany
ORDER BY count(*) DESC
LIMIT 7;

SET SESSION MAX_EXECUTION_TIME=60000;

SELECT DISTINCT G.id AS cpc_group_id, G.title AS description
FROM us_term_of_grant T
JOIN cpc_current C ON T.patent_id = C.patent_id
JOIN cpc_group G ON C.group_id = G.id
WHERE T.disclaimer_date = '0000-00-00'
ORDER BY G.title
LIMIT 5;

DROP INDEX  idx_cpc_current_group_id ON cpc_current;

CREATE INDEX `idx_cpc_current_group_id` ON cpc_current (`group_id`);


SELECT DISTINCT G.id AS cpc_group_id, G.title AS description, count(*) AS num
FROM us_term_of_grant T
JOIN cpc_current C ON T.patent_id = C.patent_id
JOIN cpc_group G ON C.group_id = G.id
WHERE T.disclaimer_date = '0000-00-00'
GROUP BY G.id
ORDER BY count(*) DESC
LIMIT 5;

SELECT * FROM acquisitions;

SELECT count(*) FROM assignee;

SHOW VARIABLES LIKE "secure_file_priv";


SET GLOBAL local_infile = true;


SET secure_file_priv = '/tmp';

SHOW GLOBAL VARIABLES LIKE 'upload_max_filesize';
SET GLOBAL upload_max_filesize = 800M;

SELECT char_length(title) AS L FROM cpc_group ORDER BY 1 DESC LIMIT 1;
