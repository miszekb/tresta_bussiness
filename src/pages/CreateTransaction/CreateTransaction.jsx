import styles from './CreateTransaction.module.css';
import { ReactComponent as FamilyCoin } from '../../assets/familycoin.svg';
import { ReactComponent as BackIcon } from '../../assets/back.svg';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore/lite';
import { colors } from '../../colors';
import { v4 as uuidv4 } from 'uuid';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { createUser } from '../../store/actions/currentUser';
import { SuccessModal } from '../../components/SuccessModal/SuccessModal';
import { ErrorModal } from '../../components/ErrorModal/ErrorModal';

export const CreateTransaction = () => {
    const [ transactionReceiver, setTransactionReceiver] = useState(null);
    const [ transactionValue, setTransactionValue ] = useState('')
    const [ transactionTitle, setTransactionTitle] = useState(null);
    const [ transactionResult, setTransactionResult] = useState(null);

    const { firebaseDB } = useSelector(state => state.firebaseDB);
    const [ availableReceivers, setAvailableReceivers ] = useState([]);
    const { currentUser } = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

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
        })();
    }, [firebaseDB]);

    useEffect(() => {
        // TODO: get all players
        (async () => {
            const snapshot = await getDocs(collection(firebaseDB, "players"));
            setAvailableReceivers(snapshot.docs.map(doc => doc.data()).filter(player => player.playerID !== currentUser.playerID));
        })()
        // return snapshot.docs.some(doc => doc.data().isBank === true);
    }, [])

    const onTransactionResultModalClose = () => {
        setTransactionResult(null);
    }

    const onReceiverSelect = (event) => {
        setTransactionReceiver(event.target.id);
    }

    const onValueChange = (event) => {
        setTransactionValue(+event.target.value)
    }

    const onTransactionTitleSelect = (option) => {
        setTransactionTitle(option.target.innerText);
    }

    const onSubmitTransaction = async () => {
        // Call base
        if (currentUser.funds > +transactionValue) {
            const transactionId = uuidv4();
            const ref = doc(firebaseDB, "transactions", transactionId);
            console.log(ref)
            const transactionInfo = {
                receiverId: transactionReceiver,
                senderId: currentUser.playerID,
                title: transactionTitle,
                value: transactionValue
            }
            await setDoc(ref, transactionInfo);
            const receiverData = availableReceivers.find(receiver => receiver.playerID === transactionReceiver);
            const receiverRef = doc(firebaseDB, "players", transactionReceiver);
            await setDoc(receiverRef, {...receiverData, funds: +receiverData.funds + transactionValue});
            const senderRef = doc(firebaseDB, "players", currentUser.playerID);
            dispatch(createUser({...currentUser, funds: +currentUser.funds - transactionValue}))
            await setDoc(senderRef, {...currentUser, funds: +currentUser.funds - transactionValue});
            setTransactionResult(true);
        } else {
            setTransactionResult(false);
        }
            
            // dispatch(createUser(transactionInfo));
            //TODO: display transaction moda
    }

    const getTransactionReceiverClass = (id) => {
        if (id === transactionReceiver) {
            return styles.receiverOptionSelected;
        } else {
            return styles.receiverOption;
        }
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

    return <>
    <div className={styles.transactionViewContainer}>
        <div className={styles.upperBar}>
            <Link to={'/main'}><div className={styles.backButton}><BackIcon/> Przelew </div></Link>
        </div>
        <div className={styles.receiversListContainer}>
            <div className={styles.smallTitle}>ODBIORCA</div>
            <div className={styles.receiversList}>
                { availableReceivers.map(receiver =>
                    <div
                        className={getTransactionReceiverClass(receiver.playerID)}
                        style={{background: colors[receiver.color]}}
                        onClick={onReceiverSelect}
                        id={receiver.playerID}
                    >{receiver.name[0].toUpperCase()}</div>)
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
        <div className={getButtonClass()} onClick={onSubmitTransaction}>WYŚLIJ</div>
    </div>
    {transactionResult && createPortal(<SuccessModal onModalClose={onTransactionResultModalClose}/>, document.getElementById('modal'))}
    {transactionResult === false ? createPortal(<ErrorModal onModalClose={onTransactionResultModalClose}/>, document.getElementById('modal')) : null}

    </>
}