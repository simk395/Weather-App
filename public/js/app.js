const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.m1')
const messageTwo = document.querySelector('.m2')

const getWeather = (location) => {
    fetch(`/weather?address=${location}`)
    .then(resp => resp.json())
    .then(({ error, location, forecast, address }) => {
        if(error){
            messageOne.innerText = ''
            messageTwo.innerText = error
        }else{
            messageOne.innerText = ''
            messageTwo.innerText = `${location} \n ${forecast}`
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.innerText = "Loading..."
    getWeather(location)
})