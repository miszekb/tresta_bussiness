import styles from './MainPage.module.css';

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
                PRZELEW {'>'}
            </div>
        </div>
        <div className={styles.transactionHistoryContainer}>
            <div className={styles.transactionHistoryTitle}>HISTORIA TRANSAKCJI</div>
            <div className={styles.transactionList}>
                <div className={styles.transactionEntry}>
                    <div className={styles.transactionSidesContainer}>
                        <div className={styles.profileMiniAvatar}>D</div>
                        <div className={styles.transactionArrow}>-{'>'}</div>
                        <div className={styles.profileMiniAvatar}>B</div>
                    </div>
                    <div className={styles.transactionTitle}>RATA KREDYTU</div>
                    <div className={styles.transactionValue}>400F</div>
                </div>
            </div>
        </div>
    </div>
}