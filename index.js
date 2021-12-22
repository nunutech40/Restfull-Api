const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const res = require('express/lib/response');

// parse application/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbEnglishSentence'
})

// connect to database
conn.connect((err) => {
    if(err) throw err;
    console.log('Mysql Connected...');
});

// tampilkan semua data kalimat bahasa inggris
app.get('/api/sentence', (req, res) => {
    let sql = "select * from english_sentence";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

// tampilkan data sentece berdasarkan id
app.get('/api/sentence/:id', (req, res) => {
    let sql = "select * from english_sentence where id_sentece="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
})

// tambahkan data sentece baru
app.post('/api/sentence', (req, res) => {
    let data = {
        sentence_english: req.body.sentence_english,
        sentece_indo: req.body.sentece_indo
    };
    let sql = "insert into english_sentence SET ?";
    let query = conn.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});
// edit data berdasarkan id
app.put('/api/sentence/:id', (req, res) => {
    let sql = "Update english_sentence set sentence_english='"+req.body.sentence_english+"', sentece_indo='"+req.body.sentece_indo+"' where id_sentece="+req.params.id+""
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});
 
// delete data berdasarkan id
app.delete('/api/sentence/:id', (req, res) => {
    let sql = "delete from english_sentence where id_sentece="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});


//require ('./routers/index')(app)


app.listen(3000, () => {
    console.log('Server started in port 3000')
})