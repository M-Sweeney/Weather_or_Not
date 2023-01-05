import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Categories () {

  const [category, setCategory] = useState(null)
  let navigate = useNavigate()

  const editItem = (itemId) => {
  navigate(`/edititem/${itemId}`)
  }

  const addItem = () => {
    navigate('/additem')
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
        <div key={category.id}>
        <div className='title'>
      <h2>{category.name}</h2>
      <button onClick={()=> addItem()}>+</button>
        </div>
        <div className="grid">
      {category.item.map((item) => (
        <div key={item.id}>
          <div className="card" onClick={()=> editItem(item.id)}>
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


