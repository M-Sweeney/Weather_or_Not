import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export default function AddItem() {
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
      `http://localhost:8000/itempost/`,
      formValues
    )
    setItem(response.data)
  }

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="photo">Photo URL:</label>
        <input
          type="text"
          name="photo"
          value={formValues.photo}
          onChange={handleChange}
        />
        <br />
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
          <br />
          <br />
          <Link to="/closet">
          <button type="submit">Save changes</button>
          </Link>
        </form>
      )
    }