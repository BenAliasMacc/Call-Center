import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import DisplayClientsData from "../components/DisplayClientsData";
import Header from "../components/Header";
import Loader from '../components/Loader';

const ClientsCard = () => {

  const clientId = useParams().id;
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
    <>
      <Header />

      {client !== undefined && (
        <section className="clients-card" style={{marginTop: "40px"}}>
          <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} booleen={false} />

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
