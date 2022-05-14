const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
dotEnv.config() //Path can be used for different environment
const v1Routes = require('./routes')
const connectToMongoDb = require('./config/mongo.config')
const linkAccessRoutes = require('./routes/link.access')
const app = express()
app.use(express.json())
//cors enabled from every where
app.use(cors())

//port
const PORT = process.env.PORT ||8000

app.use("/",linkAccessRoutes)
//All routes will be handled from Here
app.use("/v1",v1Routes)

connectToMongoDb((result)=>{
    if(result) process.exit(1)
    console.log("Mongo connection success");
})
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

