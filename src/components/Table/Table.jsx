import React from 'react'

import styles from './Table.module.css'

const Table = ({titles, children}) => {

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {titles.map((title,index) => (<th key={index}>{title}</th>))}
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}

export default Table