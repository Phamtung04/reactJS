import React from 'react'

const Card = ({title, value, icon}) => {
  return (
    <div className='flex items-center gap-4 bg-white p-4 w-full'>
        <div>{icon}</div>
        <div>
            <p>{title}</p>
            <p>{value}</p>
        </div>
    </div>
  )
}

export default Card;