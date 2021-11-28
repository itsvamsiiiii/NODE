const mongoose = require("mongoose")

const UserdeatilsSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,

        default:" ",
    },
    state:{
        type:String,
        default:" "
    },
    state:{
        type:String,
        default:" "
    },
    phone_number:{
        type:Number,
        default:" "
    },address:{
        type:String,
        default:" "
    }
})

const Userdetails = mongoose.model("userdetail",UserdeatilsSchema)
module.exports = Userdetails