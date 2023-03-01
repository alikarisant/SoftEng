const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const handleAnswerQuestion = require('../frontend/answerquestion.js');
let question_id = [];

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'intelliQ'
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

module.exports = function handleRequest(req, res) {
  connection.query('SELECT * FROM Questionnaire', function (error, results, fields) {
    if (error) {
      res.send(error);
      return;
    }

    function generateToken() {
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
      }
      return token;
    }

    let session_id = generateToken();

    let tableRows = '';


    for (let i = 0; i < results.length; i++){
      let myquery3 = "SELECT question_id FROM Question WHERE question_questionnaire_id = '" + results[i].questionnaire_id + "' ORDER BY question_id ASC";
      connection.query(myquery3, function (err, result, fields){
          if (err) throw err;
          if(result[0] != undefined) 
          question_id.push(result[0].question_id);

          tableRows += `<tr>
            <td><a href="firstquestion?questionnaire_id=${results[i].questionnaire_id}&title=${results[i].questionnaire_title}&session_id=${session_id}&question_id=${question_id[i]}">${results[i].questionnaire_title}</a></td>
            <td>${results[i].questionnaire_id}</td>
          </tr>`;
          if (i === results.length-1) {
            fs.readFile(path.join(__dirname, '../frontend/index.html'), 'utf-8', function (error, data) {
              if (error) {
                res.send(error);
                return;
              }
              const html = data.replace('<%= tableRows %>', tableRows);
              res.send(html);
            });
          }
      }); 
    }
  });
}


//app.get('/intelliq_api/answerquestion', handleAnswerQuestion);