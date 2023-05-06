let express = require("express");
let serverConfig = require("./config/server.config");
let router = require("./route/index")
let bodyParser = require("body-parser")
let dbInstance = require("./config/db.config")
let app = express();

app.use(bodyParser.json())
app.use(router)

console.log(serverConfig.PORT)

// dbInstance.sync({force:true});

app.listen(serverConfig.PORT,()=>{
    console.log(`server started at port ${serverConfig.PORT}`)
})