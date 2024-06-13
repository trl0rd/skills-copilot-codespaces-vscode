// create web server
// import express
const express = require('express');
const app = express();
// import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// import mysql
const mysql = require('mysql');
// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'comment'
});
// connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});
// set view engine
app.set('view engine', 'ejs');
// set public folder
app.use(express.static('public'));
// create route
app.get('/', (req, res) => {
    // select all data from comments table
    connection.query('SELECT * FROM comments', (err, results) => {
        if (err) throw err;
        res.render('index', { comments: results });
    });
});
app.post('/comment', (req, res) => {
    // get data from form
    const comment = req.body.comment;
    // insert data to comments table
    connection.query('INSERT INTO comments SET ?', { comment: comment }, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});
// run server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});