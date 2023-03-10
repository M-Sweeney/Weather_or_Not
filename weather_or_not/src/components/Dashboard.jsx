import { useState, useEffect } from "react"
import axios from 'axios'

export default function Weather () {

  const [weather, setWeather] = useState({
    highTemperature: null,
    lowTemperature: null,
    rain: null,
    snow: null,
    wind: null
  })

  const [user, setUser] = useState(null)

useEffect(()=>{
  const getData = async () =>{
  const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=41.85&longitude=-87.65&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,snowfall_sum,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago')

  setWeather({
    highTemperature: response.data.daily.temperature_2m_max[0],
    lowTemperature: response.data.daily.temperature_2m_min[0],
    rain: response.data.daily.rain_sum[0],
    snow: response.data.daily.snowfall_sum[0],
    wind: response.data.daily.windspeed_10m_max[0]
  })
  
}
  getData()

}, [])

useEffect(()=>{
  const getUser = async () =>{
  const response = await axios.get('http://localhost:8000/user/')

  setUser(response.data[0])
  }
  getUser()


}, [])


function average(num1, num2) {
  return (num1 + num2) / 2
}

let averageTemp = average(weather.highTemperature, weather.lowTemperature)

let temp

if(averageTemp > 85){
  temp = `hot`
} else if (averageTemp < 85 && averageTemp > 70){
  temp = `warm`
} else if (averageTemp < 70 && averageTemp > 50){
  temp = `cool`
} else {
  temp = `cold`
}

let condition 
let conditionReport
let conditionRecommendation

// let condition ='rain'
// let conditionReport = `with 5inch(es) of rain.`
// let conditionRecommendation = ` and the expected rain,`

if (weather.rain >= .1){
  conditionReport = `with ${weather.rain}inch(es) of rain.`
  condition = `rain`
  conditionRecommendation = ` and the expected ${condition},`
} else if (weather.snow >= .1){
  conditionReport = `with ${weather.snow}inch(es) snow.`
  condition = `snow`
  conditionRecommendation = ` and the expected ${condition},`
} else if (weather.wind >= 21){
  conditionReport = `with windspeeds of ${weather.wind}mph.`
  condition = `wind`
  conditionRecommendation = ` and the expected ${condition},`
} else{ conditionReport = "."
conditionRecommendation = ``
}

if(!weather || !user) {
  return <h2>Loading Dashboard</h2>
}else{
  return(
    <div className="dashboardContainer rounded-xl">
    <h1 className="dashboardtitle">Good Morning {user.name}!</h1>

    <h2 className="dashboardtext">Today in {user.city} it will be fairly {temp} with a high of {weather.highTemperature}?? and a low of {weather.lowTemperature}?? {conditionReport}</h2>

    <h2 className="dashboardtext">Based on the {temp} weather{conditionRecommendation} we have curated a list of items from your closet.</h2>

    <div class="mapcontainer">
    <div class="map">
    <h2 className="recommendedtitle">items recommended for the {temp} temperature:</h2>
  {user.item.map((item) => {
    
    if(item[temp] === true){
        return(
        <div key={item.id}>
        <ul>
          <li><h3>{item.name}</h3></li>
        </ul>
        </div>
)}})}
</div>

<div class="map">
{condition && (
  <h2 className="recommendedtitle">items recommended for the {condition}:</h2>
)}
{user.item.map((item) => {
  if (item[condition] === true) {
    return (
      <div key={item.id}>
        <ul>
          <li><h3>{item.name}</h3></li>
        </ul>
      </div>
    )
  }
})}
    </div>
    </div>
    </div>
  )
}}
