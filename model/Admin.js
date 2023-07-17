const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const adminSchema = new Schema({
name: {type:String,required:true},
email: {type:String,required:true},
phone: {type:String,required:true},
isAdmin:{type:Boolean,
    default:true},
password: {
    type: String,
    },
status: String,
created_at: {
type : Date,
default :Date.now
}
})

module.exports.Admin = mongoose.model('Admin', adminSchema);