import React from 'react'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div>
      <section className='page notfound'>
        <div className='content'>
        <img src='/notfound.png' alt='notfound page'/>
        <Link to='/'>Return to Home Page</Link>
      </div>
      </section>
    </div>
  )
}

export default NotFound;