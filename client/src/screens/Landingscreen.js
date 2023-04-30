import React from 'react'
import { Link } from 'react-router-dom'
function Landingscreen() {
  return (
    
    <div id='main'>
      <div id='box1'>
      </div>
      <div id='box2'>
        <div id='text'>
          Dreams<br />Come<br />true<br/>

          <Link to='/home'>
            <button className='btn btn-primary'>Get started</button>
          </Link>
        </div>
      </div>
      
    </div>
   
  )
}

export default Landingscreen
