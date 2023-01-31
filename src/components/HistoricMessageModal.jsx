import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import { dateParser } from "../utils/dateParser";

const HistoricMessageModal = ({ showHistoric }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [historic, setHistoric] = useState([]);
    const token = localStorage.getItem("token");
    const [selectedClass, setSelectedClass] = useState('selected');

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
                <div key={log._id} className="historicMessageCaller__body" onClick={() => handleMessage(index)}>
                    <div>{dateParser(log.createdAt)}</div>
                    <div className={selectedClass === index ? '' : 'messageHidden'} >{log.message}</div>
                </div>
                )}
            </div>            
        </div>
    );
};

export default HistoricMessageModal;