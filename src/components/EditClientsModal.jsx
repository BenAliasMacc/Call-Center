import { useEffect, useState } from 'react';
import axios from '../api/axios';
import DisplayClientsData from './DisplayClientsData';
import Loader from './Loader';

const EditClientsModal = ({ clientId, refresh, setRefresh }) => {

    const token = localStorage.getItem("token");
    const [client, setClient] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);

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
            setIsLoading(false);
          } catch (err) {}
        };
    
        getClients();
      }, []);

    return (
        <div className='edit-clients-modal'>
          <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} booleen={true} refresh={refresh} setRefresh={setRefresh} />

          { isLoading && 
            <div className='containerLoader'>
              <Loader />
            </div>
          }
          
        </div>
    )
}

export default EditClientsModal