const dbInstance = require("../config/db.config");
let { DataTypes} = require("sequelize")


let cart = dbInstance.define("cart",{
    totalPrice:{
        type:DataTypes.DECIMAL,
        defaultValue:0
    }
},
{
    freezeTableName:true,
    timestamps:false
})

// cart.sync();

module.exports = cart;