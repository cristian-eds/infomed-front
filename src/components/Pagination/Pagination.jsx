import React from 'react'

import styles from './Pagination.module.css'
import PaginationButton from '../Button/PaginationButton';

const Pagination = ({ page, actualPage, setActualPage }) => {

  const first = page.number === 0;
  const last = page.number === page.totalPages - 1;

  const handleAlterPage = (nextNumber) => {
    setActualPage(nextNumber);
  }

  const generateItemsNumbers = (initialNumber, finalNumber) => {
    const listItens = [];
    for (let i = initialNumber; i < finalNumber; i++) {
      listItens.push(
        <li className={actualPage === i ? styles.active : undefined} key={i}> <PaginationButton actionClick={() => handleAlterPage(i)}>{i + 1}</PaginationButton> </li>
      );

    }
    return listItens;
  }

  const generateDinamicNumberItens = () => {
    if (page.totalPages <= 5 || actualPage < 3) return generateItemsNumbers(0, 5);
    if (actualPage >= (page.totalPages - 2)) return generateItemsNumbers(page.totalPages - 5, page.totalPages);
    return (
      <>
        <li > <PaginationButton actionClick={() => handleAlterPage(actualPage - 2)}>{actualPage - 1}</PaginationButton> </li>
        <li > <PaginationButton actionClick={() => handleAlterPage(actualPage - 1)} >{actualPage}</PaginationButton> </li>
        <li className={styles.active}> <PaginationButton>{actualPage + 1}</PaginationButton> </li>
        <li > <PaginationButton actionClick={() => handleAlterPage(actualPage + 1)} >{actualPage + 2}</PaginationButton> </li>
        <li > <PaginationButton actionClick={() => handleAlterPage(actualPage + 2)}>{actualPage + 3}</PaginationButton> </li>
      </>
    )
  }


  return (
    <footer className={styles.pagination}>
      <ul>
        <li className={first ? styles.disabled : undefined}> <PaginationButton disabled={first} actionClick={() => handleAlterPage(0)}>&lt;&lt;</PaginationButton>  </li>
        <li className={first ? styles.disabled : undefined}> <PaginationButton disabled={first} actionClick={() => handleAlterPage(actualPage - 1)}>&lt;</PaginationButton>  </li>
        {generateDinamicNumberItens()}
        <li className={last ? styles.disabled : undefined}> <PaginationButton disabled={last} actionClick={() => handleAlterPage(actualPage + 1)}>&gt;</PaginationButton>  </li>
        <li className={last ? styles.disabled : undefined}> <PaginationButton disabled={last} actionClick={() => handleAlterPage(page.totalPages - 1)}>&gt;&gt;</PaginationButton>  </li>
      </ul>
    </footer>
  )
}

export default Pagination