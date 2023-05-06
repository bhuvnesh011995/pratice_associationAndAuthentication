const { json } = require("body-parser");
let db = require("./../model/index");
const product = require("../model/product");


let getCartDetails = async (req,res,next)=>{
    if(!(await db.user.findByPk(req.params.userId))) return res.status(404).send("no user found");
    let cart = await db.cart.findOne({where:{
        userId: req.params.userId
    }})
        let products = await cart.getProducts();
        console.log(products)
        res.send(cart.totalPrice)
        res.status(200).end();
}

let addPorductIncart = async (req,res,next)=>{
    let user = await db.user.findByPk(req.params.userId)
    if(!user) return res.status(404).send("no user found");
    
    let product = await db.product.findByPk(req.body.id)

    if(!product) return res.status(404).send("no product found");

    let cart = await db.cart.findOne({
        where:{
            userId:req.params.userId
        }
    })
    if(!cart){
        cart = await db.cart.create({
            totalPrice:0
        })
        await user.setCart(cart)
    }
    await cart.addProduct(product);
    let totalCost = Number(cart.totalPrice);
    totalCost += Number(product.price);
    await db.cart.update({totalPrice:totalCost},
        {
            where:{
                id:cart.id
            }
        })
        res.status(200).send("product added").end();
}

let removeProductFromCart = async (req,res,next)=>{
    let cart =await db.cart.findOne({where:{
        userId:req.params.userId
    }});
    let product = await db.product.findOne({where:{
        id:req.body.id
    }})
    await cart.removeProduct(product)
    let totalCost = cart.totalPrice;
    totalCost -= product.price;
    await db.cart.update({totalPrice:totalCost},
        {where:{id:cart.id}})
    res.send("removed product").end()
}

let updateQuantity = async function (req,res,next){
    let cart = await db.cart.findOne({where:{userId:req.params.userId}})
    if(!cart) return;
    let {id,quantity} = req.body;
    if(quantity) {
        await db.product_cart.update({quantity:quantity},{
            where :{
                productId:id,
                cartId:cart.id
            }
        })
        let productInCart = await cart.getProducts();
        let totalCost = 0;
        
        for(i=0;i<productInCart.length;i++){
            let {price,product_cart} = productInCart[i]
            let {quantity} = product_cart
            totalCost += price*quantity
        }
        await db.cart.update({totalPrice: totalCost},{
            where:{
                userId:req.params.userId
            }
        })
        res.send('cart updated').end();
    }
}


let cartController= {
                        getCartDetails,
                        addPorductIncart,
                        removeProductFromCart,
                        updateQuantity
                    }
module.exports = cartController;