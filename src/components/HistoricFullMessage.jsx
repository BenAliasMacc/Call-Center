import { dateParser } from '../utils/dateParser';

const HistoricFullMessage = ({ historic, setShowHistoricFullMessage, showHistoricFullMessage }) => {

    const handleCloseHistoricFullMessage = () => {
        setShowHistoricFullMessage(false);
    };

    console.log(showHistoricFullMessage);
    return (
        <div className='HistoricFullMessage'>
            <div className='HistoricFullMessage__container'>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold", cursor: "pointer"}} onClick={handleCloseHistoricFullMessage}>X</span>
                <div>Créé le :{dateParser(historic.createdAt)}</div>
                <div>Par :{historic.compte}</div>
                <div>Destinataire :{historic.numero}</div>
                <div>{historic.message}</div>
            </div>
        </div>
    )
};

export default HistoricFullMessage;