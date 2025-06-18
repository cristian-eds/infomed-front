import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../utils/formatterDates';

import { changeFieldSort, changeTypeSort, fetchLogs, fetchMoreLogs } from '../../slices/logSlice';

import Table from '../Table/Table'
import ArrowDownButton from '../Button/ArrowDownButton';

import styles from './HistoricLog.module.css';
import { useTranslation } from 'react-i18next';

const HistoricLog = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const titles = [
        { name: t('title-tables.text-action'), field: "action" },
        { name: t('title-tables.text-description'), field: "description" },
        { name: t('title-tables.text-date'), field: "dateHour" }
    ]

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
            (a, b) => {
                let valueA = a[sort.fieldSort];
                let valueB = b[sort.fieldSort];

                if (sort.fieldSort === "dateHour") {
                    valueA = new Date(a.dateHour).getTime();
                    valueB = new Date(b.dateHour).getTime();

                    if (sort.typeSort === "ASC") {
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
            <h3>{t('historic.text-historic')}</h3>
            <Table titles={titles} sort={sort} handleSort={handleSort}>
                {logs && generateRowsTableLogs()}
            </Table>
            <div className={styles.historic_footer}>
                {page.totalPages - 1 == actualPage || logs.length === 0 ?
                    <p>{t('footer-see-more.text-all-loaded')}</p> :
                    <>
                        <p>{t('footer-see-more.text-see-more')}</p>
                        <ArrowDownButton actionClick={handleFetchMoreLogs} />
                    </>
                }
            </div>
        </>
    )
}

export default HistoricLog