import styles from './BankErrorModal.module.css'
import { ReactComponent as BankError } from '../../assets/bank_error.svg';

export const BankErrorModal = ({ onModalClose }) => {
    return <div className={styles.overlay}>
        <div className={styles.modalContainer}>
            <div className={styles.errorIcon}><BankError/></div>
            <div className={styles.modalText}>Przykro nam! Funkcja banku jest już zajęta przez innego gracza. Kontynuuj tworzenie profilu bez funkcji banku.</div>
            <div className={styles.continueButton} onClick={onModalClose}>KONTYNUUJ</div>
        </div>
    </div>;
}