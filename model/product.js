let dbInstance = require("./../config/db.config")

let {DataTypes,Sequelize} = require("sequelize");

let product = dbInstance.define('product',{
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        notNull:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        notNull:true
    },
    company_name:{
        type:DataTypes.STRING,
        defaultValue:"other"
    },
    price:{
        type:DataTypes.DECIMAL,
        notNull:true
    }
},{
    freezeTableName:true,
    timestamps:false,
    tableName:"product"
})


module.exports = product;