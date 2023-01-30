import { useState } from 'react';
import { dateParser } from '../utils/dateParser';

const HistoricFullMessage = ({ historic }) => {

    const [showMessage, setShowMessage] = useState(false)

    const handleMessage = () => {
        setShowMessage(!showMessage)
    };
    return (
        <div className='HistoricFullMessage'>
            <div className='HistoricFullMessage__container'>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold", cursor: "pointer"}} onClick={handleMessage}>X</span>
                <div>Créé le :{dateParser(historic.createdAt)}</div>
                <div>Par :{historic.compte}</div>
                <div>Destinataire :{historic.numero}</div>
                <div className={showMessage ? "messageHidden" : ""}>{historic.message}</div>
            </div>
        </div>
    )
};

export default HistoricFullMessage;