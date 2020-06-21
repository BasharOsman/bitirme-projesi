const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//Set Storage 
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/news');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//Upload
const upload = multer({ storage }).fields([{ name: 'newsImage', maxCount: 1 }])
// UserProfile Model

router.post('/', (req, res) => {

    upload(req, res, function (err) {
        console.log('req.files', req.files)
        if (err) {
            console.log('err', err)
            return res.end("Error uploading file.");
        }
        const { files } = req
        const filesKeys = Object.keys(files)

        const uploadedFilesArray = filesKeys.map(key => {
            console.log('files[key]', files[key])
            return {
                key,
                path: `uploads/news/${files[key][0].filename}`
            }
        }
        )
        const uploadedPhotos = {}
        uploadedFilesArray.forEach(item => {
            const { key } = item;
            uploadedPhotos[key] = item.path
        })
        res.json(uploadedPhotos)
    });

});

router.get('/:imageName', (req, res) => {

    let imageName = req.params.imageName
    let imagePath = __dirname + "/uploads/" + imageName
    let image = fs.readFileSync(imagePath)
    let mime = fileType(image).mime

    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
})
module.exports = router;