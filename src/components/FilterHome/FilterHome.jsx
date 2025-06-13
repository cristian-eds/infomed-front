import React, { useState } from 'react';

import styles from './FilterHome.module.css';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuFilterX } from "react-icons/lu";

import { useDispatch } from 'react-redux';
import { resetFilters } from '../../slices/medicineItemSlice';


const statusValues = {
    "TODOS": 'TODOS',
    "PENDING": 'false',
    "CONCLUDED": 'true'
}

const FilterHome = ({ handleSearch, filters }) => {

    const dispatch = useDispatch();

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

    console.log(filters.conclusion)

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
                    <p className={styles.text_title}>Filtros</p>
                    {showAccordionFilters ?
                        <IoIosArrowUp className={styles.text_title} />
                        :
                        <MdOutlineKeyboardArrowDown className={styles.text_title}/>
                    }

                </div>
                {
                    verifyFiltersOn() &&
                    <div className={styles.clean_filters} onClick={handleCleanFilters}>
                        <p>Limpar filtros</p>
                        <LuFilterX />
                    </div>
                }

            </div>
            {showAccordionFilters &&
                <div className={styles.container_accordion}>
                    <div className={styles.accordion_filters}>
                        <p>Período</p>
                        <div className={styles.accordion_filters_itens}>
                            <div>
                                Data inicial:
                                <input type="datetime-local" id="initialDate" name="initialDate" value={initialDate} onChange={(e) => setInitialDate(e.target.value)} />
                            </div>
                            <div>
                                Data final:
                                <input type="datetime-local" id="finalDate" name="finalDate" value={finalDate} onChange={(e) => setFinalDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.accordion_filters}>
                        <p>Status</p>
                        <div className={styles.accordion_filters_itens_caption}>
                            <div className={`${styles.itens_caption} ${statusChecked === 'TODOS' && styles.active}`} onClick={() => setStatusChecked('TODOS')}>
                                Todos
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'false' && styles.active}`} onClick={() => setStatusChecked('false')}>
                                Pendentes
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'true' && styles.active}`} onClick={() => setStatusChecked('true')}>
                                Tomados
                            </div>
                        </div>
                    </div>

                    <button onClick={handleFilter} className={styles.button_filter}>Filtrar</button>
                </div>}
        </form>
    )
}

export default FilterHome