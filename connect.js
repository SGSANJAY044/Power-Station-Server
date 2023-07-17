const mongoose = require('mongoose');

module.exports.connectdb = () => {
    return mongoose.connect(process.env.DB);
};