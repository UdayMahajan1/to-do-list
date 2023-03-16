const express = require("express") ;

const app = express() ;

// the date module is requrired

const date = require(__dirname+"/date.js") ;

// console.log(date) ;

// the line below is used for finding index.ejs...it's just like 
// app.use(express.static(__dirname+`/public`)) ; in the other code (app.js for newsletter)

app.set('view engine', 'ejs') ;

// the below 2 lines use body parser which is used to get the posted data on the site 
// req.body.toDo works because of these 2 lines 

const {urlencoded} = require('body-parser') ;

const mongoose = require("mongoose") ;

// connecting with the mongodb database 

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true}) ;

app.use(urlencoded({extended:true})) ;

// the below line tells express to access the static files from the public folder
// we need to do this because our website is no longer static (it's dynamic)

app.use(express.static("public")) ;

// we make an array of lists and use for loop in the ejs to list all the elements of the 
// array on our page

// let items = [] ;

// defining the items schema and model in mongoose

const itemsSchema = new mongoose.Schema({
    name : String 
})

const Item = mongoose.model("Item", itemsSchema) ;

// creating the items 

const item1 = new Item({
    name : "Welcome to the To Do List!"
}) ;

const item2 = new Item({
    name : "Hit the + button to enter a new task."
}) ;

const item3 = new Item({
    name : "<----- Hit this to delete an item."
}) ;

const defaultItems = [item1, item2, item3] ;

Item.insertMany(defaultItems, function(err){
    if(err){
        console.log(err) ;
    }
    else{
        console.log('Items entered.') ;
    }
})

app.get("/", function(req,res){
    
    const day = date.getDate() ;

    res.render("index", {day:day, task:items}) ;
    // the second parameter in the render function is the object and its sequence is 
    // {variable name in ejs : variable name in app.js}
})

// here if we try to render/update the task we get an error saying that they couldn't find 
// task that we have written in our index.ejs so instead we need to use it in our get request 
// itself

/* The app.post() method routes all the HTTP POST requests to the specified path with the 
specified callback functions. 
Syntax : app.path(path, callback, [callback])
callback is the middleware function that is to be executed when posted and path is the path
on which the function/middleware is invoked.*/

app.post("/", (req,res)=>{
    console.log(req.body) ;
    if('toDo' in req.body) {
        const task = req.body.toDo ;
    // res.render("index", {task:task}) ; leads to error
    if(task === "") {
        //pass 
    } else {
        items.push(task) ;
    }
    // console.log(task) ;
    res.redirect("/") ;
    } else if('tag' in req.body.data) {
        const div = req.body.data.tag ;
        const index = items.indexOf(div);
        delete items[index] ;
        console.log(items) ;
        res.redirect("/") ;
    }
}) ;

app.listen(3000, function(){
    console.log("Server started on port 3000.") ;
})