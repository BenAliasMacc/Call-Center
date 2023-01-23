import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { dateParser } from "../utils/dateParser";

const HistoricMessageModal = ({ showHistoric, styleModal, globalHistoric }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [historic, setHistoric] = useState([]);
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
            setIsLoading(false);
            } catch (err) {
                if (err.response?.status === 404) {
                    navigate('*', {state: { from: location }, replace: true });
                }
            }
        };
    
        getHistoric();
    }, []);

    const handleCloseMessage = () => {
        showHistoric(false);
    };

    return (
        
        <div className={`modalAnimation ${styleModal}`}>
            <h4>Historique</h4>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold", cursor: "pointer"}} onClick={handleCloseMessage}>X</span>
            <div className="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            {globalHistoric && <>                            
                            <th scope="col">Compte</th>
                            <th scope="col">Dest</th>
                            </>}
                            <th scope="col">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historic?.map(log => 
                        <tr key={log._id}>
                            <td>{dateParser(log.createdAt)}</td>
                            {globalHistoric && <>  
                            <td>{log.compte}</td>
                            <td>{log.numero}</td>
                            </>}
                            <td>{log.message}</td>
                        </tr>
                        )}
                    </tbody>
                </table>          
            </div>
        </div>
    );
};

export default HistoricMessageModal;