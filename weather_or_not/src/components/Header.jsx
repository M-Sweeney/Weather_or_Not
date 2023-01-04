import Nav from "./Nav"
import Banner from '../assets/Bannerimg.jpeg'

export default function Header () {


  return(
    <div>
      <img src={Banner} className="banner"/>
      <Nav />
    </div>

  )
}