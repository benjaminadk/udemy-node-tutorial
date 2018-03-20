const express = require("express")
const hbs = require("hbs")
const fs = require("fs")

const server = express()
const port = 8080

hbs.registerPartials(__dirname + '/views/partials')

server.set('view engine', 'hbs')

server.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', err => {
        if(err) console.log('Unable to append log to file.')
    })
    next()
})

server.use((req, res, next) => {
    res.render('maintainance.hbs')
})

server.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

server.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Homepage'
    })
})

server.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

server.get('/bad', (req, res) => {
    res.send({ 
        error: 'This is an error'
    })
})

server.listen(port, () => console.log(`SERVER LISTENING ON PORT ${port}`))