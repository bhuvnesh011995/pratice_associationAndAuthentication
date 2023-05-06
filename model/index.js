let db = {};


db.user = require("./user");
db.cart = require("./cart");
db.product = require("./product")
db.product_cart = require("./Product_cart");


db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);
db.product.belongsToMany(db.cart,{
    through:db.product_cart,
    foreignKey : "productId",
    otherKey: "cartId"
});
db.cart.belongsToMany(db.product,{
    through:db.product_cart,
    foreignKey:"cartId",
    otherKey:"productId"
})

module.exports = db;