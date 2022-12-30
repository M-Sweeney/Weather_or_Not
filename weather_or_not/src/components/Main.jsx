import { Route, Routes } from "react-router-dom"
import Dashboard from './Dashboard'
import Closet from './Closet'
import Activities from './Activities'
import EditItem from './EditItem'


export default function Main () {

  return(
    <div className="main">
      <Routes>
        <Route path ="/" element={<Dashboard />}/>
        <Route path ="/closet" element={<Closet />}/>
        <Route path ="/activities" element={<Activities />}/>
        <Route path ="/edititem/:itemId" element={<EditItem />}/>
      </Routes>
    </div>
  )
}