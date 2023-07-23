const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const hostSchema = new Schema({
id:{type:Number,required:true},
company_name: {type:String,required:true},
email: {type:String,required:true},
phone: {type:String,required:true},
isHost:{type:Boolean,
    default:true},
password: {
    type: String,
    },
status: String,
isActive:{type:Boolean,
    default:false},
created_at: {
type : Date,
default :Date.now
},
stations:[{
        type: Schema.Types.ObjectId,
        ref: "Station"
    }]
})

module.exports.Host = mongoose.model('Host', hostSchema);