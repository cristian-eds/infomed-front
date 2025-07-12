import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router'

import { format } from 'date-fns';

import { deletePerson, fetchDetailsPerson, fetchMedicinesForDetailsPerson, generateCode, resetDetailsPerson, updatePerson } from '../../slices/personSlice';

import Table from '../../components/Table/Table';
import ArrowLeftButton from '../../components/Button/ArrowLeftButton';
import DeleteButton from '../../components/Button/DeleteButton';
import ButtonGroup from '../../components/Button/ButtonGroup';
import Button from '../../components/Button/Button';
import ModalConfirmDelete from '../../components/Modal/ModalConfirmDelete';

import { convertToPatternLocalDate, formatDate } from '../../utils/formatterDates';

import styles from './PersonDetails.module.css'
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../utils/requests';
import ImageView from '../../components/ImageView/ImageView';

const PersonDetails = () => {

    const { id } = useParams("id");
    const navigate = useNavigate();

    const {t} = useTranslation();

    const titles = [
    { name: t('title-tables.text-name'), field: "name" },
    { name: t('title-tables.text-registration-date'), field: "registrationDate" },
    { name: t('title-tables.text-frequence'), field: "frequencyHours" },
    { name: t('title-tables.text-duration'), field: "totalDays" },
    { name: t('title-tables.text-completed'), field: "conclusion" },
    { name: t('title-tables.text-next-medicine'), field: "nextMedicine" }
]

    const { detailsPerson, medicinesForPersonDetails } = useSelector(state => state.person);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [fieldSort, setFieldSort] = useState("name");
    const [typeSort, setTypeSort] = useState("ASC");

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const [imgSrc, setImageSrc] = useState("/src/assets/perfil.png");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailsPerson(id));
        dispatch(fetchMedicinesForDetailsPerson(id));
        return () => {
            dispatch(resetDetailsPerson());
        }
    }, [dispatch, id])

    useEffect(() => {
        if (detailsPerson) {
            setName(detailsPerson.name);
            setPhone(detailsPerson.phone);
            setBirthDate(detailsPerson.birthDate);
            detailsPerson.imageUrl && setImageSrc(`${API_URL}${detailsPerson.imageUrl}`);
        }
        return () => { }
    }, [detailsPerson])



    const handleSort = (field) => {
        if (field === fieldSort) {
            typeSort === "ASC" ? setTypeSort("DESC") : setTypeSort("ASC");
        } else {
            setFieldSort(field);
            setTypeSort("ASC");
        }
    }

    const sortList = (medicinesState) => {
        let listOrdened = [...medicinesState];
        return listOrdened.sort(
            (a, b) => {
                let valueA = a[fieldSort];
                let valueB = b[fieldSort];

                if (fieldSort === "nextMedicine") {
                    valueA = new Date(a.nextItem?.dayHour).getTime();
                    valueB = new Date(b.nextItem?.dayHour).getTime();

                    if (valueA === null || Number.isNaN(valueA)) {
                        return 1;
                    }
                    if (valueB === null || Number.isNaN(valueB)) {
                        return -1;
                    }
                }

                if (fieldSort === "name") {
                    if (typeSort === "ASC") {
                        return valueA.localeCompare(valueB);
                    } else {
                        return valueB.localeCompare(valueA);
                    }
                }

                if (fieldSort === "registrationDate") {
                    valueA = new Date(a.registrationDate).getTime();
                    valueB = new Date(b.registrationDate).getTime();
                }

                if (typeSort === "ASC") return valueA - valueB;

                return valueB - valueA;
            }
        )
    }

    const generateItemsTable = () => {
        const listSorted = sortList(medicinesForPersonDetails);
        return listSorted.map(
            (medicine, index) => (
                <tr key={index}>
                    <td>{medicine.name}</td>
                    <td>{formatDate(medicine.registrationDate)}</td>
                    <td>{medicine.frequence}/{medicine.frequence} {t('modals.unit-hours')}</td>
                    <td>{medicine.totalDays} {t('modals.unit-days')}</td>
                    <td><input type="checkbox" name="conclusion" id="conclusion" checked={medicine.concluded} readOnly /></td>
                    <td>{medicine.nextItem && formatDate(medicine.nextItem.dayHour)}</td>
                </tr>
            )
        )
    }

    const handleBirthDate = (e) => {
        const textNewDate = e.target.value;
        const [year, month, day] = textNewDate.split('-');
        setBirthDate(new Date(year, month - 1, day));
    }

    const handleConfirmEditing = () => {
        const updatedPerson = {
            id,
            name,
            phone,
            birthDate: convertToPatternLocalDate(birthDate)
        }
        dispatch(updatePerson(updatedPerson));
        setEditing(false);
    }

    const handleDelete = () => {
        dispatch(deletePerson(detailsPerson.id));
        setShowModalConfirmDelete(false);
        navigate("/person");
    }

    const handleGenerateCode = () => {
        dispatch(generateCode(detailsPerson.id));
    }

    const handleHiddenModalDelete = () => {
        setShowModalConfirmDelete(false);
    }

    return (
        <div className="container_main">
            <header className={styles.header_details}>
                <Link to={"/person"}>
                    <ArrowLeftButton />
                </Link>
                <h2>
                    {detailsPerson.name}
                </h2>
                <DeleteButton actionClick={() => setShowModalConfirmDelete(true)} />
            </header>
            <ImageView imgSrc={imgSrc}/>
            <section className={styles.container_info}>
                <div className={styles.container_info_title}>
                    <h4>{t('page-person-details.text-informations')}</h4>
                    {<p onClick={() => setEditing(true)} className='pointer'>{editing ? t('page-person-details.text-editing-informations') : t('page-person-details.text-edit-informations')}</p>}
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="name">{t('modals.label-name')}</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="name" name="name" value={name || ""} onChange={(e) => setName(e.target.value)} readOnly={!editing} disabled={!editing} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="phone">{t('modals.label-phone')}</label>
                    <div className={styles.container_info_row}>
                        <input type="text" id="phone" name="phone" value={phone || ""} onChange={(e) => setPhone(e.target.value)} readOnly={!editing} disabled={!editing} />
                    </div>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="birth_date">{t('modals.label-birthdate')}</label>
                    <div className={styles.container_info_row}>
                        <input type="date" id="birth_date" name="birth_date" value={birthDate && format(birthDate, 'yyyy-MM-dd') || ""} onChange={handleBirthDate} readOnly={!editing} disabled={!editing} />
                    </div>
                </div>

                {!editing &&
                    <>
                        <div className={styles.form_row}>
                            <label htmlFor="accessCode">{t('modals.label-access-code')}</label>
                            <div className={styles.container_info_row}>
                                <input type="text" id="accessCodee" name="accessCode" value={detailsPerson.accessCode || " "} readOnly disabled={!editing} />
                            </div>
                             {!detailsPerson.accessCode && <p className={styles.generate_code} onClick={handleGenerateCode}>{t('page-person-details.text-generate-access-code')}</p>}
                        </div>
                       
                    </>

                }

                {editing &&
                    <ButtonGroup>
                        <Button type="submit" value={t('buttons.text-confirm')} variant="button_confirm" onClick={handleConfirmEditing} />
                        <Button type="button" value={t('buttons.text-cancel')} variant="button_cancel" onClick={() => setEditing(false)} />
                    </ButtonGroup>
                }
            </section>
            <section>
                <h4 className='title_text_color'>{t('page-person-details.text-list-medicines')}</h4>
                <Table titles={titles} sort={{ fieldSort, typeSort }} handleSort={handleSort} >
                    {generateItemsTable()}
                </Table>
                {medicinesForPersonDetails.length === 0 && <p style={{ textAlign: 'center' }} className='title_text_color' >{t('page-person-details.text-no-medicines')}</p>}
            </section>
            {showModalConfirmDelete && <ModalConfirmDelete text={t('modals.question-confirm-delete-person',{name: detailsPerson.name})} object={detailsPerson} handleDelete={handleDelete} handleHiddenModalDelete={handleHiddenModalDelete} />}
        </div>
    )
}

export default PersonDetails