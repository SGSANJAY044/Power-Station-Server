const mongoose = require('mongoose');
//hi
module.exports.connectdb = () => {
    return mongoose.connect(process.env.DB);
};
