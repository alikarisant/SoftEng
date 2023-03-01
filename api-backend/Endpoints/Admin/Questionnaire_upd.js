const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const fs = require("fs");

function questionnaire_upd (req,res){

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "intelliQ",
        multipleStatements: true
    });

    con.connect(function(err){
        if (err || con.state === 'disconnected') {
            return res.send({status:"failed", dbconnection:"Server=localhost;Database=intelliQ;Uid=root;Pwd=root;"});
        }

        const new_questionnaire = '../data/new_questionnaire.json';
        const data = JSON.parse(fs.readFileSync(new_questionnaire));
        
        let myquery1 = "INSERT INTO Questionnaire (questionnaire_id, questionnaire_title) VALUES ('" + data.questionnaireID + "','" + data.questionnaireTitle + "')";         
        con.query(myquery1, function (err, result, fields){
            if (err) {
              return res.send({status : "failed query 1 " + "error:" + err.message});
            }
            for(let i = 0; i < data.keywords.length; i++) {
                let myquery2 = "INSERT INTO Keywords (keywords_text) VALUES ('" + data.keywords[i] + "')";
                con.query(myquery2, function (err, result, fields){             
                    if (err) {
                        return res.send({status : "failed query 2 " + "error:" + err.message});              
                    }
                    let myquery3 = "SELECT keywords_id FROM Keywords WHERE keywords_text = '" + data.keywords[i] + "'";
                    con.query(myquery3, function (err, result, fields) {
                        if (err) {
                            return res.send({status : "failed query 2 " + "error:" + err.message});              
                        }
                        let keyword_id = result[0].keywords_id;
                        let myquery4 = "INSERT INTO Keywords_Questionnaire (keywords_questionnaire_questionnaire_id, keywords_questionnaire_keywords_id) VALUES ('" + data.questionnaireID + "'," + keyword_id + ")";         
                        con.query(myquery4, function (err, result, fields){                               
                            if (err) {                 
                                return res.send({status : "failed query 3 " + "error:" + err.message});                 
                            }
                            if (i === data.keywords.length - 1) {
                                for (let k = 0; k < data.questions.length; k++) {
                                    let myquery5 = "INSERT INTO Question (question_id, question_text, required, type, question_questionnaire_id) VALUES ('" + data.questions[k].qID + "','" + data.questions[k].qtext + "','" + data.questions[k].required + "','" + data.questions[k].type + "','" + data.questionnaireID + "')";        
                                    con.query(myquery5, function (err, result, fields){                                         
                                        if (err) {                        
                                            return res.send({status : "failed query 5 " + "error:" + err.message});                        
                                        }
                                        for (let j = 0; j < data.questions[k].options.length; j++) {
                                            let myquery6 = "INSERT INTO Qoption (option_id, option_text, option_next_qid, option_question_id) VALUES ('" + data.questions[k].options[j].optID + "','" + data.questions[k].options[j].opttxt + "','" + data.questions[k].options[j].nextqID + "','" + data.questions[k].qID + "')";
                                            con.query(myquery6, function (err, result, fields){                        
                                                if (err) {                        
                                                    return res.send({status : "failed query 6 " + "error:" + err.message});                        
                                                }
                                                if( k === data.questions.length-1 && j === data.questions[k].options.length-1) {
                                                    con.query("INSERT INTO User (user_id, last_name, first_name, email) VALUES (1, 'Alikaris', 'Antonis', 'email')", function(err, result, fields) {
                                                        if (err) {
                                                          return res.send({status : "failed", reason: err});
                                                        }
                                                        con.query("INSERT INTO Session (session_id, session_user_id, session_questionnaire_id) VALUES ('abcd', 1, 'QQ001')", function(err, result, fields) {
                                                            if (err) {
                                                              return res.send({status : "failed", reason: err});
                                                            }
                                                            res.send({status : "OK"});
                                                            con.end(function(err) {
                                                                if (err) {
                                                                return console.log('reason:' + err.message);
                                                                }
                                                                console.log('Close the database connection.');
                                                            });
                                                        });
                                                    }); 
                                                }
                                            });
                                        }            
                                    });
                                }
                            }
                        });
                    });
                });

            }        
            
        });
    });
}

router.post('/admin/questionnaire_upd', questionnaire_upd);
module.exports = router;