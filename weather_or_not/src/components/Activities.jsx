import { useState, useEffect } from "react"
import axios from 'axios'

export default function Categories () {

  const [activity, setActivity] = useState(null)


useEffect(()=>{
  const getactivity = async () =>{
  const response = await axios.get('http://localhost:8000/activity/')

  setActivity(response.data)
  // console.log(response.data)
  }

  getactivity()

}, [])


if(!activity) {
  return <h2>Loading Activities</h2>
}else{
  return(
    <div className='container'>
{
      activity.map((activity)=>(
        <div className='activityName'>
      <h2 className="title">{activity.name}</h2>
      <h4>{activity.description}</h4>
        </div>
      ))}
    </div>
  )
}}


