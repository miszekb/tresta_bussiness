import { useState } from 'react';
import styles from './CreateAccount.module.css';
import { createPortal } from 'react-dom';
import { BankErrorModal } from '../../components/BankErrorModal/BankErrorModal';
import { useSelector } from 'react-redux';
import { doc, setDoc, collection, getDocs  } from "firebase/firestore/lite"; 
import { v4 as uuidv4 } from 'uuid';

const colors = {
    1: 'rgb(255, 209, 59)',
    2: 'rgb(236, 71, 71)',
    3: 'rgb(71, 159, 236)',
    4: 'rgba(20, 155, 47, 1)',
    5: 'rgba(74, 43, 117, 1)',
    6: 'rgba(255, 255, 255, 1)'
}  

export const CreateAccount = () => {
    const [ selectedColor, setSelectedColor ] = useState(null);
    const [ username, setUsername ] = useState('');
    const [ isBankSelected, setIsBankSelected ] = useState(false);
    const [ isBankModalOpened, setIsBankModalOpened ] = useState(false);
    const { firebaseDB } = useSelector(state => state.firebaseDB);

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

    const checkIfColorIsTaken = async () => {        
        const snapshot = await getDocs(collection(firebaseDB, "players"));
        return snapshot.docs.some(doc => doc.data().isBank === true);
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
            await setDoc(ref, {
                color: selectedColor,
                name: username,
                playerID,
                isBank: isBankSelected,
                funds: 3000
            });
        }

        // TODO: if user created - proceed to game main view

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