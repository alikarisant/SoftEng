const express = require("express");
const router = express.Router();
var mysql = require("mysql");

function resetq (req,res){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "intelliQ",
        multipleStatements: true
    });

    con.connect(function(err){
        if (err) throw err;
        console.log("connected");
        let myquery = "DELETE FROM Answer WHERE answer_questionnaire_id = '" + req.params.questionnaireID + "'"; 
        con.query(myquery, function (err, result, fields){
            if (err) {
              return res.send({status : "failed", reason: err});
            }
            else res.send({status : "OK"});
        });
        con.end(function(err) {
            if (err) {
            return console.log('reason:' + err.message);
            }
            console.log('Close the database connection.');
        });
    });
}

router.post('/admin/resetq/:questionnaireID', resetq);
module.exports = router;