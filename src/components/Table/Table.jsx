import React from 'react'

import styles from './Table.module.css'

import { changeFieldSort, changeTypeSort } from '../../slices/medicineItemSlice'

import { useSelector } from 'react-redux';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Table = ({ titles, dispatch, children }) => {

    const { sort } = useSelector(state => state.medicineItem);

    const handleSort = (field) => {
        if (field === sort.fieldSort) {
            dispatch(changeTypeSort());
        } else {
            dispatch(changeFieldSort(field));
        }
    }

    const verifyIconSortActive = (field) => {
        if (field === sort.fieldSort) {
            if(sort.typeSort === "ASC") {
                return <IoIosArrowDown />
            } else {
                return <IoIosArrowUp />
            }
        }
    }

    return (
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
    )
}

export default Table