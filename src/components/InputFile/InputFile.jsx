import React, { useRef } from 'react'
import styles from './InputFile.module.css'

import { LuImagePlus } from "react-icons/lu";
import { useTranslation } from 'react-i18next';

const InputFile = ({ image, handleChangeImage }) => {

    const inputRef = useRef();

    const {t} = useTranslation();

    const handleClickToSelect = () => {
        inputRef.current.click();
    }

    return (
        <div className={styles.container_input_file}> 
            <button onClick={handleClickToSelect} type='button'>
                <span>{t('modals.placeholder-choose-image')}</span> <LuImagePlus />
            </button>
            <span>{image ? `${image.name}` : t('modals.label-no-image')}</span>

            <input ref={inputRef} type="file" id="image" accept="image/png, image/jpeg" capture="user|environment" name="image" onChange={handleChangeImage} />
        </div>
    )
}

export default InputFile