require('dotenv').config();
const mongoose = require('mongoose');

async function clean() {
    try {
        console.log('Connecting to:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections found:', collections.map(c => c.name));
        
        for (let col of collections) {
            console.log(`Clearing collection: ${col.name}`);
            await mongoose.connection.db.collection(col.name).deleteMany({});
        }
        
        console.log('--- ALL COLLECTIONS CLEARED ---');
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

clean();
