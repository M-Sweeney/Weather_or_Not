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
    <div>
      <button class="button-80" role="button" onClick={()=> addItem()}>+Add Item</button>
    <div className='container'>

{
      category.map((category)=>(
        <div className="gridcontainer" key={category.id}>
        <div className='title'>
      <h2>{category.name}</h2>
        </div>
        <div className="grid">
      {category.item.map((item) => (
        <div key={item.id}>
          <div className="card" onClick={()=> editItem(item.id)}>
          <div className="cardtitle rounded-t-xl">
          <h1 className="itemname">{item.name}</h1>
          </div>
            <p className="itemdescription">{item.description}</p>
          </div>
        </div>
        ))}

      </div>
    </div>
      ))}
    </div>
    </div>
  )
}}


