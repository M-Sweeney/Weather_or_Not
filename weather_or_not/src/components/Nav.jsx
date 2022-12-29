import { Link } from 'react-router-dom'

export default function Nav () {

  return(
    <div className='nav'>
      <Link to ='/'>Dashboard</Link>
      <Link to ='/closet' >Closet</Link>
      <Link to ='/activities'>Activites</Link>
    </div>
  )
}