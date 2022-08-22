import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import DisplayClientsData from "../components/DisplayClientsData";
import Header from "../components/Header";
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';

const ClientsCard = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const clientId = useParams().id;
  const [refresh, setRefresh] = useState(false)
  const token = localStorage.getItem("token");
  const [client, setClient] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {

    /* let numClient = '';

    if (clientId.includes('&')) {

        numClient = clientId.split("tel=")[1].split("&");
        numClient = numClient[0];
    } else {
        numClient = clientId;
    } */

    setIsLoading(true);

    const getClients = async () => {
      try {
        const response = await axios.get(`/clients/getClient/${searchParams.get('tel')}`, {
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
        setClient(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate('*', {state: { from: location }, replace: true });
        }
      }
    };

    getClients();
  }, [refresh]);

  return (
    <>
      <Header />

      {client !== undefined && (
        <section className="clients-card" style={{marginTop: "70px"}}>
          <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} booleen={false} setRefresh={setRefresh} refresh={refresh} />

          { isLoading && 
            <div className='containerLoader'>
              <Loader />
            </div>
          }
        </section>
      )}
    </>
  );
};

export default ClientsCard;
