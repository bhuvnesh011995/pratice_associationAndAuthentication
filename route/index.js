let express = require("express");
let app = express();
let router = express.Router();
let userroute = require("./user.route")
let productRoute = require("./product.route")
let cartRoute = require("./cart.route")



router.get("/", (req,res,next)=>{
    res.status(200).send("i am in the base route")
})


router.use("/users",userroute)
router.use("/products", productRoute)
router.use("/cart", cartRoute)

module.exports = router;