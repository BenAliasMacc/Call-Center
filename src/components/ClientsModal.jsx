import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import DisplayClientsData from './DisplayClientsData'

const ClientsModal = ({ clientId }) => {

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
        <div className='clients-modal'>
            <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} booleen={true} />
        </div>
    )
}

export default ClientsModal