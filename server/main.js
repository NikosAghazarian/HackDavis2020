const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const router = require('./router-component.js');


let app = express();

const directory = path.join(__dirname + '/images/'); // cleans stray temporary local images from users
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


let port = process.env.PORT || 9683;
let addr = '10.50.221.202';
app.listen(port, addr);
console.log(`Hosting server on ${addr} on PORT ${port}: http://${addr}:${port}`);