const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/mychef', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => run()).catch(err => {
    console.error('DB connection error', err);
    process.exit(1);
});

async function run() {
    try {
        const users = await User.find({});
        for (const user of users) {
            let changed = false;
            user.ingredients = (user.ingredients || []).map(i => {
                if (typeof i === 'string') {
                    changed = true;
                    return { name: i, expiry: '' };
                }
                return i;
            });
            if (changed) {
                await user.save();
                console.log(`Updated ${user.id}`);
            }
        }
        console.log('Migration complete');
    } catch (err) {
        console.error('Migration failed', err);
    } finally {
        mongoose.disconnect();
    }
}
