const {Schema,model}=require('mongoose')

const UserDetailsSchema=Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique: true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  phoneNo:{
    type:Number,
    required:true
  },
  
  ticket_id:{
    type:Array
  },
  token:{
    type:String
  },
},{
    timestamps:true
})

module.exports.User=model('User',UserDetailsSchema)