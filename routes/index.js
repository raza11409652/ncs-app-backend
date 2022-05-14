const linkRoutes = require('./link')

const v1Routes = require('express').Router()


v1Routes.get("/",(req,res)=>{
    return res.send("OK")
})

v1Routes.use("/link",linkRoutes)

module.exports = v1Routes