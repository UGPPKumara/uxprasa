require('dotenv').config();
const mongoose = require('mongoose');

console.log('Starting server test...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('SUCCESS: MongoDB Connected');
        process.exit(0);
    })
    .catch(err => {
        console.error('ERROR: MongoDB connection error:', err);
        process.exit(1);
    });

setTimeout(() => {
    console.log('TIMEOUT: Connection took too long (30s)');
    process.exit(1);
}, 30000);
