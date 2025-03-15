import styles from './MainPage.module.css';
import { ReactComponent as TransactionButton } from '../../assets/transaction_button.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg';
import { TransactionHistoryEntry } from '../../components/TransactionHistoryEntry/TransactionHistoryEntry';
import { useSelector } from 'react-redux';
import { colors } from '../../colors';
import { useNavigate } from 'react-router';

export const MainPage = () => {
    const { currentUser } = useSelector(state => state.currentUser);
    const navigate = useNavigate();

    const onTransactionClick = () => {
        navigate('/transaction');
    }

    return <div className={styles.dashboardContainer}>
        <div className={styles.upperBar}>
            <div className={styles.appTitle}>TRESTA BUSINESS</div>
            <div className={styles.profileAvatar} style={{background: colors[currentUser.color]}}>{currentUser.name[0].toUpperCase()}</div>
        </div>
        <div className={styles.accountBalanceContainer}>
            <div className={styles.greetingText}>Hej, {currentUser.name}!</div>
            <div className={styles.balanceTitle}>STAN KONTA</div>
            <div className={styles.balanceValue}>{currentUser.funds}F</div>
        </div>
        <div className={styles.transactionButtonContainer}>
            <div className={styles.transactionButton}>
                <div className={styles.transactionButtonIcon}><TransactionButton/></div>
                <div className={styles.transactionButtonName} onClick={onTransactionClick}>PRZELEW</div>
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