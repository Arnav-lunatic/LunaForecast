const weatherImg = document.querySelector('.weatherImg')
const container = document.querySelector('.container')

// Date and Time
function showDate() {
    const d = new Date()

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.querySelector('.date').innerHTML = `${days[d.getDay()]}, ${(d.getDate() < 10) ? "0" + d.getDate() : d.getDate()} ${months[d.getMonth()]}`

    let hour = d.getHours()
    let ampm = 'am'

    if (hour < 12) {
        hour = d.getHours()
        ampm = 'am'
    } else {
        hour = d.getHours() % 12
        ampm = 'pm'
    }
    hour = hour < 10 ? "0" + hour : hour

    const min = d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes()

    document.querySelector('.time').innerHTML = `${hour}:${min} ${ampm}`
}

setInterval(showDate, 60000);


// search
function displayWeather() {
    let cityName = document.querySelector('.searchBar').value

    document.querySelector('.place').innerHTML = cityName

    weatherCheck(cityName)
    document.querySelector('.searchBar').value = ''
}

document.querySelector('.searchButton').addEventListener('click', () => {
    displayWeather()
})

document.querySelector('.searchBar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        displayWeather()
    }
})


// Weather Function
const api = '0ff5aef87e7408ff6acb5a24384ed0db'

async function weatherCheck(cityName) {
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`)
    let data = await reponse.json()

    if (reponse.status == 404) {
        document.querySelector('.error').style.display = 'inline'
        container.style.display = 'none'
    } else {
        container.style.display = 'flex'
        document.querySelector('.error').style.display = 'none'

        document.querySelector('.place').innerHTML = data.name
        document.querySelector('.country').innerHTML = data.sys.country
        document.querySelector('.temp').innerHTML = data.main.temp + '&#8451;'
        document.querySelector('.minTempInfo').innerHTML = data.main.temp_min.toFixed(1) + '&#8451;'
        document.querySelector('.maxTempInfo').innerHTML = data.main.temp_max.toFixed(1) + '&#8451;'

        document.querySelector('.humideInfo').innerHTML = data.main.humidity + '%'
        document.querySelector('.windInfo').innerHTML = data.wind.speed.toFixed(1) + '<span class="speedUnit">km/h</span>'


        if (data.weather[0].main === 'Clouds') {
            weatherImg.src = "assets/cloudy.png"
            container.style.backgroundImage = 'linear-gradient(to bottom, #22AED1, #007acc)'
            container.style.color = '#000'
        }
        else if (data.weather[0].main === 'Clear') {
            weatherImg.src = "assets/sun.png"
            container.style.backgroundImage = 'linear-gradient(to bottom, #FFED47, #ffd724)'
            container.style.color = '#000'
        }
        else if (data.weather[0].main === 'Rain') {
            weatherImg.src = "assets/storm.png"
            container.style.backgroundImage = 'linear-gradient(to bottom, #484848, #373737)'
            container.style.color = '#fff'
        }
        else if (data.weather[0].main === 'Haze') {
            weatherImg.src = "assets/haze.png"
            container.style.backgroundImage = 'linear-gradient(to bottom, #FFC857, #BBC7CE)'
            container.style.color = '#000'
        }
        else if (data.weather[0].main === 'Snow') {
            container.style.backgroundImage = 'linear-gradient(to bottom, #E8D7F1, #D3BCCC)'
            weatherImg.src = "assets/snow.png"
            container.style.color = '#000'
        }
        else if (data.weather[0].main === 'Drizzle') {
            container.style.backgroundImage = 'linear-gradient(to bottom, #2D3047, #93B7BE)'
            weatherImg.src = "assets/drizzle.png"
            container.style.color = '#fff'
        }
        else if (data.weather[0].main === 'Mist') {
            container.style.backgroundImage = 'linear-gradient(to bottom, #7678ED, #8075FF)'
            weatherImg.src = "assets/mist.png"
            container.style.color = '#fff'
        }

        document.querySelector('.weatherType').innerHTML = data.weather[0].main
    }
}

weatherCheck('lucknow')