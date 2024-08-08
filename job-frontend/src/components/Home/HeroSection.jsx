import React from 'react'
import { HerosectionData } from '../../assets/Data'
const HeroSection = () => {
  return (
    <div className='heroSection'>
      <div className='container'>
        <div className='title'>
        <h1>Discover Your Dream Job</h1>
        <h1>Aligning with Your Interests and Skills</h1>
        <p>Explore a vast array of opportunities tailored to your unique talents and aspirations. Connect with top employers, showcase your skills, and find the perfect fit for your career growth. Start your journey towards a fulfilling and rewarding career today!</p>
        </div>
        <div className='image'>
          <img src='/gotojob.jpg' alt='hero'/>
        </div>
      </div>
      <div className='details'>
       {
           HerosectionData.map((item)=>{
            return(
                <div className='card' key={item.id}>
               <div className='icon'>{item.icon}</div>
               <div className='content'>
                  <p>{item.title}</p>
                  <p>{item.subTitle}</p>
               </div>
              </div>
            )
           
           })
       } 
      </div>
    </div>
  )
}

export default HeroSection