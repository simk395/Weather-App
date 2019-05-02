const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
// define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

//Get requests for express
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Simon Kong"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Simon Kong'
    })
})

app.get('/help', (req, res) => {
  res.render('help', {
      title: 'Help',
      message: "This is the help page!",
      name: "Simon Kong"
  })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        desc: "404 Page Not Found"
    })
  })

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        desc: "404 Page Not Found"
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})