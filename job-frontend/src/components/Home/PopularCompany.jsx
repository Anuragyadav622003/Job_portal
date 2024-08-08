import React from 'react'
import { companiesData } from '../../assets/Data'
const PopularCompany = () => {
  return (
    <div className='companies'>
      <div className='container'>
        <h3>Top Companies</h3>
        <div className='banner'>
          {
            companiesData.map((item)=>{
              return(
                <div className='card' key={item.id}>
                  <div className='content'>
                    <div className='icon'>{item.icon}</div>
                    <div className='text'>
                      <p>{item.title}</p>
                      <p>{item.location}</p>
                    </div>
                  </div>
                  <button>Vacancies{item.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PopularCompany