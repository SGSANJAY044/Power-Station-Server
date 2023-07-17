const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const userSchema = new Schema({
name: {type:String,required:true},
email: {type:String,required:true},
phone: {type:String,required:true},
password: {
    type: String,
    },
status: String,
created_at: {
type : Date,
default :Date.now
},
lat:{
    type: String,
    },
lon:{
    type: String,
}
})

module.exports.User = mongoose.model('User', userSchema);