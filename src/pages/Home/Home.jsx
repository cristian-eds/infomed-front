import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import styles from './Home.module.css'

import { FaSearch } from "react-icons/fa";

const Home = ({logout}) => {

  const date = new Date();


  return (
    <div>
      <Navbar logout={logout}/>
      <main className={styles.container_main}>
        <header className={styles.header}>
          <div>
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            <p>Próximo medicamento em 30 muinutos...</p>
          </div>
          <div className={styles.search_input}>
            <input type="text" placeholder='Pesquisar...'/>
            <FaSearch className={styles.search_input__icon}/>
          </div>
        </header>
      </main>
    </div>
  )
}

export default Home