const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();


const app = express()
//CONNECT DB
//mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?${process.env.MONGODB_QUERY_STRING}`);
mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
//template engine
app.set("view engine", "ejs");

//global variable
global.userIN = null;

//middlewares
app.use(express.static("public"))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const mongoClientPromise = new Promise((resolve) => {
    mongoose.connection.on("connected", () => {
        const client = mongoose.connection.getClient();
        resolve(client);
    });
});

const sessionStore = MongoStore.create({
    clientPromise: mongoClientPromise,
    dbName: "smartedu-db",
    collection: "sessions"
});


app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,

}))

app.use(flash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next()
});

app.use(
    methodOverride('_method', {
    methods: ['POST', 'GET']
})
);





//routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute); //dashboard,login,loagout burdan geliyor



const port = 3000
app.listen(port, () => {
    console.log(`app started on port ${port}`)
})

