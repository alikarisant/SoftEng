const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const parser = require('json-2-csv');

function question (req,res){
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
        let myquery = "SELECT question_id, question_text, required, type FROM Question WHERE question_questionnaire_id = '" + req.params.questionnaireID + "' AND question_id = '" + req.params.questionID + "'";
        let myquery2 = "SELECT option_id, option_text, option_next_qid FROM Qoption WHERE option_question_id = '" + req.params.questionID + "'";
        con.query(myquery, function (err, result, fields){
            if (err) throw err;
            const question = result[0];
            
            con.query(myquery2, function (err, result, fields){
                if (err) throw err;
                let qoptions = {
                        "options": result
                    };
                let combined = Object.assign({}, questionnaire, question, qoptions);
                if (format === 'json')res.send(combined);
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
    });
}

router.get('/question/:questionnaireID/:questionID', question);
module.exports = router;