import styles from './MainPage.module.css';
import { ReactComponent as TransactionButton } from '../../assets/transaction_button.svg';
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';

import { TransactionHistoryEntry } from '../../components/TransactionHistoryEntry/TransactionHistoryEntry';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../colors';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { createUser } from '../../store/actions/currentUser';

export const MainPage = () => {
    const [ transactionHistory, setTransactionHistory ] = useState([]);
    const [ playersList, setPlayersList ] = useState([]);

    const { currentUser } = useSelector(state => state.currentUser);
    const { firebaseDB } = useSelector(state => state.firebaseDB);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            console.log('FIREBASE', firebaseDB)
            if (document.cookie.includes('trestaPlayerId') && firebaseDB) {
                const userIdFromCookie = document.cookie.split("trestaPlayerId=")[1].split(";")[0];
                console.log(userIdFromCookie)
                const snapshotPlayers = await getDocs(collection(firebaseDB, "players"));
                console.log(snapshotPlayers)
                const loggedPlayer = snapshotPlayers.docs.map(doc => doc.data()).find(player => player.playerID === userIdFromCookie)
                dispatch(createUser(loggedPlayer))
            }
    
            await onRefresh();
        })();
    }, [firebaseDB]);

    const onRefresh = async () => {
        if (currentUser) {
            const snapshotTransactions = await getDocs(collection(firebaseDB, "transactions"));
            setTransactionHistory(snapshotTransactions.docs.map(doc => doc.data()));
            const snapshotPlayers = await getDocs(collection(firebaseDB, "players"));
            setPlayersList(snapshotPlayers.docs.map(doc => doc.data()));
            // load player info
            dispatch(createUser(snapshotPlayers.docs.map(doc => doc.data()).find(player => player.playerID === currentUser.playerID)))
        }
    }

    const onTransactionClick = () => {
        navigate('/transaction');
    }

    return <div className={styles.dashboardContainer}>
        <div className={styles.upperBar}>
            <div className={styles.appTitle}>TRESTA BUSINESS</div>
            <div className={styles.profileAvatar} style={{background: colors[currentUser?.color]}}>{currentUser?.name[0].toUpperCase()}</div>
        </div>
        <div className={styles.accountBalanceContainer}>
            <div className={styles.greetingText}>Hej, {currentUser?.name}!</div>
            <div className={styles.balanceTitle}>STAN KONTA</div>
            <div className={styles.balanceValue}>{currentUser?.funds}F <Refresh onClick={onRefresh} width={30} height={30}/></div>
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
                { transactionHistory.map(transaction => {
                    console.log(transaction)
                    return <TransactionHistoryEntry transactionInfo={transaction} allPlayers={playersList}/>})}
            </div>
        </div>
    </div>
}