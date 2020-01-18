const express = require('express');

const RoutingComponent = require('./router-component.js');


let app = express();

//app.use(express.static(__dirname + '/src/'));
app.use('/', RoutingComponent.home);



let port = 9683;

app.listen(port, '127.0.0.1');
console.log(`hosting server on 127.0.0.1 on port ${port}`);