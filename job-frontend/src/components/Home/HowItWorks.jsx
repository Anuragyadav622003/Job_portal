import React from 'react'
import {FaUserPlus} from 'react-icons/fa';
import {MdFindInPage} from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'

const HowItWorks = () => {
  return (
    <div className='howitworks'>
     <div className='container'>
      <h3>How It Works</h3>
      <div className='banner'>
        <div className='card'>
          <FaUserPlus/>
          <p>Create Account</p>
          <p>Create an account to unlock the full potential of our job platform. By registering, you'll gain access to exclusive job listings, personalized job alerts, and advanced career resources. Simply provide your name, email address, and create a password. </p>
        </div>
         <div className='card'>
          <MdFindInPage/>
       <p>Find Job / Post Job</p>
       <p>Discover exciting job opportunities tailored to your skills and preferences, or post job listings to find the perfect candidates for your company. Join our platform today and take the next step in your career or recruitment journey!</p>
        </div>
         <div className='card'>
          <IoMdSend/>
         <p>Send The Details</p>
         <p>Please provide all the necessary details to help us assist you better. Your information is crucial for us to offer tailored solutions and support. Send the details today and let us take care of the rest!</p>
        </div>
      </div>
     </div>
    </div>
  )
}

export default HowItWorks