import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import DisplayClientsData from "../components/DisplayClientsData";
import Header from "../components/Header";

const ClientsCard = () => {

  const clientId = useParams().id;
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
    <>
      <Header />

      {client !== undefined && (
        <section className="clients-card">
          <DisplayClientsData client={client} setClient={setClient} clientId={clientId} token={token} />
        </section>
      )}
    </>
  );
};

export default ClientsCard;
