const mysql = require('mysql');
const fs = require('fs');
const path = require('path');


module.exports = function handleAnswerQuestion (req,res) {
  const questionnaire_id = req.query.questionnaire_id;
  const title = req.query.title;
  const session_id = req.query.session_id;
  const next_qid = req.query.question_id;
  let question_id, question_text, question_type, question_required, option_id = [], option_text = [], option_next_qid = [], type, input = '', text_option_id;



  //connection to db 
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'intelliQ'
  });

    
  let myquery2 = "SELECT option_next_qid FROM Qoption WHERE option_id = '" + next_qid + "'";
  connection.query(myquery2, function (err, result, fields){
    if (err) throw err;
    let question_id = result[0].option_next_qid;
  
    if(question_id !== '-') {  
      let myquery3 = "SELECT * FROM Question WHERE question_id = '" + question_id + "'";
      connection.query(myquery3, function (err, result, fields){
        if (err) throw err;
        question_text = result[0].question_text;
        question_required = result[0].required;
        question_type = result[0].type;

          //find the text and next_qid for each option

        let myquery4 = "SELECT * FROM Qoption WHERE option_question_id = '" + question_id + "' ORDER BY option_id ASC";
        connection.query(myquery4, function (err, result, fields){
          if (err) throw err;
          for (let i = 0; i < result.length; i++) {
            option_id.push(result[i].option_id);
            option_text.push(result[i].option_text);
            option_next_qid.push(result[i].option_next_qid);
          };
          if (result.length === 1) {
            type = 'text';
            text_option_id = result[0].option_id;
          } else {
            type = 'radio';
          } 

          if (type === 'text') {
            input = '<input type="text" name="option_id" value="' + option_id[0] + '"">'
          } else {
            for (let i = 0; i < option_id.length; i++) {
              input += `
                <label>
                <input type="radio" name="option_id" value="${option_id[i]}"> ${option_text[i]}
                <input type="hidden" name="session_id" value="${session_id}">
                </label>
                `;
            }
          }
          let form = '';
          if(type === 'radio') {
            form = `
              <form id="form" method="POST" >
                <div id="questionTitle">${question_text}</div>
                <div id="questionField">
                   ${input}
                </div>
                <button type="submit" onclick="updateFormAction()">Submit</button>
              </form>
              <script>
                 function updateFormAction() {
                  const form = document.getElementById('form');
                  const optionId = document.querySelector('input[name="option_id"]:checked').value;
                  //form.action = 'doanswer/' + ${questionnaire_id} + '/' + ${question_id} + '/' + ${session_id} + '/' + optionId;
                  form.action = './doanswer/` + questionnaire_id + `/` + question_id + `/` + session_id + `/' + optionId;
                }
              </script>
              `;
          } else {
                form = `
              <form id="form" method="POST" >
                <div id="questionTitle">${question_text}</div>
                <div id="questionField">
                   ${input}
                </div>
                <button type="submit" onclick="updateFormAction()">Submit</button>
              </form>
              <script>
                 function updateFormAction() {
                  const form = document.getElementById('form');
                  const optionId = document.querySelector('input[name="option_id"]:checked').value;
                  //form.action = 'doanswer/' + ${questionnaire_id} + '/' + ${question_id} + '/' + ${session_id} + '/' + optionId;
                  form.action = './doanswer/` + questionnaire_id + `/` + question_id + `/` + session_id + `/` + text_option_id + `';
                }
              </script>
              `;

            }

      //when submit display the question in the next_question_id of the option

          fs.readFile(path.join(__dirname, '../frontend/answerquestion.html'), 'utf-8', function (error, data) {
            if (error) {
              res.send(error);
              return;
            }

            const html = data
              .replace('<%= questionnaire_id %>', questionnaire_id)
              .replace('<%= title %>', title)
              .replace('<%= form %>', form)
              .replace('<%= session_id %>', session_id);
        
            res.send(html);
          });
        });
      });
    } else {
      res.redirect(/intelliq_api/);
    }

  });
};