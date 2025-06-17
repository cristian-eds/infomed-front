import React from 'react'

import styles from './InputSearch.module.css'

import { FaSearch } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const InputSearch = ({ searchText, setSearchText, handleSearch ,loading }) => {

    const {t} = useTranslation();

    return (
        <form className={styles.search_input} onSubmit={handleSearch}>
            <input type="text" placeholder={t('input-search.text-input')} name='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} disabled={loading} />
            <button type="submit" disabled={loading} className={styles.search_input__icon}>
                <FaSearch  />
            </button>
        </form>
    )
}

export default InputSearch