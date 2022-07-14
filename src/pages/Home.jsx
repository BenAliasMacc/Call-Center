import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DataGrid from "../components/clientsDataGrid"
import EditClientsModal from "../components/EditClientsModal";
import useAuth from '../hooks/useAuth';
import DeleteClientsModal from "../components/DeleteClientsModal";

const Home = () => {

    const { auth, editClientsModal, deleteClientsModal } = useAuth();
    const clientId = auth?.clientId;
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState();   
    const [refresh, setRefresh] = useState(false)
      
    console.log(auth);

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
    }, [refresh])


    return (
        <>
            <Header />

            <section className="home" style={{marginTop: "80px"}}>
                <div className="home--container">
                    <DataGrid clients={clients} />
                </div>
            </section>

            {deleteClientsModal === true && 
                <DeleteClientsModal clientId={clientId} refresh={refresh} setRefresh={setRefresh} />
            }

            {editClientsModal === true && (
                <EditClientsModal clientId={clientId} refresh={refresh} setRefresh={setRefresh} />
            )}
        </>
    )
}

export default Home
