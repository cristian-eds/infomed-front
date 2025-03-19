import React, { useEffect, useState } from 'react'

import styles from './Home.module.css'

import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import Pagination from '../../components/Pagination/Pagination';
import Navbar from '../../components/Navbar/Navbar'
import ModalAddMedicine from '../../components/Modal/ModalAddMedicine';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicinesUser } from '../../slices/medicineSlice';

const Home = ({ logout }) => {

  const dispatch = useDispatch();

  const { error, loading, medicines } = useSelector(state => state.medicine);

  const [showModal, setShowModal] = useState(false);

  const date = new Date();

  useEffect(() => {
    dispatch(fetchMedicinesUser());
  }, [dispatch])

  medicines && console.log(medicines);

  if (loading) {
    return <p>Carregando...</p>
  }

  const fillLineTable = (medicine) => {
    return medicine.map((item) => {
      return item.medicineItems.map(medicineItem => (
          <tr key={medicineItem.id}>
            <td>{item.name}</td>
            <td>{medicineItem.medicineItemSequence}</td>
            <td>{item.frequencyHours}/{item.frequencyHours} hours</td>
            <td>{medicineItem.dayHour}</td>
            <td> <input type="checkbox" name="" id=""  /> </td>
            <td>Editar</td>
          </tr>
        )
      );
    }


    )
  }

  return (
    <>
      <ModalAddMedicine showModal={showModal} setShowModal={setShowModal} />
      <Navbar logout={logout} />
      <main className={styles.container_main}>
        <header className={styles.header}>
          <div>
            <h2>Hoje: {date && date.toLocaleDateString()}</h2>
            <p>Próximo medicamento em 30 minutos...</p>
          </div>
          <form className={styles.search_input}>
            <input type="text" placeholder='Pesquisar...' />
            <FaSearch className={styles.search_input__icon} onClick={() => alert("clicou")} />
          </form>
        </header>
        <div className={styles.container_caption}>
          <button onClick={() => setShowModal(true)}><FaPlus /></button>
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
              {medicines && fillLineTable(medicines)}
            </tbody>
          </table>
        </div>
        <Pagination />
      </main>
    </>
  )
}

export default Home