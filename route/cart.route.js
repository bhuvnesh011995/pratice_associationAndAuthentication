let express = require("express");
let cartController = require('./../controller/cart.controller');
const { cart } = require("../model");

let router = express.Router();

router.get("/", (req,res,next)=>{
    res.status(200).send("login first").end();
})
router.get("/:userId", cartController.getCartDetails);
router.post("/:userId",cartController.addPorductIncart);
router.delete("/:userId", cartController.removeProductFromCart);
/*router.put("/:userId", async (req,res,next)=>{
    await cart.update({totalPrice:0},{
        where:{
            userId:req.params.userId
        }
    })
    res.send("updated").end();
})*/
router.put("/:userId",cartController.updateQuantity)


module.exports = router;