var express = require('express');
var router = express.Router();
const { Client } = require('pg');
var rn = require('random-number');
var gen = rn.generator({
  min:  10000000
, max:  99999999
, integer: true
})
var client = new Client({
  connectionString: 'postgres://tautzsldkgxevf:225922cce0147ad1421ad8f154a60a2ef7bba5a1ef979dbe7952619f347b955a@ec2-54-243-241-62.compute-1.amazonaws.com:5432/d50133m9jircp7',
  ssl: true,
});
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accountInsert');
});

router.get("/getallCases", function(req, res, next) {
  client.query('SELECT * from salesforce.case;', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
  
});

router.post("/newAccount", function(req, res, next) {
    console.log(req.body);
    if(req.body!=null || req.body!=''){
 var q ="INSERT INTO salesforce.account (Name, Phone,address__c,PostgresId__c) VALUES('"+req.body.name+"','"+req.body.phone+"','"+req.body.address+"','"+gen()+"');";
  client.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
 }
});

router.post("/insertAccount", function(req, res, next) {
  var reqbody = req.body;
 
    console.log(reqbody);
    var q ="INSERT INTO salesforce.account (Name, Phone,address__c,PostgresId__c) VALUES";
    reqbody.forEach((acc,index,array) => {
      if (index === (array.length -1)) {
        q+= "('"+acc.name+"','"+acc.phone+"','"+acc.address+"','"+gen()+"')";
    }else{
    q+= "('"+acc.name+"','"+acc.phone+"','"+acc.address+"','"+gen()+"'),";
    }
    });
    q+= ';';
    console.log(q);
    client.query(q, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
   
   
});


module.exports = router;
