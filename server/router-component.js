const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const uuidv4 = require('uuid/v4');

const router = require('express').Router();

const upload = require('./upload-middleware-component.js');

const options = {
    root: path.join(__dirname, '/src/')
}


router.get('/', (req, res, err) => {
    res.sendFile('./views/index.html', options);
});

router.get('/imagedata', (req, res, err) => {   
    res.sendFile(`../img_data/${req.query.id}`, { root: path.join(__dirname, '/src/'), headers: {fileId: `${filename}`} })
}) 

router.post('/upload/post', upload.single('image'), (req, res, err) => {
    if (!req.file) {
        console.log('no image sent');
        res.status(406);//.json({ error: "No Image Sent" });
        res.send();
        return;
    }

    const TTL = 600; //time to live for images, in seconds
    const id = uuidv4();
    const filename = id + '.png';
    const imagePath = path.join(__dirname, `/images/${filename}`);

    fs.writeFileSync(imagePath, req.file.buffer);
    console.log(`File ${filename} has been created and will be stored for ${TTL} seconds locally before deletion.`);
    setTimeout( () => {
        fs.unlink(imagePath, (err) => {
            if (err) throw err;
            console.log(`File ${filename} was deleted.`);
        });
        fs.unlink(path.join(__dirname, `/img_data/${id}.json`), (err) => {
            if (err) throw err;
            console.log(`File ${filename} was deleted.`);
        });
    }, TTL*1000);
    exec(`py ../VisionTest.py ${imagePath} ${filename}`, (err) => {
        console.log(err);
    });
    res.status(200).sendFile('./views/visualization.html', { root: path.join(__dirname, '/src/'), headers: {fileId: `${filename}`} });
    return;
});

module.exports = router