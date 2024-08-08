import React, { useContext } from 'react'
import HeroSection from './HeroSection'
import HowItWorks from './HowItWorks'
import PopularCategories from './PopularCategories'
import PopularCompany from './PopularCompany'
import { Context } from '../../index.js';
import { Navigate } from 'react-router-dom'

const Home = () => {
  const {isAuthorized} = useContext(Context);
  if(!isAuthorized)
  {
    return <Navigate to={'./login'}/>
  }
  return (
    <section className='homePage Page'>
      <HeroSection/>
      <HowItWorks/>
      <PopularCategories/>
      <PopularCompany/>
    </section>
  )
}

export default Home