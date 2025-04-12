import React, { useEffect } from 'react'
import Table from '../Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogs } from '../../slices/logSlice';
import { formatDate } from '../../utils/formatterDates';

const HistoricLog = () => {

    const dispatch = useDispatch();

    const {logs, loading} = useSelector(state=> state.log);

    console.log(logs);

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

    return (
        <>
            <h3>Histórico</h3>
            <Table titles={["Ação", "Descrição", "Data"]}>
                {generateRowsTableLogs()}
            </Table>
        </>
    )
}

export default HistoricLog