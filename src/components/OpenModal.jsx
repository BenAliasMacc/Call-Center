import axios from "../api/axios";
import { MdPublishedWithChanges } from 'react-icons/md';
import { useEffect, useState } from "react";
import ClientsModal from "./ClientsModal";

const OpenModal = ({ clientId }) => {

  const token = localStorage.getItem("token");
  const [client, setClient] = useState();

  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await axios.get(`/clients/getClient/${clientId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json, text/plain,"
          }
          // withCredentials: true
        });
        setClient(response.data);
      } catch (err) {}
    };

    getClients();
  }, []);
    
    return (
        <div className="open-modal">        
            <button className="open-modal__button">
                <MdPublishedWithChanges style={{color: "green", width: "30px", height: '30px', cursor: "pointer"}}/>
            </button>

            {client !== undefined && (
                <ClientsModal client={client} setClient={setClient} clientId={clientId} token={token} />
            )}
        </div>
    )
}

export default OpenModal;