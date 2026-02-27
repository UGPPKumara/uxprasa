require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('cloud_log.txt', msg + '\n');
};

if (fs.existsSync('cloud_log.txt')) fs.unlinkSync('cloud_log.txt');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

log('Cloud Name: ' + process.env.CLOUDINARY_CLOUD_NAME);
log('API Key: ' + process.env.CLOUDINARY_API_KEY);

cloudinary.api.ping()
    .then(result => {
        log('Cloudinary Connection: SUCCESS ' + JSON.stringify(result));
        process.exit(0);
    })
    .catch(err => {
        log('Cloudinary Connection: FAILED ' + JSON.stringify(err));
        process.exit(1);
    });
