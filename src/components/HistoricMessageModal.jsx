import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { dateParser } from "../utils/dateParser";

const HistoricMessageModal = ({ showHistoric }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [historic, setHistoric] = useState([]);
    const { auth } = useAuth();  
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const clientId = searchParams.get('tel');

    useEffect(() => {
        const getHistoric = async () => {
            try {
            const response = await axios.get(`http://localhost:80/api/logs/${clientId}`, {
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
        <div className="HistoricMessageModal">
            <h4>Historique</h4>
            <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseMessage}>X</span>
            {historic?.map(log => 
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Compte</th>
                            <th scope="col">Dest</th>
                            <th scope="col">Message</th>
                        </tr>
                        <tr>
                            <th>{dateParser(log.createdAt)}</th>
                            <th>{log.compte}</th>
                            <th>{log.numero}</th>
                            <th>{log.message}</th>
                        </tr>
                    </thead>
                </table>
                // <div className="historic">
                //     <div>{dateParser(log.createdAt)}</div>
                //     <div>{log.compte}</div>
                //     <div>{log.compte}</div>
                //     <div>{log.compte}</div>
                // </div>
                )}
        </div>
    );
};

export default HistoricMessageModal;