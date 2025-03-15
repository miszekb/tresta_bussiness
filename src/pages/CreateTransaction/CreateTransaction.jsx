import styles from './CreateTransaction.module.css';
import { ReactComponent as FamilyCoin } from '../../assets/familycoin.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore/lite';
import { colors } from '../../colors';

export const CreateTransaction = () => {
    const [ transactionValue, setTransactionValue ] = useState('')
    const [ transactionTitle, setTransactionTitle] = useState(null);
    const { firebaseDB } = useSelector(state => state.firebaseDB);
    const [ availableReceivers, setAvailableReceivers ] = useState([]);
    const { currentUser } = useSelector(state => state.currentUser);

    useEffect(() => {
        // TODO: get all players
        (async () => {
            const snapshot = await getDocs(collection(firebaseDB, "players"));
            setAvailableReceivers(snapshot.docs.map(doc => doc.data()).filter(player => player.playerID !== currentUser.playerID));
        })()

        // return snapshot.docs.some(doc => doc.data().isBank === true);
    }, [])

    const onValueChange = (event) => {
        setTransactionValue(event.target.value)
    }

    const onTransactionTitleSelect = (option) => {
        setTransactionTitle(option.target.innerText);
    }

    const getTransactionTitleOptionClass = (option) => {
        if (option === transactionTitle) {
            return styles.transactionTitleOptionSelected;
        } else {
            return styles.transactionTitleOption;
        }
    }

    const getButtonClass = () => {
        if (transactionTitle && transactionValue) {
            return styles.sendButton;
        } else {
            return styles.sendButtonBlocked;
        }
    }

    return <div className={styles.transactionViewContainer}>
        <div className={styles.upperBar}>
            <div className={styles.backButton}> {'<-'} Przelew </div>
        </div>
        <div className={styles.receiversListContainer}>
            <div className={styles.smallTitle}>ODBIORCA</div>
            <div className={styles.receiversList}>
                { availableReceivers.map(receiver =>
                    <div className={styles.receiverOption} style={{background: colors[receiver.color]}}>{receiver.name[0].toUpperCase()}</div>)
                }
                
            </div>
        </div>
        <div className={styles.transactionValueContainer}>
            <div className={styles.smallTitle}>KWOTA PRZELEWU</div>
            <div className={styles.inputContainer}>
                <input type="number" className={styles.transactionValueInput} value={transactionValue} onChange={onValueChange} placeholder='0'></input>
                <FamilyCoin fill={transactionValue ? '#000' : 'rgb(143, 143, 143)'}/>
            </div>
        </div>
        <div className={styles.transactionTitleContainer}>
            <div className={styles.smallTitle}>TYTUŁ</div>
            <div className={styles.transactionTitlesList}>
                <div className={getTransactionTitleOptionClass('CZYNSZ')} onClick={onTransactionTitleSelect}>CZYNSZ</div>
                <div className={getTransactionTitleOptionClass('HANDEL')} onClick={onTransactionTitleSelect}>HANDEL</div>
                <div className={getTransactionTitleOptionClass('DOBRA')} onClick={onTransactionTitleSelect}>DOBRA</div>
                <div className={getTransactionTitleOptionClass('PODATEK')} onClick={onTransactionTitleSelect}>PODATEK</div>
                <div className={getTransactionTitleOptionClass('AKCJE')} onClick={onTransactionTitleSelect}>AKCJE</div>
                <div className={getTransactionTitleOptionClass('ZAKUPY')} onClick={onTransactionTitleSelect}>ZAKUPY</div>
                <div className={getTransactionTitleOptionClass('START')} onClick={onTransactionTitleSelect}>START</div>
                <div className={getTransactionTitleOptionClass('RATA KREDYTU')} onClick={onTransactionTitleSelect}>RATA KREDYTU</div>
                <div className={getTransactionTitleOptionClass('INNY')} onClick={onTransactionTitleSelect}>INNY</div>
            </div>
        </div>
        <div className={getButtonClass()}>WYŚLIJ</div>
    </div>
}