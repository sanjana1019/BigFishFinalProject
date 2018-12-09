LOAD DATA INFILE
'/tmp/trimCPC_current_clean.tsv' INTO TABLE cpc_current
FIELDS TERMINATED BY '\t'
IGNORE 1 LINES
(
`patent_id`,
`section_id`,
`subsection_id`,
`group_id`,
`subgroup_id`
);
