import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'

const MainLayout = ({children}) => {
  return (
    <div className='flex h-screen' style={{width: '100vw'}}>
        <Sidebar/>
        <div className='flex-1'>
            <main className='p-4'>{children}</main>
        </div>



    </div>
  )
}

export default MainLayout;