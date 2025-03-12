import styles from './MainPage.module.css';
import { ReactComponent as TransactionButton } from '../../assets/transaction_button.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg';
import { TransactionHistoryEntry } from '../../components/TransactionHistoryEntry/TransactionHistoryEntry';

export const MainPage = () => {
    return <div className={styles.dashboardContainer}>
        <div className={styles.upperBar}>
            <div className={styles.appTitle}>TRESTA BUSINESS</div>
            <div className={styles.profileAvatar}>D</div>
        </div>
        <div className={styles.accountBalanceContainer}>
            <div className={styles.greetingText}>Hej, Dażka!</div>
            <div className={styles.balanceTitle}>STAN KONTA</div>
            <div className={styles.balanceValue}>3000F</div>
        </div>
        <div className={styles.transactionButtonContainer}>
            <div className={styles.transactionButton}>
                <div className={styles.transactionButtonIcon}><TransactionButton/></div>
                <div className={styles.transactionButtonName}>PRZELEW</div>
                <div className={styles.transactionButtonArrow}><ArrowRight/></div>
            </div>
        </div>
        <div className={styles.transactionHistoryContainer}>
            <div className={styles.transactionHistoryTitle}>HISTORIA TRANSAKCJI</div>
            <div className={styles.transactionList}>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
                <TransactionHistoryEntry/>
            </div>
        </div>
    </div>
}