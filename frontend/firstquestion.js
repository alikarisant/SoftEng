const mysql = require('mysql');
const fs = require('fs');
const path = require('path');


module.exports = function handleAnswerQuestion (req,res) {
  const questionnaire_id = req.query.questionnaire_id;
  const title = req.query.title;
  const session_id = req.query.session_id;
  const question_id = req.query.question_id
  let question_text, question_type, question_required, option_id = [], option_text = [], option_next_qid = [], type, input = '';



  //connection to db 
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'intelliQ'
  });

  

    //create a new session
  let myquery = "INSERT INTO Session (session_id, session_user_id, session_questionnaire_id) VALUES (" + "'" + session_id + "'" + "," + "1" + "," + "'" + questionnaire_id + "')";
  connection.query(myquery, function (err, result, fields){
  if (err) {
    if (err.code !== 'ER_DUP_ENTRY') throw err;
  }
            
      
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
        } else {
          type = 'radio';
        } 
        let form = '';
        if (type === 'text') {
            input = '<input type="text" name="option_id" value=""">';
            form = 
                  `<form id="form" method="POST" >
                    <div id="questionTitle">${question_text}</div>
                    <div id="questionField">
                       ${input}
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                  <script>
                     const form = document.getElementById("form");
                        form.addEventListener("submit", function(event) {
                          event.preventDefault(); // prevent the form from submitting normally

                          
                          const newUrl = './doanswer/` + questionnaire_id + `/` + question_id + `/` + session_id + `/` + option_id[0] + `';
                          form.action = newUrl; 
                          form.submit(); 
                        });
                  </script>
                  `;
        } else {
            for (let i = 0; i < option_id.length; i++) {
              input += `
                <label>
                <input type="radio" name="option_id" value="${option_id[i]}"> ${option_text[i]}
                <input type="hidden" name="session_id" value="${session_id}">
                </label>
                `;
            }
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
  });
};