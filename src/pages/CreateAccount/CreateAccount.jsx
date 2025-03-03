import styles from './CreateAccount.module.css';

export const CreateAccount = () => {
    return <div className={styles.createAccountPage}>
        <div className={styles.formContainer}>
            <div class={styles.createAccountFormContainer}>
                <div className={styles.appTitle}>TRESTA BUSSINESS</div>
                <input placeholder='Imię' className={styles.nameInput}></input>
                <div className={styles.colorSelector}>
                    <div className={styles.colorSelectorTitle}>Kolor pionka</div>
                    <div className={styles.colorsContainer}>
                        <div className={styles.colorOption} style={{ background: 'rgb(255, 209, 59)'}}></div>
                        <div className={styles.colorOption} style={{ background: 'rgba(236, 71, 71, 1)'}}></div>
                        <div className={styles.colorOption} style={{ background: 'rgba(71, 159, 236, 1)'}}></div>
                        <div className={styles.colorOption} style={{ background: 'rgba(20, 155, 47, 1)'}}></div>
                        <div className={styles.colorOption} style={{ background: 'rgba(74, 43, 117, 1)'}}></div>
                        <div className={styles.colorOption} style={{ background: 'rgba(255, 255, 255, 1)', border: '1px solid rgb(167, 167, 167)'}}></div>
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