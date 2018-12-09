LOAD DATA INFILE
'/tmp/acquisitions.csv' INTO TABLE acquisitions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
IGNORE 1 LINES
(
`AcquisitionYear`,
`ChildCompany`,
`ParentCompany`
);
