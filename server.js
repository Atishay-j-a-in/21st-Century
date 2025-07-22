//to add varibales in templates.
import express from "express"
import dotenv from "dotenv"
const app = express()
const port = 3000
import mongoose from "mongoose"

import { user } from "../task1/models/schema.js"
import { Product } from "../task1/models/schema.js"


dotenv.config()

function rate(num) {
    if (num > Math.floor(num)) {

        return ("★".repeat(num) + "⯪")
    }
    else {
        return "★".repeat(num)
    }
}
let conn = await mongoose.connect(process.env.conn)

//parse json bodies
app.use(express.json())

//parse url encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }))


app.use(express.static("public"))//this serves files at root , so no need to add /public in path of its elements
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render("signup")
}).post('/signup', async (req, res) => {

    try {
        const { username, email, pass, repass } = req.body //req.body contains all the data sent by form at this endpoint

        if (pass != repass) {
            return res.status(400).json({ error: 'Passwords do not match' })
        }
        const newUser = new user({ username: username, email: email, passwd: pass })
        await newUser.save()

        //send success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { username: username, email: email }
        })
    }
    catch (error) {
        res.status(201).json({
            success: false,
            error: 'Server error:' + error.message
        })
    }
}).post('/login', async (req, res) => {


    try {
        const { username, pass } = req.body

        if (!username || !pass) {
            return res.status(400).json({ error: "username and password required" })

        }
        const User = await user.findOne({ username: username })

        if (!User) {
            return res.status(404).json({ error: 'User not found ', message: "Don't have an account create one", action: "signup" })
        }


        if (!(pass === User.passwd)) {
            return res.status(401).json({
                error: 'Invalid password'
            })
        }
        // if not active then found valid  

        //if suuceesful then send res to client server 
        res.status(200).json({
            message: 'Login Succesful',
            redirect: `/${User.username}`,
            user: { username: User.username, email: User.email }
        })

    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ error: 'Server error during login' })
    }
}).get("/:slug/cart", async (req, res) => {
    let User= await user.findOne({username:req.params.slug})
    
    
    res.render("cart",{name:User.name,amt:User.amt,cart:User.cart})
}).post("/:slug/add", async (req, res) => {
    const User1 = await user.findOne({ username: req.params.slug })
    const { prod } = req.body

    const item = await Product.findOne({ name: prod })




    const existingprod = User1.cart.find(cartitem => cartitem.name === item.name)
    if (existingprod) {
       
        existingprod.total += 1 //mongoose cant detect this change inside array in the key
        User1.markModified('cart')
        console.log(existingprod)
    }
    else {
        User1.cart.push({
            name: item.name,
            elongated_name: item.elongated_name,
            desc: item.description,
            total: 1
        })
    }
    
    User1.amt+=item.price

    try {
        await User1.save()
        res.json({ success: true, cart: User1.cart })
    }
    catch (error) {
        console.log(error)
    }

}).post("/:slug/cart/remove",async (req,res)=>{
    const User1 = await user.findOne({ username: req.params.slug })
    const { prod } = req.body
    const item = await Product.findOne({ name: prod })
    const existingprod = User1.cart.find(cartitem => cartitem.name === item.name)
    console.log(typeof(existingprod.total))
    if(existingprod.total>1){
        console.log("more than 1")
        existingprod.total -= 1 
        console.log(User1.cart)
    }
    else if(existingprod.total==1){
        console.log("only 1")
        User1.cart=User1.cart.filter(cartitem =>{return cartitem.name != item.name})
        console.log(User1.cart)
    }
    User1.markModified('cart')
    User1.amt-=item.price
    
    await User1.save()
    res.json({ success: true, cart: User1.cart })

}).get("/:slug/orders", (req, res) => {
    res.render("order")
}).get("/:slug", async (req, res) => {
    let item = await Product.find({})


    res.render("home", { item: item, rate: rate, name_u: req.params.slug })
}).get("/:slug/:slug", async (req, res) => {
    let item = await Product.find({ name: req.params.slug })//returns json in list
    console.log(item)
    res.render("product", { prod: item[0], rate: rate })
})


app.listen(port, () => {
    console.log(`example app listening on port http://localhost:${port}`)
})