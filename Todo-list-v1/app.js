const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let items = [];
let workItems = [];

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    
    let today = new Date();
    
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", option);     //converts the date into string

    res.render("list", { listTitle: day, newItem: items});
});

app.post("/", (req, res) => {

    let item = req.body.newItem;

    if (req.body.button === "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");  //after getting the data from the webpage redirect it to home route so that we can render it
    }
    
})


app.get('/work', (req, res) => {
    res.render("list", { listTitle: "Work List", newItem: workItems });
});

app.post('/worker', (req, res) => {
    
    let item = req.body.newItem;

    workItems.push(item);

    res.redirect("/worker");
})

app.listen(5000, () => console.log("Server is listening to port 5000"));


/*  --------EJS-----------

EJS is used to render templates  (format: <%= key/variable %>)

res.render() it will render the template

res.render("list", { kindOfDay: day })  ---> res.render() will take 2 parameters :

i) ejs filename (to be render) which must be present inside the folder named "views"
ii) JS object which will take a key/value pair  ; key -> present in list.ejs file && value -> present in app.js file


*/


/*  ----------Scope--------------

Two types of scopes are there in JS

i) Global scope
ii) Local scope


var,let,const  ---> if these are initialized inside a function then they have local scope. If these are initialized outside a function and inside the code then they have Global scope.

Inside a If else statement or inside a loop let & const acts as local but var act as global.


Better practice is to use let and const.


*/

