import { useEffect, useState } from "react";
import axios from "../api/axios";

const HistoricMessageModal = () => {

    const [historic, setHistoric] = useState([]);

    useEffect(() => {
        const getHistoric = async () => {
            try {
            const response = await axios.get(`http://localhost:80/api/logs/00001`, {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json, text/plain,"
                }
                // withCredentials: true
            });        

            console.log(response)
                
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

        console.log(historic);
    
        getHistoric();
    }, []);

    return (
        <div className="HistoricMessageModal">
            {historic?.map(log => <div>{log}</div>)}
        </div>
    );
};

export default HistoricMessageModal;