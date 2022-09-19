import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import DisplayClientsData from './DisplayClientsData';
import Loader from './Loader';

const EditClientsModal = ({ clientId, refresh, setRefresh }) => {

    const token = localStorage.getItem("token");
    const [client, setClient] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        // setIsLoading(true);

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
            console.log(response.data);
            if (response.data.success === -1)  {
                localStorage.clear();
                navigate('/login', {state: { from: location }, replace: true });
            }
            if(response.data.success === -2) {
                navigate('/', {state: { from: location }, replace: true });
            }            
            setClient(response.data);
            setIsLoading(false);
          } catch (err) {}
        };
    
        getClients();
      }, []);

    return (
        <div className='edit-clients-modal'>
          <DisplayClientsData styleModal="styleModal" client={client} setClient={setClient} clientId={clientId} token={token} booleen={true} refresh={refresh} setRefresh={setRefresh} />

          { isLoading && 
            <div className='containerLoader'>
              <Loader />
            </div>
          }
          
        </div>
    )
}

export default EditClientsModal