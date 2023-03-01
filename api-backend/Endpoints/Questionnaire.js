const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const parser = require('json-2-csv');


function questionnaire (req,res){
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
        let myquery1 = "SELECT keywords_text FROM Keywords, Keywords_Questionnaire WHERE keywords_id = Keywords_Questionnaire.keywords_questionnaire_keywords_id AND Keywords_Questionnaire.keywords_questionnaire_questionnaire_id = '" + req.params.questionnaireID + "'";
        let myquery2 = "SELECT * FROM Questionnaire WHERE questionnaire_id = '" + req.params.questionnaireID + "'";
        let myquery3 = "SELECT question_id, question_text, required, type FROM Question WHERE question_questionnaire_id = '" +  req.params.questionnaireID + "' ORDER BY question_id";

        con.query(myquery1, function (err, result, fields){
            if (err) throw err;
            const keywords = result.map((result) => result.keywords_text);

            con.query(myquery2, function (err, result, fields){
                if (err) throw err;
                const questionnaire = result[0];
                
                con.query(myquery3, function (err, result, fields){
                    if (err) throw err;
                    
                    let questions = {
                        "questions": result
                    };
                    
                    let combined = Object.assign({}, questionnaire, {keywords}, questions);
                    
                    if (format === 'json') res.send(combined);
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
    });
}

router.get('/questionnaire/:questionnaireID', questionnaire);
module.exports = router;