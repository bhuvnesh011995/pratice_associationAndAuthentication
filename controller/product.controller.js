let db = require("./../model/index");

let product = db.product;

let getAllProduct = async function (req,res,next){
    let products = await product.findAll();
    if(!products) return res.status(404).send("not product found");
    res.status(200).send(JSON.stringify(products)).end();
}

let getProductById = async function (req,res,next){
    let id =await product.findByPk(req.params.productId);
    if(!id) return res.status(404).send("no product found")
    res.status(200).send(JSON.stringify(id)).end();

}

let addProduct = async (req,res,next)=>{
    console.log(req.body)
        let {name,company_name,price} = req.body;
        if(!name) return res.status(404).send("name is require");
        if(!price) return res.status(404).send("price is required");
        await product.create({
            name:name,
            company_name : company_name,
            price:price
        })

        res.status(200).send("product added").end();
}

let updateProduct = async (req,res,next)=>{
    let productToUpdate = await product.findByPk(req.params.productId);
    if(!productToUpdate) return res.status(404).send("product is required");
    let {name,company_name,price} =  req.body;
    if(!name && !company_name &&!price) return res.status(404).send("provide some details");
    await product.update({
        name:name,
        company_name:company_name,
        price:price
    },{
        where:{
            id:req.params.productId
        }
    })
    res.status(300).send("product updated").end();
}


let deleteProduct = async (req,res,next)=>{
    let id = req.params.productId;
    let productDetail = product.findByPk(id);
    if(!productDetail) return res.stauts(404).send("no product found");
    await product.destroy({
        where:{id:id}
    })
    res.status(200).send("product deleted").end();
}

let productController ={
                        getAllProduct,
                        getProductById,
                        updateProduct,
                        addProduct,
                        deleteProduct
                        }
module.exports = productController