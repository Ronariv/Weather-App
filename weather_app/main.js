/*
  To use the API
  Go to openweathermap website
  Get the key
  copy to apiKey
  Run the program
*/
const apiKey = "df6e4c0686ca7a19624a379e23081e9a"
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?'
const searchInput = document.querySelector(".search input")
const searchBtn = document.querySelector(".search .confirm")
let units = 'metric'

async function checkWeather(city) {
  const response = await fetch(apiURL + `q=${city}` + `&appid=${apiKey}` + `&units=${units}`)
  var data = await response.json()

  if (response.status == 404) {
    document.querySelector(".error-msg").style.display = "block"
    document.querySelector(".weather").style.display = "none"
    document.querySelector(".detail").style.display = "none"
  } else {
    console.log(data)

    
    document.querySelector(".city-name").innerHTML = data.name
    document.querySelector(".country").innerHTML = data.sys.country
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C"
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
    document.querySelector(".clouds").innerHTML = data.clouds.all + "%"
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"

    getLocalTime(data.timezone)
    setWeatherInfo(data.weather[0].main)
    document.querySelector(".weather").style.display = "block"
    document.querySelector(".detail").style.display = "flex"
    document.querySelector(".error-msg").style.display = "none"
  }
}

function setWeatherInfo(data) {
  if (data == "Clear") {
    document.querySelector(".weather-icon").innerHTML = "radio_button_unchecked"
    document.querySelector(".weather-info").innerHTML = "Clear"
  } else if (data == "Thunderstorm") {
    document.querySelector(".weather-icon").innerHTML = "thunderstorm"
    document.querySelector(".weather-info").innerHTML = "Thunderstorm"
  } else if (data == "Clouds") {
    document.querySelector(".weather-icon").innerHTML = "cloud"
    document.querySelector(".weather-info").innerHTML = "Clouds"
    document.querySelector(".app").style.backgroundImage = "url(./asset/cloudy.jpg)"
  } else if (data == "Rain") {
    document.querySelector(".weather-icon").innerHTML = "rainy"
    document.querySelector(".weather-info").innerHTML = "Rainy"
    // document.getElementById("app").style.backgroundImage = url("./asset/rainy.jpg")
    document.querySelector(".app").style.backgroundImage = "url(./asset/rainy.jpg)"
  } else if (data == "Snow") {
    document.querySelector(".weather-icon").innerHTML = "snowing"
    document.querySelector(".weather-info").innerHTML = "Snowy"
  } else if (data == "Drizzle") {
    document.querySelector(".weather-icon").innerHTML = "rainy_light"
    document.querySelector(".weather-info").innerHTML = "Drizzle"
  } else {
    document.querySelector(".weather-icon").innerHTML = "mist"
    document.querySelector(".weather-info").innerHTML = "Mist"
  }
}

searchBtn.addEventListener("click", () => {
  document.querySelector(".search input").style.display = "block"
  document.querySelector(".close").style.display = "block"

  const closeSearch = document.querySelector(".close")

  closeSearch.addEventListener("click", () => {
    document.querySelector(".search input").style.display = "none"
    document.querySelector(".close").style.display = "none"
  })
  searchBtn.addEventListener("click", () => {
    const cityName = searchInput.value
    checkWeather(cityName)
  })

})

function getLocalTime(timezone) {
  // +7:00 is 25200 
  // so to get the 7:00 25200/3600
  // to get minutes *60
  // so (timezone / 3600) * 60
  let localTimezoneOffset = timezone / 60

  const date = new Date()
  //change local time to UTC
  const utcOffset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + utcOffset)

  date.setMinutes(date.getMinutes() + localTimezoneOffset)

  let hours = date.getHours()
  if(hours < 10){
    hours = "0" + hours
  }

  let minutes = date.getMinutes()
  if(minutes < 10){
    minutes = "0" + minutes
  }
  document.querySelector(".time").innerHTML = hours +":" + minutes
  console.log(date.getHours() + ":" + date.getMinutes())

  if(hours > 18 && hours < 6){
    document.querySelector(".app").style.backgroundImage = "url(./asset/night.jpeg)"
  }else{
    document.querySelector(".app").style.backgroundImage = "url(./asset/day.jpg)"
  }
}

// benerin search
// ubah background
// perbaiki layout
// atur time

// tambah setWeatherInfo V

