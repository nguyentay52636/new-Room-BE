const { required } = require('joi')
const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token : {type :String , required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'nguoiDung',required:true},
    createAt:{ type : Date , default : Date.now,expires:'365d'}, // tự xóa sau 1 nămm
})

module.exports=mongoose.model('RefreshToken',refreshTokenSchema)

