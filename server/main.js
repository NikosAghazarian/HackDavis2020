const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const router = require('./router-component.js');


let app = express();

const directory = path.join(__dirname + '/temp_images/'); // this mess cleans the temp_images if the program quit before its removal callback
fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/src/'));
app.use('/', router);


let port = 9683;

app.listen(port, '127.0.0.1');
console.log(`Hosting server on 127.0.0.1 on PORT ${port}`);