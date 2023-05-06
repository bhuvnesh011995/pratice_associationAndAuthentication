let dbInstance = require("./../config/db.config");
let {sequelize,DataTypes, DATE} = require("sequelize")
let user = dbInstance.define("user",{
    id:{
        type: DataTypes.BIGINT,
        notNull:true,
        autoIncrement:true,
        primaryKey: true
    },
    username:{
        type:DataTypes.STRING,
        notNUll: true
    },
    name:{
        type:DataTypes.STRING,
        notNull:true
    },
    email:{
        type:DataTypes.STRING,
        notNull:true
    },
    password:{
        type:DataTypes.STRING,
        notNull:true
    }
},
{
    freezeTableName:true,
    timestamps:false,
    tableName:"userTable"
})

// user.sync();

module.exports = user;