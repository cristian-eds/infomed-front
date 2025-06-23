import { useTranslation } from 'react-i18next';
import ArrowDownButton from '../Button/ArrowDownButton'

import styles from './SeeMoreFooter.module.css';

const SeeMoreFooter = ({condition, handleFetchMore}) => {

    const {t} = useTranslation();

    return (
        <footer className={styles.footer_medicines}>
            {condition ?
                <p>{t('footer-see-more.text-all-loaded')}</p> :
                <>
                    <p>{t('footer-see-more.text-see-more')}</p>
                    <ArrowDownButton actionClick={handleFetchMore} />
                </>

            }
        </footer> 
  )
}

export default SeeMoreFooter