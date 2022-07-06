import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DataGrid from "../components/clientsDataGrid"
import ClientsModal from "../components/ClientsModal";
import useAuth from '../hooks/useAuth';

const Home = () => {

    const { auth } = useAuth();
    const clientId = auth?.clientId;
    const [clients, setClients] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await axios.get('/clients', 
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        // withCredentials: true
                    }
                )
                setClients(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        getClients();
    }, [])


    return (
        <>
            <Header />

            <section className="home">
                <div className="home--container">
                    <DataGrid clients={clients} />
                </div>
            </section>

            {clientId !== undefined && (
                // <ClientsModal client={client} setClient={setClient} clientId={clientId} token={token} />
                <ClientsModal clientId={clientId} />
            )}
        </>
    )
}

export default Home
