const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const parser = require('json-2-csv');


function getsessionanswers (req,res){
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
        const format = req.query.format || 'json';
        let questionnaire = {
            "questionnaireID": req.params.questionnaireID
        };
        let session = {
            "session": req.params.session
        };
        
        let myquery = "SELECT  answer_question_id, answer_option_id FROM Answer WHERE answer_session_id = '" + req.params.session + "' ORDER BY answer_question_id";
        
        con.query(myquery, function (err, result, fields){
            if (err) throw err;
            let answers = {
                "answers": result
            };
            let combined = Object.assign({}, questionnaire, session, answers);
            if (format === 'json')
                res.send(combined);
            else if(format === 'csv') {
                let options = { unwindArrays : true };
                
                let jsonArr = [combined];
                parser.json2csv(jsonArr,function(err,csv) {
                  if (err) throw err;
                  res.send(csv);
                },options);
            }
            else res.send('unknown format');
        
            con.end(function(err) {
                if (err) {
                return console.log('error:' + err.message);
                }
                console.log('Close the database connection.');
            });
        });
    });
}

router.get('/getsessionanswers/:questionnaireID/:session', getsessionanswers);
module.exports = router;