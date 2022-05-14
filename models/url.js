const mongoose = require('mongoose')
const Scheme = mongoose.Schema
const URLSchema = new Scheme({
    longUrl:{type:String,required:true},
    shortUrl:{type:String,required:true},
    timestamp:{type:Number,default:null},
    qrCode:{type:String,default:null},
    encoded:{type:String,required:true,unique:true}

},{timestamps:true,collection:"urls"})
module.exports = mongoose.model("urlSchema",URLSchema)