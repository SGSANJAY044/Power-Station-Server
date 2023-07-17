const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const stationSchema = new Schema({
id:{type:Number,required:true},
company_name:{type:String,required:true},
name: {type:String,required:true},
status: String,
// workers:[{
//     type: Schema.Types.ObjectId,
//     ref: "Station"
// }],
created_at: {
type : Date,
default :Date.now
},
isStation:{type:Boolean,
    default:true},
lat:{
    type: String,
    },
lon:{
    type: String,
}
})

module.exports.Station = mongoose.model('Station', stationSchema);