/*************************************************************************/
/*                                                                       */
/*  AUTHOR: Alice Chao  (akchao)                                         */
/*  NODE JS - communicates with server side                              */
/*                                                                       */
/*************************************************************************/

var express = require('express');
var router = express.Router();
var path = require('path');


// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'project'
});









































// DON'T SCROLL ABOVE HERE ////////////////////////////////////////////////////////////













/*************************************************************************/
/*                                                                       */
/*  Route handler for navigation bar                                     */
/*                                                                       */
/*************************************************************************/

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/showfamily', function(req, res,next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'showfamily.html'));
});

router.get('/familyfriends', function(req, res,next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'familyfriends.html'));
});

router.get('/query2', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query2.html'));
});

router.get('/query3', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query3.html'));
});

router.get('/query4', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','query4.html'));
});




/*************************************************************************/
/*                                                                       */
/*  Route handler for "query3" page >> populating parent drop down menu  */
/*                                                                       */
/*************************************************************************/

router.get('/parentCo', function(req,res) {  

  var query = 'SELECT * FROM parentCompanies';
  console.log(query); 

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});


/*************************************************************************/
/*                                                                       */
/*  Route handler for "query3" page >> button                            */
/*                                                                       */
/*************************************************************************/

router.get('/parentCo/:selectedCo', function(req,res) {  

  var company = req.params.selectedCo;  
  console.log("selected parent company is... "+company);

  // var query = 'SELECT p.year as year, own.patent_id as patent_id, s.id as subgroup_id, s.title as category FROM (SELECT * FROM assignee WHERE org = "'+company+'") own JOIN (SELECT patent_id, subgroup_id FROM cpc_current) cpc ON own.patent_id = cpc.patent_id JOIN subgroup s ON s.id = cpc.subgroup_id JOIN (SELECT patent_id, year FROM patent) p ON p.patent_id = cpc.patent_id AND p.patent_id = own.patent_id GROUP BY p.year, own.patent_id, s.id, s.title';

  var query = 'SELECT g.id, p.year, count(*) as count, g.title FROM project.assignee a, project.patent p, project.group g, project.cpc_current cpc WHERE a.org = "'+company+'" AND a.patent_id = p.patent_id AND p.patent_id = cpc.patent_id AND cpc.group_id = g.id AND a.patent_id = cpc.patent_id GROUP BY g.id, p.year order by g.id, p.year asc';


  console.log(query); 

  connection.query(query, function(err, rows, fields) {   
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});




/*************************************************************************/
/*                                                                       */
/*  Route handler for "query4" page >> populating parent drop down menu  */
/*                                                                       */
/*************************************************************************/

router.get('/q4/parentCo', function(req,res) {  

  var query = 'SELECT * FROM parentCompanies';
  console.log(query); 

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});


/*************************************************************************/
/*                                                                       */
/*  Route handler for "query4" page >> button                            */
/*                                                                       */
/*************************************************************************/

router.get('/q4/parentCo/:selectedCo', function(req,res) {  

  var company = req.params.selectedCo;  
  console.log("selected parent company is... "+company);

  var query = 'SELECT DISTINCT a.org as org, l.latitude as lat, l.longitude as lon FROM assignee a, location_assignee la, location l WHERE a.org = "'+company+'" AND a.assignee_id = la.assignee_id AND la.location_id = l.id UNION SELECT DISTINCT a.org as org, l.latitude as lat, l.longitude as lon FROM acquisitions acq, assignee a, location_assignee la, location l WHERE acq.ParentCompany = "'+company+'" AND a.org = acq.ChildCompany AND a.assignee_id = la.assignee_id AND la.location_id = l.id;';

  // var query = 'SELECT g.id, p.year, count(*) as count, g.title FROM project.assignee a, project.patent p, project.group g, project.cpc_current cpc WHERE a.org = "'+company+'" AND a.patent_id = p.patent_id AND p.patent_id = cpc.patent_id AND cpc.group_id = g.id AND a.patent_id = cpc.patent_id GROUP BY g.id, p.year';


  console.log(query); 

  connection.query(query, function(err, rows, fields) {   
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});







/*************************************************************************/
/*                                                                       */
/*  Route handler for populating parent & child drop down menus          */
/*                                                                       */
/*************************************************************************/

router.get('/getFamily', function(req, res){
 var query = 'select ParentCompany, ChildCompany from acquisitions order by ParentCompany asc;';
 connection.query(query,function(err, rows, fields){
  if(err) console.log(err);
  else{
    res.json(rows);
    //console.log(rows);
  }

 });

 });


 router.get('/query2/parent/:parentcompany/child/:childcompany', function(req, res){
  console.log('abcabc');
  var query = 'select * from acquisitions where ParentCompany = \''+req.params.parentcompany+
  '\'and ChildCompany = \''+req.params.childcompany+'\' order by ParentCompany asc;';
  console.log(query);
  connection.query(query,function(err, rows, fields){
  if(err)
  { 
    console.log(err);
    console.log('jflsdk');
  }
  else{
    res.json(rows);
  }

 });  


 });




/************************** FOR REFERENCE ********************************/

/*************************************************************************/
/*                                                                       */
/*  Route handler for "Your Work" page >> "Show Persons" button          */
/*                                                                       */
/*************************************************************************/

router.get('/data/:email', function(req,res) {  

  var email = req.params.email;         // accessing email param in request
  var query = 'SELECT * from Person';
  var queryEmail = 'SELECT * FROM Person where login="'+email+'"';


  if (email != 'undefined') {           // satisfy second part of Q1
    console.log(queryEmail);
    connection.query(queryEmail, function(err, rows, fields) {   
      if (err) console.log(err);
      else {
          res.json(rows);
      }  
    });

  } else { 

    console.log(query);                 // satisfy first part of Q1
    connection.query(query, function(err, rows, fields) {   
      if (err) console.log(err);
      else {
          res.json(rows);
      }      
    });
  }
});
 


/*************************************************************************/
/*                                                                       */
/*  Route handler for "Find Family Friends" page button                  */
/*                                                                       */
/*************************************************************************/

router.get('/familyfriends/:email', function(req,res) {  

// SQL QUERY: 
// select friend as login from Friends where login = 'awest@gmail.com' UNION select friend from (select login from Family where member = 'awest@gmail.com' UNION select member from Family where login = 'awest@gmail.com') as fam join Friends f1 on fam.login = f1.login where friend <> 'awest@gmail.com';

  var email = req.params.email;
  console.log(email);
  
  var query = 'SELECT friend as login FROM Friends WHERE login = "'+email+'" UNION SELECT friend FROM (SELECT login FROM Family WHERE member = "'+email+'" UNION SELECT member FROM Family WHERE login = "'+email+'") as fam JOIN Friends f1 ON fam.login = f1.login WHERE friend <> "'+email+'"';
  console.log(query); 

  connection.query(query, function(err, rows, fields) {   
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});



/*************************************************************************/
/*                                                                       */
/*  Route handler for "Show Family" page >> populating drop down menu    */
/*                                                                       */
/*************************************************************************/

router.get('/family/', function(req,res) {  

  var query = 'SELECT DISTINCT login FROM Family';
  console.log(query); 

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});


/*************************************************************************/
/*                                                                       */
/*  Route handler for "Show Family" page >> "show family" button         */
/*                                                                       */
/*************************************************************************/

router.get('/family/:selectedPerson', function(req,res) {  

// SQL QUERY: 
// select Person.login as login, Person.name as name, Person.sex as sex, Person.relationshipStatus as relationshipStatus from Person left join Family on Person.login = Family.member where Family.login='awest@gmail.com';  

  var person = req.params.selectedPerson;  
  console.log("person login is: "+person);

  var query = 'SELECT DISTINCT Person.login as login, Person.name as name, Family.role as role, Person.sex as sex, Person.relationshipStatus as relationshipStatus, Person.birthyear as birthyear FROM Person LEFT JOIN Family ON Person.login = Family.member WHERE Family.login="'+person+'"'; 
  console.log(query); 

  connection.query(query, function(err, rows, fields) {   
    if (err) console.log(err);
    else {
      res.json(rows);
    }      
  });

});


module.exports = router;  