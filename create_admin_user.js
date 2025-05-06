const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://booktracker:Admin123@cluster0.n5fvg38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function createOrUpdateAdmin() {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    let user = await User.findOne({ email: 'ge@gmail.com' });
    if (user) {
        user.password = 'gege123';
        user.isAdmin = true;
        await user.save();
        console.log('Updated existing user to admin:', user.email);
    } else {
        user = new User({
            username: 'admin',
            email: 'ge@gmail.com',
            password: 'gege123',
            isAdmin: true
        });
        await user.save();
        console.log('Created new admin user:', user.email);
    }
    mongoose.disconnect();
}

createOrUpdateAdmin().catch(err => {
    console.error('Error creating/updating admin:', err);
    mongoose.disconnect();
}); 