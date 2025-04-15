import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatterDates';

import { fetchLogs, fetchMoreLogs } from '../../slices/logSlice';

import Table from '../Table/Table'
import ArrowDownButton from '../Button/ArrowDownButton';

import styles from './HistoricLog.module.css';

const HistoricLog = () => {

    const dispatch = useDispatch();

    const { logs, page } = useSelector(state => state.log);

    const [actualPage, setActualPage] = useState(0);

    useEffect(() => {
        const pagination = {
            actualPage: 0,
            sizePage: 8
        };
        dispatch(fetchLogs(pagination))
    }, [dispatch])

    const generateRowsTableLogs = () => (
        logs && logs.map(
            log => (
                <tr key={log.id}>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                    <td>{formatDate(log.dateHour)}</td>
                </tr>
            )
        )
    )

    const handleFetchMoreLogs = () => {
        setActualPage(actualPage + 1);
        const pagination = {
            actualPage: actualPage + 1,
            sizePage: '8'
        }
        dispatch(fetchMoreLogs(pagination));
    }

    return (
        <>
            <h3>Histórico</h3>
            <Table titles={["Ação", "Descrição", "Data"]}>
                {generateRowsTableLogs()}
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