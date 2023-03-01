const express = require("express");
const bodyParser = require("body-parser");
const https = require ("https");
const cors = require ("cors");
const port = 9103;
const fs = require ("fs");
const baseURL = '/intelliq_api';
const app = express();
const router = express.Router();
const handleRequest = require('../frontend/questionnaires.js');
const handleAnswerQuestion = require('../frontend/answerquestion.js');
const handleFirstQuestion = require('../frontend/firstquestion.js');
var path = require ("path");
const mysql = require("mysql")

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const options = {
  key: fs.readFileSync('./private-key-file.pem'),
  cert: fs.readFileSync('./certificate-file.pem')
};

var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "intelliQ",
        multipleStatements: true
    });

    con.connect(function(err){
      

      https.createServer(options, app).listen(port, () => {
      console.log('Server running on port', port);
      });
    
    });



/*app.listen(port, () =>{
    console.log("Server is running on port", port);
});*/


//get 
app.get(baseURL, handleRequest);

app.use('/intelliq_api/answerquestion', handleAnswerQuestion);
app.use('/intelliq_api/firstquestion', handleFirstQuestion);



//load all endpoints
const questionnaire = require ("../api-backend/Endpoints/Questionnaire.js");
const getquestionanswers = require ("../api-backend/Endpoints/GetQuestionAnswers.js");
const question = require ("../api-backend/Endpoints/Question.js");
const doanswer = require ("./Endpoints/DoAnswer");
const getsessionanswers = require ("../api-backend/Endpoints/GetSessionAnswers.js");
const healthcheck = require ("../api-backend/Endpoints/Admin/HealthCheck.js");
const resetall = require ("../api-backend/Endpoints/Admin/ResetAll.js");
const resetq = require ("../api-backend/Endpoints/Admin/Resetq.js");
const questionnaire_upd = require ("../api-backend/Endpoints/Admin/Questionnaire_upd.js");

//bind all endpoints to app router
app.use(baseURL, questionnaire);
app.use(baseURL, getquestionanswers);
app.use(baseURL, question);
app.use(baseURL, doanswer);
app.use(baseURL, getsessionanswers);
app.use(baseURL, healthcheck);
app.use(baseURL, resetall);
app.use(baseURL, resetq);
app.use(baseURL, questionnaire_upd);
app.use("/", router);

//app.use(express.static(path.join(__dirname, '../frontend')));

//module.exports = router;

