import React, { useState } from 'react';

import styles from './FilterHome.module.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const FilterHome = () => {

    const [showAccordionFilters, setShowAccordionFilters] = useState(false);
    const [statusChecked, setStatusChecked] = useState('TODOS');
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");

    const handleFilter = () => {
        const filters = {
            statusChecked,
            initialDate,
            finalDate
        }
        console.log(filters);
    }

    return (
        <div className={styles.caption_filter}>
            <div className={styles.caption_filter_header} onClick={() => setShowAccordionFilters(!showAccordionFilters)} >
                <p>Filtros</p>
                {showAccordionFilters ?
                    <IoIosArrowUp />
                    :
                    <IoIosArrowDown />
                }
            </div>
            {showAccordionFilters &&
                <div className={styles.container_accordion}>
                    <div className={styles.accordion_filters}>
                        <p>Período</p>
                        <div className={styles.accordion_filters_itens}>
                            <div>
                                Data inicial:
                                <input type="datetime-local" id="initialDate" name="initialDate" value={initialDate} onChange={(e) => setInitialDate(e.target.value)}/>
                            </div>
                            <div>
                                Data final:
                                <input type="datetime-local" id="finalDate" name="finalDate" value={finalDate} onChange={(e) => setFinalDate(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accordion_filters}>
                        <p>Status</p>
                        <div className={styles.accordion_filters_itens}>
                            <div className={`${styles.itens_caption} ${statusChecked === 'TODOS' && styles.active}`} onClick={() => setStatusChecked('TODOS')}>
                                Todos
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'PENDING' && styles.active}`} onClick={() => setStatusChecked('PENDING')}>
                                Pendentes
                            </div>
                            <div className={`${styles.itens_caption} ${statusChecked === 'CONCLUDED' && styles.active}`} onClick={() => setStatusChecked('CONCLUDED')}>
                                Tomados
                            </div>
                        </div>
                    </div>
                    <button onClick={handleFilter}>Filtrar</button>
                </div>}
        </div>
    )
}

export default FilterHome