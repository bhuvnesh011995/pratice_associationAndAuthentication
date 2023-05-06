let dbConnection = require("./../config/db.config");
let db = require("./../model/index")
let user = db.user;
let cart = db.cart;
let bcryptjs = require("bcryptjs")
let authsecret = require("./../config/auth.config")
let jsonwebtoken = require("jsonwebtoken")

/*let addUser = async function (req,res,next){
 let {name,email,password} = req.body;
 if(!name) return res.status(404).send("name is required")
 if(!email) return res.status(404).send("email is required")
 if(!password) return res.status(404).send("password is required")
    await user.create({
        name:name,
        email:email,
        password:password
    //     cart : {
    //         totalPrice : 0
    //     }
    // },{
    //    include:cart
    // 
    })

    res.status(200).send("user added");
    res.end();
}

let getAllUsers = async function (req,res,next){
    let users =await user.findAll();
    res.status(200).send(JSON.stringify(users)).end();
}
let getUserById = async function(req,res,next){
    let id = req.params.userId;
    let userDetails = await user.findOne({
        where:{
            id: id
        }
    })
    if(!userDetails) return res.status(404).send("no user found").end();

    res.status(200).send(JSON.stringify(userDetails)).end();
}*/

let signUp = async (req,res,next)=>{
let {name,username,email,password} = req.body;
if(!username) return res.status(404).send("username required");
else if(!email) return res.status(404).send("email is mandatory");
else if(!password) return res.status(404).send("enter password");
else if(await user.findOne({where:{username:username}})) return res.status(404).send("username already in use")
else if(await user.findOne({where:{email:email}})) return res.status(404).send("email  already in use");
await user.create({
    name:name,
    username:username,
    email:email,
    password : bcrypt.hashSync(password,8)
})
res.status(404).json({message:"signUp successful"}).end();

}

let logIn = async (req,res,next)=>{
    let {username,password} = req.body;
    let person = await user.findOne({where:{username:username}})
    console.log(person);
    if(!person) return res.status(404).send("no user found")
    let isValidUser = bcrypt.compareSync(password,person.password);
    if(!isValidUser) return res.status(404).send("username or password incorrect");
    let token = jsonwebtoken.sign({id:person.id},authsecret.secret,{expiresIn:50000});
    res.status(200).send({
        id:person.id,
        username:person.username,
        email:person.email,
        accessToken:token
    });
}

module.exports = {/*addUser,getAllUsers,getUserById*/signUp,logIn}