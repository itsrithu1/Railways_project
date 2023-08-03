require('dotenv/config')
const express=require('express')
const mongoose=require('mongoose');
const app=express();
const PORT=process.env.PORT||3001
const cors = require('cors');
const router = require('./routes');
const bodyParser=require('body-parser')



app.use(cors());
// app.use("/resources", express.static(__dirname + "/public"));
app.use(express.json())
app.use(router)
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//   });



mongoose.connect(process.env.MONGODB_URL_ATLAS,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`Connected successfully to mongoDB`)
}).catch(err=>{
    console.log(err)
    console.log('MongoDB connection failed')
})

app.get('/',(req,res)=>{
   return res.json({
    "message":"Deployed successfully"
    })
})

app.listen(PORT,()=>{
    console.log(`server listening port ${PORT}`)
})

