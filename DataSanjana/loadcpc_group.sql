LOAD DATA INFILE
'/tmp/group_clean.tsv' INTO TABLE cpc_group
FIELDS TERMINATED BY '\t'
IGNORE 1 LINES
(
`id`,
`title`
);
