const path = require('path');

const home = require('express').Router();


const options = {
    root: path.join(__dirname, '/src/')
}

home.get('/', (req, res, err) => {
    res.sendFile('./views/index.html', options);
})



module.exports = {
    home: home
}