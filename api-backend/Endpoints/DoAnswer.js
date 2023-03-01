const express = require("express");
const router = express.Router();
var mysql = require("mysql");
let question_id;
function doanswer (req,res){
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
        let myquery5 = "INSERT INTO Answer (answer_questionnaire_id, answer_question_id, answer_session_id, answer_option_id) VALUES (" + "'" + req.params.questionnaireID + "'" + "," + "'" + req.params.questionID + "'"
                     + "," + "'" + req.params.session + "'" + "," + "'" + req.params.optionID + "')";
        con.query(myquery5, function (err, result, fields){
            if (err) throw err;
        
        /*let myquery6 = 'SELECT option_next_qid FROM Qoption WHERE option_id =' + req.params.optionID;
        con.query(myquery6, function (err, result, fields){
            if (err) throw err;
            question_id = result[0].option_next_qid;

        });*/
        con.end(function(err) {
            if (err) {
            return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        });
    });
    
        res.status(200).redirect('/intelliq_api/answerquestion?questionnaire_id=' + req.params.questionnaireID + '&title="hi"&session_id=' + req.params.session + '&question_id=' + req.params.optionID);
});
}

router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', doanswer);
module.exports = router;