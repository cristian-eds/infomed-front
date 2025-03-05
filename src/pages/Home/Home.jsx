import React from 'react'


import styles from './Home.module.css'

import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import Pagination from '../../components/Pagination/Pagination';
import Navbar from '../../components/Navbar/Navbar'

const Home = ({ logout }) => {

  const date = new Date();

  return (
    <>
      <Navbar logout={logout} />
      <main className={styles.container_main}>
        <header className={styles.header}>
          <div>
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            <p>Próximo medicamento em 30 minutos...</p>
          </div>
          <form className={styles.search_input}>
            <input type="text" placeholder='Pesquisar...' />
            <FaSearch className={styles.search_input__icon} onClick={() => alert("clicou")}/>
          </form>
        </header>
        <div className={styles.container_caption}>
          <button><FaPlus/></button>
        </div>
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
                <td> <input type="checkbox" name="" id="" /> </td>
                <td>Editar</td>
              </tr>
              <tr>
                <td>Ibuprofeno</td>
                <td>2/10</td>
                <td>3-3 horas</td>
                <td>19:30</td>
                <td> <input type="checkbox" name="" id="" /> </td>
                <td>Editar</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination/>
      </main>
    </>
  )
}

export default Home