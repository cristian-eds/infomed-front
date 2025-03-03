import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

const Home = ({logout}) => {
  return (
    <div>
      <Navbar logout={logout}/>
    </div>
  )
}

export default Home