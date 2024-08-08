import React from 'react'
import { PopulacategoriesData } from '../../assets/Data'

const PopularCategories = () => {
  return (
    <div className='categories'>
      <h3>Popular Category</h3>
      <div className='banner'>
        {
          PopulacategoriesData.map((item)=>{
            return (
              <div className='card' key={item.id}>
                <div className='icon'>{item.icon}</div>
                <div className='text'>
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

export default PopularCategories