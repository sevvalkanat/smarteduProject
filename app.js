const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute')

const app = express()

//CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db'
).then(()=>{
    console.log('DB connected succescfuly')
})

//template engine
app.set("view engine","ejs");

//middlewares
app.use(express.static("public"))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//routes
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories',categoryRoute);
app.use('/users',userRoute);
//app.use('/login',userRoute); 


const port = 3000
app.listen(port,()=>{
    console.log(`app started on port ${port}`)
})

