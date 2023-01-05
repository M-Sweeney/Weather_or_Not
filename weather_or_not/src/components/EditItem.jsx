import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function EditItem() {
  let navigate = useNavigate()
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    photo: "",
    hot: false,
    warm: false,
    cool: false,
    cold: false,
    rain: false,
    snow: false,
    wind: false,
  })

  useEffect(() => {
    const getItem = async () => {
      const response = await axios.get(`http://localhost:8000/item/${itemId}`)
      setItem(response.data)
      // console.log(response.data)
      setFormValues({
        name: response.data.name,
        description: response.data.description,
        photo: response.data.photo,
        hot: response.data.hot,
        warm: response.data.warm,
        cool: response.data.cool,
        cold: response.data.cold,
        rain: response.data.rain,
        snow: response.data.snow,
        wind: response.data.wind,
      })
    }

    getItem()
  }, [itemId])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post(
      `http://localhost:8000/itemupdate/${itemId}`,
      formValues,
    )
    navigate('/closet')
    setItem(response.data)
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/item/${itemId}`)
    // navigate('/closet')
  }

  if (!item) {
    return <h2>Loading item...</h2>
  } else {
    return (
      <div className="formcontainer">
      <form onSubmit={handleSubmit}>
        <div className="inputfields">
        <div className="charfield">
        <label htmlFor="name">Name:</label>
        <br/>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br/>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="photo">Photo URL:</label>
        <br/>
        <input
          type="text"
          name="photo"
          value={formValues.photo}
          onChange={handleChange}
        />
        </div>
        <br />
        <div className="checkboxes">
        <label htmlFor="hot">Hot weather:</label>
        <input
          type="checkbox"
          name="hot"
          checked={formValues.hot}
          onChange={handleChange}
          />
          <br />
          <label htmlFor="warm">Warm weather:</label>
          <input
                type="checkbox"
                name="warm"
                checked={formValues.warm}
                onChange={handleChange}
              />
          <br />
          <label htmlFor="cool">Cool weather:</label>
          <input
                type="checkbox"
                name="cool"
                checked={formValues.cool}
                onChange={handleChange}
              />
          <br />
          <label htmlFor="cold">Cold weather:</label>
          <input
                type="checkbox"
                name="cold"
                checked={formValues.cold}
                onChange={handleChange}
              />
          <br />
          <label htmlFor="rain">Rainy weather:</label>
          <input
                type="checkbox"
                name="rain"
                checked={formValues.rain}
                onChange={handleChange}
              />
          <br />
          <label htmlFor="snow">Snowy weather:</label>
          <input
                type="checkbox"
                name="snow"
                checked={formValues.snow}
                onChange={handleChange}
              />
          <br />
          <label htmlFor="wind">Windy weather:</label>
          <input
                type="checkbox"
                name="wind"
                checked={formValues.wind}
                onChange={handleChange}
              />
          </div>
          </div>
          <div className="buttoncontainer">
          <button className="crudbutton" type="submit">Save changes</button>
          <button className="crudbutton" onClick={handleDelete}>Delete</button>
          </div>
          </form>
        </div>
      )
    }
  }




