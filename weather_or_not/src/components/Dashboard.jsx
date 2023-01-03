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

  const [user, setUser] = useState([])

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

  console.log(weather)
  }

  getData()

}, [])



useEffect(()=>{
  const getUser = async () =>{
  const response = await axios.get('http://localhost:8000/user/')

  setUser(response.data[0])
  console.log(response.data[0])
  }

  getUser()

}, [])


// if(!user && weather) {
//   return <h2>Loading Dashboard</h2>
// }else{
//   return(
//     <div className='container'>
//       <h1>{user.name}</h1>
//       <h1>{weather.highTemperature}</h1>
//     </div>

//   )
// }}

let condition;

if (weather.rain >= 30){
  condition = `with a ${weather.rain}% chance of rain.`
} else if (weather.snow >= 30){
  condition = `with a ${weather.snow}% chance of snow.`
} else if (weather.wind >= 21){
  condition = `with windspeeds of ${weather.wind}mph.`
} else{ condition = "."}

if(!weather && user) {
  return <h2>Loading Dashboard</h2>
}else{
  return(
    <div className="dashboardContainer">
    <h1>Good Morning {user.name}!</h1>

    <h2>Today in {user.city} we will have a high temperature of {weather.highTemperature}° and a low of {weather.lowTemperature}° {condition}</h2>

    <h2>Based on those weather conditions I would recommend dressing for the temperature with - and dressing for the conditions with - item- </h2>
    
    </div>
  )
}}
