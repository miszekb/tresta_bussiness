import styles from './SuccessModal.module.css'
import { ReactComponent as Success } from '../../assets/success.svg';

export const SuccessModal = ({ onModalClose }) => {
    return <div className={styles.overlay}>
        <div className={styles.modalContainer}>
            <div className={styles.errorIcon}><Success/></div>
            <div className={styles.modalText}>Przelew wysłany!</div>
            <div className={styles.continueButton} onClick={onModalClose}>KONTYNUUJ</div>
        </div>
    </div>;
}