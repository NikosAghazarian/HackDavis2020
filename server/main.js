const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router-component.js');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/src/'));
app.use('/', router);


let port = 9683;

app.listen(port, '127.0.0.1');
console.log(`Hosting server on 127.0.0.1 on PORT ${port}`);