import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'

const MainLayout = ({children}) => {
  return (
    <div className='flex h-screen' style={{width: '100vw'}}>
        <Sidebar/>
        <div className='flex-1'>
            <Header/>
            <main className='p-4'>{children}</main>
        </div>



    </div>
  )
}

export default MainLayout;