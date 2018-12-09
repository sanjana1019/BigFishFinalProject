LOAD DATA INFILE
'/tmp/trimUS_term_of_grant_clean.tsv' INTO TABLE us_term_of_grant
FIELDS TERMINATED BY '\t'
IGNORE 1 LINES
(
`patent_id`,
`disclaimer_date`
);
