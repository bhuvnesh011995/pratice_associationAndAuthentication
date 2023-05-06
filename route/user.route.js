
let userController = require("./../controller/user.controller")
let express = require("express");
let route = express.Router();

express().use((req,res,next)=>{
    res.header("Access-Control-Allow-Header",
    "x-access-token","origin","Content-Type","Accept");
    next();
});
route.post("/signUp", userController.signUp);
route.post("/logIn",userController.logIn);


module.exports = route;