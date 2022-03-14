const express = require('express');
const app = express();
const port = 3000;

// middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
app.use(logger);
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// setting session
const session = require('express-session')
app.use(session({
  secret: 'Monolitic App for Code Challenge 7',
  resave: false,
  saveUninitialized: false
}))

// setting passport for local strategy
const passportLocal = require('./lib/passportLocal')
app.use(passportLocal.initialize())
app.use(passportLocal.session())

// setting passport for JWT strategy
const passportJwt = require('./lib/passportJwt')
app.use(passportJwt.initialize())

// setting flash
const flash = require('express-flash')
app.use(flash())

// menggunakan view engine ejs
app.set('view engine', 'ejs');

// route
const router = require('./router')
const routerAPI = require('./routers')
app.use(router)
app.use(routerAPI)

// nyalakan web server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});