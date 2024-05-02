import mongoose, { Schema } from 'mongoose'


const MetaUserSchema=new mongoose.Schema({
    userId:String,
    status:{
        type:String,
        enum:['online','offline'],
        default:"offline"
    },
    requests:[{
        requestedUser:String,
        readStatus:Boolean
    }],
    charactorName:{
        type:String,
        default:""
    },

},{timestamps:true})

export const Meta = mongoose.model("Meta",MetaUserSchema)
