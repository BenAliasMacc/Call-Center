import { useState } from "react";
import { dateParser } from "../utils/dateParser";

const HistoricMessageModal = ({ showHistoric, historic }) => {

    const [selectedClass, setSelectedClass] = useState('selected');   

    const handleCloseHistoric = () => {
        showHistoric(false);
    };

    const handleMessage = (index) => {
        setSelectedClass(index === selectedClass ? null : index);
    };

    return (        
        <div className={`modalAnimation historicMessageCaller`}>
            <h4>Historique</h4>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold", cursor: "pointer"}} onClick={handleCloseHistoric}>X</span>
            <div className="historicMessageCaller__container">
                <div className="historicMessageCaller__header">
                    <div>Date</div>
                    <div>Message</div>
                </div>
                {historic?.map((log, index)=> 
                <div key={log._id} className="historicMessageCaller__body" onClick={() => handleMessage(index)} style={{borderBottom: "1px solid rgb(13, 186, 216)", paddingBottom: '10px', paddingRight: '10px'}}>
                    <div>{dateParser(log.createdAt)}</div>
                    <div className={selectedClass === index ? '' : 'messageHidden'} >{log.message}</div>
                </div>
                )}
            </div>            
        </div>
    );
};

export default HistoricMessageModal;