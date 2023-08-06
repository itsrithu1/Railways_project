const {Schema,model}=require('mongoose')

const PassengerDetailsSchema=Schema({
 
  name:{
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  dob:{
    type:String,
    required:true
  },
  phoneNo:{
    type:String,
    required:true
  },
  insurance:{
    type:Boolean,
    required:false
  },
  food:{
    type:String,
    required:false
  },
  ticket_id:{
    type:String,
    required:true
  },
  train_Number:{
    type:String,
    required:true
  },
  seat_Number:{
    type:String,
    required: true
  },
  insurance:{
    type:String,
  },
  food:{
    type:String,
  }


},{
    timestamps:true
})

module.exports.Passenger=model('Passenger',PassengerDetailsSchema)