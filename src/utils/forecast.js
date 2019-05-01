const request = require('request')
const key = require('../../darksky')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${key}/${longitude},${latitude}?`
    request({ url, json:true}, (error, { body }) => {
        if(error){ 
            callback('unable to connect to weather service!', undefined) 
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined, `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast