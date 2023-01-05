import { useState, useEffect } from "react"
import axios from 'axios'

export default function Categories () {

  const [activity, setActivity] = useState(null)


useEffect(()=>{
  const getactivity = async () =>{
  const response = await axios.get('http://localhost:8000/activity/')

  setActivity(response.data)
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
        <div className='activitycontainer rounded-xl'>
        <div className="cardactivitytitle rounded-t-xl">
          <h2 className="activitytitle">{activity.name}</h2>
        </div>
          <h4 className="activitydescription">{activity.description}</h4>
        </div>
      ))}
    </div>
  )
}}


