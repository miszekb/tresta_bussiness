import { useEffect, useState } from 'react';
import styles from './CreateAccount.module.css';
import { createPortal } from 'react-dom';
import { BankErrorModal } from '../../components/BankErrorModal/BankErrorModal';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, collection, getDocs  } from "firebase/firestore/lite"; 
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router";
import { createUser } from '../../store/actions/currentUser';
import { colors } from '../../colors';

export const CreateAccount = () => {
    const [ selectedColor, setSelectedColor ] = useState(null);
    const [ username, setUsername ] = useState('');
    const [ isBankSelected, setIsBankSelected ] = useState(false);
    const [ isBankModalOpened, setIsBankModalOpened ] = useState(false);
    const { firebaseDB } = useSelector(state => state.firebaseDB);
    const navigate = useNavigate();
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

                navigate('/main');
            }    
        })();
    }, [firebaseDB]);

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onSelectedColorChange = (event) => {
        setSelectedColor(event.target.id);
    }

    const onBankSelectionChange = (event) => {
        setIsBankSelected(event.target.checked);
    }

    const checkIfBankRoleIsTaken = async () => {        
        const snapshot = await getDocs(collection(firebaseDB, "players"));
        return snapshot.docs.some(doc => doc.data().isBank === true);
    }

    // TODO: check if color is taken
    const checkIfColorIsTaken = async () => {        
    }

    const onCreateProfile = async () => {
        const isBankRoleAlreadyTaken = await checkIfBankRoleIsTaken();
        // Call base
        if (isBankSelected && isBankRoleAlreadyTaken) {
            setIsBankModalOpened(true);
        } else {
            const playerID = uuidv4();
            const ref = doc(firebaseDB, "players", playerID);
            console.log(ref)
            const userInfo = {
                color: selectedColor,
                name: username,
                playerID,
                isBank: isBankSelected,
                funds: 3000
            }
            await setDoc(ref, userInfo);
            //TODO: update funds in database
            dispatch(createUser(userInfo));
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.cookie = `trestaPlayerId=${playerID}; expires=${tomorrow.toUTCString()}`;
            //TODO: set current player in the store
            navigate('/main');
        }
    }

    const getColorSelectionClass = (colorId) => {
        return colorId === selectedColor ? styles.colorOptionSelected : styles.colorOption
    }

    return <>
        <div className={styles.createAccountPage}>
            <div className={styles.formContainer}>
                <div className={styles.createAccountFormContainer}>
                    <div className={styles.appTitle}>TRESTA BUSSINESS</div>
                    <input placeholder='Imię' className={styles.nameInput} onChange={onUsernameChange} value={username}></input>
                    <div className={styles.colorSelector}>
                        <div className={styles.colorSelectorTitle}>Kolor pionka</div>
                        <div className={styles.colorsContainer}>
                            <div className={getColorSelectionClass('1')} id='1' style={{ background: colors['1']}} onClick={onSelectedColorChange}></div>
                            <div className={getColorSelectionClass('2')} id='2' style={{ background: colors['2']}} onClick={onSelectedColorChange}></div>
                            <div className={getColorSelectionClass('3')} id='3' style={{ background: colors['3']}} onClick={onSelectedColorChange}></div>
                            <div className={getColorSelectionClass('4')} id='4' style={{ background: colors['4']}} onClick={onSelectedColorChange}></div>
                            <div className={getColorSelectionClass('5')} id='5' style={{ background: colors['5']}} onClick={onSelectedColorChange}></div>
                            <div className={getColorSelectionClass('6')} id='6' style={{ background: colors['6'], border: '1px solid rgb(167, 167, 167)'}} onClick={onSelectedColorChange}></div>
                        </div>
                    </div>
                    <div className={styles.bankCheckboxContainer}>
                        <label>Chcę być bankiem</label>
                        <input type='checkbox' onChange={onBankSelectionChange}></input>
                    </div>
                    <div className={styles.createProfileButton} onClick={(onCreateProfile)}>UTWÓRZ PROFIL</div>
                </div>
            </div>
        </div>
        {isBankModalOpened && createPortal(<BankErrorModal onModalClose={() => setIsBankModalOpened(false)}/>, document.getElementById('modal'))}
    </>
}