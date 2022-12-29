import { useState, useEffect } from "react"
import axios from 'axios'

export default function Categories () {

  const [category, setItem] = useState(null)


useEffect(()=>{
  const getCategory = async () =>{
  const response = await axios.get('http://localhost:8000/category/')

  setItem(response.data)
  console.log(response.data[0])
  }

  getCategory()

}, [])


if(!category) {
  return <h2>Loading Dashboard</h2>
}else{
  return(
    <div className='container'>

{
      category.map((category)=>(
        <div>
        <div className='categoryName'>
      <h2>{category.name}</h2>
        </div>
        <div>
      {category.item.map((item) => (
        <div className="grid">
          <div className="card">
          <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </div>
        ))}

      </div>
    </div>
      ))}
    </div>
  )
}}


