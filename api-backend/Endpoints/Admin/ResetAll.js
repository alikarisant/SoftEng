const express = require("express");
const router = express.Router();
var mysql = require("mysql");

function resetall (req,res){
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
        let myquery = "DELETE FROM Keywords_Questionnaire";
        con.query(myquery, function (err, result, fields){
            if (err) {
              return res.send({status : "failed", reason: err});
            }
            let myquery2 = "DELETE FROM User";
            con.query(myquery2, function (err, result, fields){
                if (err) {
                  return res.send({status : "failed", reason: err});
                }
                let myquery3 = "DELETE FROM Question";
                con.query(myquery3, function (err, result, fields){
                    if (err) {
                      return res.send({status : "failed", reason: err});
                    }
                    let myquery4 = "DELETE FROM Questionnaire";
                    con.query(myquery4, function (err, result, fields){
                        if (err) {
                          return res.send({status : "failed", reason: err});
                        }
                        let myquery5 = "DELETE FROM Questionnaire";
                        con.query(myquery5, function (err, result, fields){
                            if (err) {
                              return res.send({status : "failed", reason: err});
                            }
                            let myquery6 = "DELETE FROM Session";
                            con.query(myquery6, function (err, result, fields){
                                if (err) {
                                  return res.send({status : "failed", reason: err});
                                }
                                let myquery7 = "DELETE FROM Answer";
                                con.query(myquery7, function (err, result, fields){
                                    if (err) {
                                      return res.send({status : "failed", reason: err});
                                    }
                                    let myquery8 = "DELETE FROM Qoption";
                                    con.query(myquery8, function (err, result, fields){
                                        if (err) {
                                          return res.send({status : "failed", reason: err});
                                        }
                                        let myquery9 = "DELETE FROM Keywords";
                                        con.query(myquery9, function (err, result, fields){
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
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
//User, Question, Questionnaire, Session, Answer,  Qoption
router.post('/admin/resetall', resetall);
module.exports = router;