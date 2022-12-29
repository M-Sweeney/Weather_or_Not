import { Route, Routes } from "react-router-dom"
import Dashboard from './Dashboard'
import Closet from './Closet'
import Activities from './Activities'


export default function Main () {

  return(
    <div className="main">
      <Routes>
        <Route path ="/" element={<Dashboard />}/>
        <Route path ="/closet" element={<Closet />}/>
        <Route path ="/activites" element={<Activities />}/>
      </Routes>
    </div>
  )
}