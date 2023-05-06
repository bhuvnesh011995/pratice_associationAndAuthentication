let express = require("express")
let router = express.Router();
let productController = require("./../controller/product.controller")

router.get("/",productController.getAllProduct)
router.get("/:productId",productController.getProductById)
router.post("/",productController.addProduct)
router.delete("/:productId",productController.deleteProduct)
router.put("/:productId",productController.updateProduct)



module.exports = router;