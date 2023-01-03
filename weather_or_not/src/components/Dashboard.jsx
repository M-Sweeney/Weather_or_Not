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
  const [orNot, setOrNot] = useState(null)

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
  const getOrNot = async () =>{
  const response = await axios.get('http://localhost:8000/user/')

  setOrNot(response.data)
  console.log(response.data[0].name)
  }

  getOrNot()

}, [])


if(!weather) {
  return <h2>Loading Dashboard</h2>
}else{
  return(
    <div className='container'>
      {/* <h1>{weather.rain_sum[0]}</h1>
      <h1>{orNot[0].name}</h1> */}
      <h1>{weather.highTemperature}</h1>
    </div>

  )
}}


