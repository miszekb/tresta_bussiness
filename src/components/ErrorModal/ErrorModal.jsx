import styles from './ErrorModal.module.css'
import { ReactComponent as BankError } from '../../assets/bank_error.svg';

export const ErrorModal = ({ onModalClose }) => {
    return <div className={styles.overlay}>
        <div className={styles.modalContainer}>
            <div className={styles.errorIcon}><BankError/></div>
            <div className={styles.modalText}>Brak wystarczających środków na koncie.</div>
            <div className={styles.continueButton} onClick={onModalClose}>KONTYNUUJ</div>
        </div>
    </div>;
}