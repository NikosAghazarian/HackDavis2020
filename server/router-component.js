const path = require('path');
const fs = require('fs');
const exec = require('child_process');
const uuidv4 = require('uuid/v4');

const router = require('express').Router();

const upload = require('./upload-middleware-component.js');

const options = {
    root: path.join(__dirname, '/src/')
}


router.get('/', (req, res, err) => {
    res.sendFile('./views/index.html', options);
});

router.post('/upload/post', upload.single('image'), (req, res, err) => {
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }

    const TTL = 120; //time to live for images, in seconds
    const filename = uuidv4() + '.png';
    const imagePath = path.join(__dirname, `/temp_images/${filename}`);

    fs.writeFileSync(imagePath, req.file.buffer);
    console.log(`File ${filename} has been created and will be stored for ${TTL} seconds locally before deletion.`);
    setTimeout( () => {
        fs.unlink(imagePath, (err) => {
            if (err) throw err;
            console.log(`File ${filename} was deleted.`);
        });
    }, TTL*1000);

    res.status(200).json({ name: filename });
    //need to send page data after api responses
});

module.exports = router