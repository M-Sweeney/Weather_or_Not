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
// console.log(weather)

  getData()

}, [])

// let hotItems = null
// let warmItems = null
// let coolItems = null
// let coldItems = null
// let rainItems = null
// let snowItems = null
// let windItems = null

useEffect(()=>{
  const getUser = async () =>{
  const response = await axios.get('http://localhost:8000/user/')

  setUser(response.data[0])
  }
  getUser()
  console.log(user)


}, [])

useEffect(()=> {
  console.log(user)
// hotItems = user.item.filter(item => item.hot)
// warmItems = user.item.filter(item => item.warm)
// coolItems = user.item.filter(item => item.cool)
// coldItems = user.item.filter(item => item.cold)
// rainItems = user.item.filter(item => item.rain)
// snowItems = user.item.filter(item => item.snow)
// windItems = user.item.filter(item => item.wind)
}, [user])


function average(num1, num2) {
  return (num1 + num2) / 2
}

let averageTemp = average(weather.highTemperature, weather.lowTemperature)

let temp;

if(averageTemp > 85){
  temp = `hot`
} else if (averageTemp < 85 && averageTemp > 70){
  temp = `warm`
} else if (averageTemp < 70 && averageTemp > 50){
  temp = `cool`
} else {
  temp = `cold`
}

let condition; 
let conditionReport;

if (weather.rain >= .1){
  conditionReport = `with ${weather.rain}inch(es) of rain.`
  condition = `rain`
} else if (weather.snow >= .1){
  conditionReport = `with ${weather.snow}inch(es) snow.`
  condition = `snow`
} else if (weather.wind >= 21){
  conditionReport = `with windspeeds of ${weather.wind}mph.`
  condition = `wind`
} else{ conditionReport = "."}



// let tempItems;

// if (temp == `cold`){
//   tempItems = hotItems
// }
//   else if(temp == "warm"){
//   tempItems = warmItems
// } else if(temp == "cool"){
//   tempItems = coolItems
// } else{
//   tempItems = coldItems
// }

// let conditionItems;

// if (condition == "rain"){
//   conditionItems = rainItems
// } else if(condition == "snow"){
//   conditionItems = snowItems
// } else if(condition == "wind"){
//   conditionItems = windItems
// } else{
  
// }


if(!weather || !user) {
  return <h2>Loading Dashboard</h2>
}else{
  // console.log(user)
  // console.log(coldItems)
  // console.log(tempItems)
  return(
    <div className="dashboardContainer">
    <h1>Good Morning {user.name}!</h1>

    <h2>Today in {user.city} it will be fairly {temp} with a high of {weather.highTemperature}° and a low of {weather.lowTemperature}° {conditionReport}</h2>

    <h2>Based on those weather conditions I would recommend dressing for the {temp} temperature with - and dressing for the conditions with - item- </h2>

    {user.item.map((item) => {
      console.log(item[temp])
      if(item[temp] === true){
        return(
        <div>
          <h3>{item.name}</h3>
        </div>
)}})}

{user.item.map((item) => {
      console.log(item[condition])
      if(item[condition] === true){
        return(
        <div>
          <h3>{item.name}</h3>
        </div>
)}})}

    </div>
  )
}}
