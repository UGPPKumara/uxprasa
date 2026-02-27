require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);

cloudinary.api.ping()
    .then(result => {
        console.log('Cloudinary Connection: SUCCESS', result);
        process.exit(0);
    })
    .catch(err => {
        console.error('Cloudinary Connection: FAILED', err);
        process.exit(1);
    });
