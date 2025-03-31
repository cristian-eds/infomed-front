import React from 'react'

import styles from './InputSearch.module.css'

import { FaSearch } from 'react-icons/fa'

const InputSearch = ({ searchText, setSearchText, handleSearch ,loading }) => {
    return (
        <form className={styles.search_input} onSubmit={handleSearch}>
            <input type="text" placeholder='Pesquisar...' name='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} disabled={loading} />
            <button type="submit" disabled={loading}>
                <FaSearch className={styles.search_input__icon} />
            </button>
        </form>
    )
}

export default InputSearch