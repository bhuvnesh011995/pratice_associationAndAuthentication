const { DataTypes } = require("sequelize")
let db =require("./../config/db.config")

let product_cart = db.define("product_cart",{
    quantity :{
        type : DataTypes.INTEGER,
        defaultValue : 1,
        notNull : false
    }
},{
    timestamps:false,
    freezeTableName:true
})



module.exports = product_cart;