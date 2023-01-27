import React from 'react'

const HistoricFullMessage = ({historic, setShowHistoricFullMessage}) => {

    const handleCloseHistoricFullMessage = () => {
        setShowHistoricFullMessage(false);
    };

    return (
        <div className='HistoricFullMessage'>
            <div className='HistoricFullMessage__container'>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold", cursor: "pointer"}} onClick={handleCloseHistoricFullMessage}>X</span>
                <div>{historic.createdAt}</div>
                <div>{historic.numero}</div>
                <div>{historic.compte}</div>
                <div>{historic.message}</div>
            </div>
        </div>
    )
}

export default HistoricFullMessage;