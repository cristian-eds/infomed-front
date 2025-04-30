import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatterDates';

import { changeFieldSort, changeTypeSort, fetchLogs, fetchMoreLogs } from '../../slices/logSlice';

import Table from '../Table/Table'
import ArrowDownButton from '../Button/ArrowDownButton';

import styles from './HistoricLog.module.css';

const titles = [
    { name: "Ação", field: "action" },
    { name: "Descrição", field: "description" },
    { name: "Data", field: "dateHour" }
]

const HistoricLog = () => {

    const dispatch = useDispatch();

    const { logs, page, sort } = useSelector(state => state.log);

    const [actualPage, setActualPage] = useState(0);

    useEffect(() => {
        const pagination = {
            actualPage: 0,
            sizePage: 8
        };
        dispatch(fetchLogs(pagination))
    }, [dispatch])

    const sortList = () => { 
        return [...logs].sort(
            (a,b) => {
                let valueA = a[sort.fieldSort];
                let valueB = b[sort.fieldSort];

                if (sort.fieldSort === "dateHour") {
                    valueA = new Date(a.dateHour).getTime();
                    valueB = new Date(b.dateHour).getTime();

                    if(sort.typeSort === "ASC") {
                        return valueA - valueB;
                    }
                    return valueB - valueA;
                }

                if (sort.typeSort === "ASC") {
                    return valueA.localeCompare(valueB);
                }

                return valueB.localeCompare(valueA);
            }
        )
    }

    const generateRowsTableLogs = () => {
        const listSorted = sortList();
        return listSorted.map(
            log => (
                <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                    <td>{formatDate(log.dateHour)}</td>
                </tr>
            )
        )
    }

    const handleFetchMoreLogs = () => {
        setActualPage(actualPage + 1);
        const pagination = {
            actualPage: actualPage + 1,
            sizePage: '8'
        }
        dispatch(fetchMoreLogs(pagination));
    }

    const handleSort = (field) => {
        if (field === sort.fieldSort) {
            dispatch(changeTypeSort());
        } else {
            dispatch(changeFieldSort(field));
        }
    }

  

    return (
        <>
            <h3>Histórico</h3>
            <Table titles={titles} sort={sort} handleSort={handleSort}>
                {logs && generateRowsTableLogs()}
            </Table>
            <div className={styles.historic_footer}>
                {page.totalPages - 1 == actualPage ?
                    <p>Todos elementos carregados...</p> :
                    <>
                        <p>Ver mais...</p>
                        <ArrowDownButton actionClick={handleFetchMoreLogs} />
                    </>
                }
            </div>
        </>
    )
}

export default HistoricLog