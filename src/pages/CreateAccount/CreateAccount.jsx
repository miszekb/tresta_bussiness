import { useState } from 'react';
import styles from './CreateAccount.module.css';

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
    const [ username, setUsername ] = useState(null);

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onSelectedColorChange = (event) => {
        setSelectedColor(event.target.id);
    }

    return <div className={styles.createAccountPage}>
        <div className={styles.formContainer}>
            <div className={styles.createAccountFormContainer}>
                <div className={styles.appTitle}>TRESTA BUSSINESS</div>
                <input placeholder='Imię' className={styles.nameInput} onChange={onUsernameChange}></input>
                <div className={styles.colorSelector}>
                    <div className={styles.colorSelectorTitle}>Kolor pionka</div>
                    <div className={styles.colorsContainer}>
                        <div className={'1' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='1' style={{ background: colors['1']}} onClick={onSelectedColorChange}></div>
                        <div className={'2' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='2' style={{ background: colors['2']}} onClick={onSelectedColorChange}></div>
                        <div className={'3' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='3' style={{ background: colors['3']}} onClick={onSelectedColorChange}></div>
                        <div className={'4' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='4' style={{ background: colors['4']}} onClick={onSelectedColorChange}></div>
                        <div className={'5' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='5' style={{ background: colors['5']}} onClick={onSelectedColorChange}></div>
                        <div className={'6' === selectedColor ? styles.colorOptionSelected : styles.colorOption} id='6' style={{ background: colors['6'], border: '1px solid rgb(167, 167, 167)'}} onClick={onSelectedColorChange}></div>
                    </div>
                </div>
                <div className={styles.bankCheckboxContainer}>
                    <label>Chcę być bankiem</label>
                    <input type='checkbox'></input>
                </div>
                <div className={styles.createProfileButton}>UTWÓRZ PROFIL</div>
            </div>
        </div>
    </div>
}