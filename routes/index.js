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
  connectionString: 'postgres://ztofmzxuprvzke:6fe148964f7f25e2602cea7836bbb9f8f5b0b99cca8dbbafac4902d638686209@ec2-54-83-61-142.compute-1.amazonaws.com:5432/d31aef7km7hgds',
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

router.post("/insertAccount", function(req, res, next) {
    console.log(req.body);
    if(req.body!=null || req.body!=''){
 var q ="INSERT INTO salesforce.account (Name, Phone,address__c,PostgresId__c) VALUES('"+req.body.name+"','"+req.body.phone+"','"+req.body.address+"','"+gen()+"');";
  client.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
 }
});


module.exports = router;
