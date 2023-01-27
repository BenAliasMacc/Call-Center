import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { dateParser } from "../utils/dateParser";
import HistoricFullMessage from "./HistoricFullMessage";

const HistoricMessageModal = ({ showHistoric }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [historic, setHistoric] = useState([]);
    const [showHistoricFullMessage, setShowHistoricFullMessage] = useState(false);
    const { auth } = useAuth();  
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const clientId = searchParams.get('tel');
    let callerId = false;
    callerId = searchParams.get('tel_from');
    const urlApi = callerId ? `http://localhost:80/api/logs/${clientId}/${callerId}` : `http://localhost:80/api/logs/${clientId}`

    useEffect(() => {
        const getHistoric = async () => {
            try {
            const response = await axios.get(urlApi, {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json, text/plain,"
                }
                // withCredentials: true
            });        
                
            if (response.data.success === -1)  {
                localStorage.clear();
                navigate('/login', {state: { from: location }, replace: true });
            }
            setHistoric(response.data);
            } catch (err) {
                if (err.response?.status === 404) {
                    navigate('*', {state: { from: location }, replace: true });
                }
            }
        };
    
        getHistoric();
    }, []);

    const openHistoricFullMessage = () => {
        setShowHistoricFullMessage(true);
    };

    console.log(showHistoricFullMessage);

    const handleCloseHistoric = () => {
        showHistoric(false);
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
                {historic?.map(log => 
                <div key={log._id} className="historicMessageCaller__body" onClick={openHistoricFullMessage}>
                    <div>{dateParser(log.createdAt)}</div>
                    <div className="historicMessageCaller__message">{log.message}</div>
                    {showHistoricFullMessage && <HistoricFullMessage historic={log} setShowHistoricFullMessage={setShowHistoricFullMessage} />}
                </div>
                )}
            </div>            
        </div>
    );
};

export default HistoricMessageModal;