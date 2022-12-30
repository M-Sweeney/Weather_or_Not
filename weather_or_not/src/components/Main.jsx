import { Route, Routes } from "react-router-dom"
import Dashboard from './Dashboard'
import Closet from './Closet'
import Activities from './Activities'
import EditItem from './EditItem'
import CreateItem from './CreateItem'


export default function Main () {

  return(
    <div className="main">
      <Routes>
        <Route path ="/" element={<Dashboard />}/>
        <Route path ="/closet" element={<Closet />}/>
        <Route path ="/activities" element={<Activities />}/>
        <Route path ="/edititem/:itemId" element={<EditItem />}/>
        <Route path ="/additem" element={<CreateItem/>}/>
      </Routes>
    </div>
  )
}