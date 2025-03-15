import styles from './TransactionHistoryEntry.module.css';
import { ReactComponent as TransactionArrow } from '../../assets/transaction_arrow1.svg';
import { colors } from '../../colors';

export const TransactionHistoryEntry = ({ transactionInfo, allPlayers }) => {

    const getPlayerAvatar = (id) => {
        const playerInfo = allPlayers.find(player => player.playerID === id);
        if (playerInfo) {
            return <div
            className={styles.profileMiniAvatar}
            style={{background: colors[playerInfo.color]}}
            id={playerInfo.playerID}
        >{playerInfo.name[0].toUpperCase()}</div>;
        }
    }


    return <div className={styles.transactionEntry}>
    <div className={styles.transactionSidesContainer}>
        {getPlayerAvatar(transactionInfo.senderId)}
        <div className={styles.transactionArrow}><TransactionArrow/></div>
        {getPlayerAvatar(transactionInfo.receiverId)}
    </div>
    <div className={styles.transactionTitle}>{transactionInfo.title}</div>
    <div className={styles.transactionValue}>{transactionInfo.value}F</div>
</div>
}