const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1c0aeb3e686000cec99e0669d0da89bb/${longitude},${latitude}?`
    request({ url, json:true}, (error, { body }) => {
        if(error){ 
            callback('unable to connect to weather service!', undefined) 
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, 
                `${body.daily.data[0].summary}.
                It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.
                The high for today is ${body.daily.data[0].temperatureHigh}.  
                The low for today is ${body.daily.data[0].temperatureLow}.`)
        }
    })
}

module.exports = forecast