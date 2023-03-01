const express = require("express");
const router = express.Router();
var mysql = require("mysql");

function healthcheck (req,res){
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
        console.log("connected");
        res.send({status:"OK", dbconnection:"Server=localhost;Database=intelliQ;Uid=root;Pwd=root;"});

        con.end(function(err){
            if (err){
                return console.log("error:" + err.message);
            }
            console.log('Close the database connection');
        });
    });
}

router.get('/admin/healthcheck', healthcheck);
module.exports = router;