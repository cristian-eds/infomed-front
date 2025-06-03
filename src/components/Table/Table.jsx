import React from 'react'

import styles from './Table.module.css'

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Table = ({ sort, titles, handleSort, children }) => {

    const verifyIconSortActive = (field) => {
        if (field === sort.fieldSort) {
            if (sort.typeSort === "ASC") {
                return <IoIosArrowUp />
            } else {
                return <IoIosArrowDown />
            }
        }
    }

    return (
        <div className={styles.container_table}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {titles.map((title, index) =>
                            (<th key={index} onClick={() => handleSort(title.field)}>{title.name}{verifyIconSortActive(title.field)}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

export default Table