var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  // host     : '',
  // user     : 'cis550',
  // password : '',
  // database : 'patentdb'
   host : 'localhost',
   user : 'root',
   // Enter your password here
   password : 'bhavna12',
   database : 'patentdb' //Enter your local sql database name 
});

var del = connection._protocol._delegateError;
connection._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/searchfriends', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'searchfriends.html'));
});

router.get('/query2', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query2.html'));
});

router.get('/query1_bs', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query1_bs.html'));
});

router.get('/query2_bs', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query2_bs.html'));
});

router.get('/data/:email?', function(req,res){
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  //console.log(req._parsedOriginalUrl.Url.path);
  console.log('typeof:' + typeof(req.params.email));
  if(req.params.email != undefined && req.params.email != 'undefined' )
  {
  var query = "SELECT * from subgroup_new where Login = '"+req.params.email+"';"; 
  
  }
  else
  {
   var query = "SELECT * from subgroup_new\;";
  }
  // note that email parameter in the request can be accessed using "req.params.email"
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/login/:login/name/:name/sex/:sex/RelationshipStatus/:RelationshipStatus/Birthyear/:Birthyear', function(req, res){
 console.log(req.params.login);
 var query = 'INSERT INTO Person values(\''+req.params.login+'\',\''+ req.params.name +'\',\''+req.params.sex+'\',\''+req.params.RelationshipStatus+'\','+req.params.Birthyear+');';
 console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });

});

router.get('/personlogin/:login', function(req,res){
  var query = 'select p.friend from Friends p where p.login =\''+req.params.login+'\' UNION select distinct q.login from Person q where q.login in (select f.friend from Family m inner join Friends f on m.member = f.login where m.login = \''+req.params.login+'\') and q.login <> \''+req.params.login+'\';';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });

});


 router.get('/getFamily', function(req, res){
 var query = 'select ParentCompany,ChildCompany from acquisitions;';
 connection.query(query,function(err, rows, fields){
  if(err) console.log(err);
  else{
    res.json(rows);
    //console.log(rows);
  }

 });

 });


 router.get('/query1_bs/parent/:parentcompany/child/:childcompany', function(req, res){
  console.log("inside query1_bs");
  // var query = 'SELECT * from patent WHERE patent_id="' + req.params.parentcompany + '"';
  var query = 'WITH temp AS (select patent_id,organization from bassignee where organization = "' + req.params.parentcompany + '") select temp.organization, patent.patent_id, patent.title, patent.date, patent.num_claims from temp JOIN patent ON temp.patent_id = patent.patent_id WHERE year>=2000 ORDER BY date DESC';
  if(!(req.params.childcompany === undefined || req.params.childcompany === 'undefined' || req.params.childcompany === ''))
  {
    query = 'WITH temp AS (select patent_id,organization from bassignee where organization = "' + req.params.childcompany + '") select temp.organization, patent.patent_id, patent.title, patent.date, patent.num_claims from temp JOIN patent ON temp.patent_id = patent.patent_id WHERE year>=2000 ORDER BY date DESC';  
  }
  // note that email parameter in the request can be accessed using "req.params.email"
  console.log(query);
  connection.query(query,function(err, rows, fields){
  if(err)
  { 
    console.log(err);
    console.log('error occurred!!');
  }
  else{
    res.json(rows);
  }

 });  


 });

  router.get('/query2_bs/parent/:parentcompany/child/:childcompany', function(req, res){
  console.log("inside query2_bs");
  var query = 'with temp as (select patent_id from bassignee where organization = "' + req.params.parentcompany + '") select patent.patent_id, patent.title, patent.date from temp join patent where temp.patent_id = patent.patent_id and patent.title like "%'+ req.params.childcompany + '%" ORDER BY date DESC';


  //select p.patent_id,p.title,a.organization from patent p join assignee a on p.patent_id = a.patent_id where title like '%Robotic%';
  console.log(query);

  connection.query(query,function(err, rows, fields){
  if(err)
  { 
    console.log(err);
    console.log('error occurred!!');
  }
  else{
    res.json(rows);
  }

 });  


 });

  router.get('/query4_bs/child/:childcompany', function(req, res){
  console.log("inside query4_bs");
  //var query = 'with temp as (select patent_id from bassignee where organization = "' + req.params.parentcompany + '") select patent.patent_id, patent.title, patent.date from temp join patent where temp.patent_id = patent.patent_id and patent.title like "%'+ req.params.childcompany + '%" ORDER BY date DESC';

  var query = 'select a.organization,p.patent_id,p.title,p.date from patent p join assignee a on p.patent_id = a.patent_id where p.title like "%'+ req.params.childcompany + '%" ORDER BY date DESC';
  console.log(query);

  connection.query(query,function(err, rows, fields){
  if(err)
  { 
    console.log(err);
    console.log('error occurred!!');
  }
  else{
    res.json(rows);
  }

 });  


 });

//Show friends
router.get('/query2BS', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'query2BS.html'));
});

 router.get('/friends/:login', function(req,res) {
  console.log("inside show friends");
  var query = 'with temp as (select patent_id from bassignee where organization = "Google") select patent.patent_id, patent.title, patent.year from temp join patent where temp.patent_id = patent.patent_id and patent.title like "%'+ req.params.login + '%"';
  
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

// ----Your implemention of route handler for "Insert a new record" should go here-----


module.exports = router;