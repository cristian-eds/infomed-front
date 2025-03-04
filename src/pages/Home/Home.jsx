import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import styles from './Home.module.css'

import { FaSearch } from "react-icons/fa";

const Home = ({ logout }) => {

  const date = new Date();


  return (
    <div>
      <Navbar logout={logout} />
      <main className={styles.container_main}>
        <header className={styles.header}>
          <div>
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            <p>Próximo medicamento em 30 muinutos...</p>
          </div>
          <div className={styles.search_input}>
            <input type="text" placeholder='Pesquisar...' />
            <FaSearch className={styles.search_input__icon} />
          </div>
        </header>
        <div className={styles.container_table}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Número</th>
                <th>Frequência</th>
                <th>Horário</th>
                <th>Concluído</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ibuprofeno</td>
                <td>1/10</td>
                <td>3-3 horas</td>
                <td>16:30</td>
                <td></td>
                <td>Editar</td>
              </tr>
              <tr>
                <td>Ibuprofeno</td>
                <td>1/10</td>
                <td>3-3 horas</td>
                <td>16:30</td>
                <td></td>
                <td>Editar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Home