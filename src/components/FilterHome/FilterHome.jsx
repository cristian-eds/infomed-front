import React, { useState } from 'react';

import styles from './FilterHome.module.css';

import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuFilterX } from "react-icons/lu";

import { useDispatch } from 'react-redux';
import { resetFilters } from '../../slices/medicineItemSlice';
import { useTranslation } from 'react-i18next';

const FilterHome = ({ handleSearch, filters }) => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [showAccordionFilters, setShowAccordionFilters] = useState(false);
    const [statusChecked, setStatusChecked] = useState(filters.conclusion);
    const [initialDate, setInitialDate] = useState(filters.initialDate);
    const [finalDate, setFinalDate] = useState(filters.finalDate);

    const handleFilter = (e) => {
        const filters = {
            conclusion: statusChecked,
            initialDate,
            finalDate,
            actualPage: 0
        };
        handleSearch(e, filters)
    }

    const verifyFiltersOn = () => {
        return statusChecked !== "TODOS" || initialDate || finalDate;
    }

    const handleCleanFilters = () => {
        setInitialDate("");
        setFinalDate("");
        setStatusChecked("TODOS");
        dispatch(resetFilters());
        handleSearch();
    }

    return (
        <form className={styles.caption_filter}>
            <div className={styles.caption_filter_header} >
                <div onClick={() => setShowAccordionFilters(!showAccordionFilters)} className={styles.control_accordion}>
                    <p className={styles.text_title}>{t('filter-home.text-filters')}</p>
                    {showAccordionFilters ?
                        <IoIosArrowUp className={styles.text_title} />
                        :
                        <MdOutlineKeyboardArrowDown className={styles.text_title}/>
                    }

                </div>
                {
                    verifyFiltersOn() &&
                    <div className={styles.clean_filters} onClick={handleCleanFilters}>
                        <p>{t('filter-home.text-clean-filters')}</p>
                        <LuFilterX />
                    </div>
                }

            </div>
            {showAccordionFilters &&
                <div className={styles.container_accordion}>
                    <div className={styles.accordion_filters}>
                        <p>{t('filter-home.text-period')}</p>
                        <div className={styles.accordion_filters_itens}>
                            <div>
                                {t('filter-home.text-start-date')}
                                <input type="datetime-local" id="initialDate" name="initialDate" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
                            </div>
                            <div>
                                {t('filter-home.text-final-date')}
                                <input type="datetime-local" id="finalDate" name="finalDate" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.accordion_filters}>
                        <p>Status</p>
                        <div className={styles.accordion_filters_itens_caption}>
                            <div className={`${styles.itens_caption} ${statusChecked === 'TODOS' && styles.active}`} onClick={() => setStatusChecked('TODOS')}>
                                {t('filter-home.text-status-all')}
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'false' && styles.active}`} onClick={() => setStatusChecked('false')}>
                               {t('filter-home.text-status-pending')}
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'true' && styles.active}`} onClick={() => setStatusChecked('true')}>
                                {t('filter-home.text-status-completed')}
                            </div>
                        </div>
                    </div>

                    <button onClick={handleFilter} className={styles.button_filter}>{t('filter-home.value-button-filter')}</button>
                </div>}
        </form>
    )
}

export default FilterHome