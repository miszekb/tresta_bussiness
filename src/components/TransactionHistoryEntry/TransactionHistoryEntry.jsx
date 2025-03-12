import styles from './TransactionHistoryEntry.module.css';
import { ReactComponent as TransactionArrow } from '../../assets/transaction_arrow1.svg';

export const TransactionHistoryEntry = () => {
    return <div className={styles.transactionEntry}>
    <div className={styles.transactionSidesContainer}>
        <div className={styles.profileMiniAvatar}>D</div>
        <div className={styles.transactionArrow}><TransactionArrow/></div>
        <div className={styles.profileMiniAvatar}>B</div>
    </div>
    <div className={styles.transactionTitle}>RATA KREDYTU</div>
    <div className={styles.transactionValue}>400F</div>
</div>
}