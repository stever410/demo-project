const mongoose = require('mongoose');

async function connect(connectionString) {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect to database success!");
    } catch(err) {
        console.log(err);
    }
}

module.exports = {connect};