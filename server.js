const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// // define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node_crud',
    port:'3308' 
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
}); 

//rest api to get all results
app.get('/employees', function (req, res) {
    console.log(req);
    connection.query('select * from employee', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to get a single employee data
app.get('/employees/:id', function (req, res) {
    console.log(req);
    connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });

 //rest api to create a new record into mysql database
app.post('/employees', function (req, res) {
    console.log(req);
    var postData  = req.body;
    connection.query('INSERT INTO employee (firstname, lastname, address, skills) VALUES  ("ismael", "sarunay", "davao", "dances");', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });` `
 
//rest api to update record into mysql database
app.put('/employees', function (req, res) {
    console.log(req);
    connection.query('UPDATE `employee` SET firstname="ismael", lastname="sarunay", address="mintal", skills="coding" where id="4"', [req.body.firstname,req.body.lastname, req.body.address,  req.body.skills, req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
  
 //rest api to delete record from mysql database
 app.delete('/employees', function (req, res) {
    console.log(req.body);
    connection.query('DELETE FROM `employee` WHERE `id`=3', [req.body.id], function (error, results, fields) {
       if (error) throw error;
       res.end('Record has been deleted!');
     });
 });

 

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
