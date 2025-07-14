import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ImageView.module.css';
import ModalEditImage from '../Modal/ModalEditImage';


const ImageView = ({ imgSrc, handleError }) => {

    const { t } = useTranslation();

    const inputKey = Date.now();
    const [showModalEditImage, setShowModalEditImage] = useState(false);

    const handleImage = () => {
        setShowModalEditImage(true);
    }

    return (
        <section className={styles.header_img} >
            <img key={inputKey} src={imgSrc} alt={t('page-person-details.text-alt-image-person')} className={styles.header_img__img} onClick={handleImage} onError={handleError}/>
            {imgSrc &&
                <ModalEditImage
                    showModal={showModalEditImage}
                    imgSrc={imgSrc}
                    closeModal={() => setShowModalEditImage(false)} />}
        </section>
    )
}

export default ImageView