import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Categories () {

  const [category, setCategory] = useState(null)
  let navigate = useNavigate()

    const editItem = (itemId) => {

    navigate(`/edititem/${itemId}`)
  }

useEffect(()=>{
  const getCategory = async () =>{
  const response = await axios.get('http://localhost:8000/category/')

  setCategory(response.data)
  }

  getCategory()

}, [])


if(!category) {
  return <h2>Loading Closet</h2>
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
            <button onClick={()=> editItem(item.id)}>edit</button>
          </div>
        </div>
        ))}

      </div>
    </div>
      ))}
    </div>
  )
}}


