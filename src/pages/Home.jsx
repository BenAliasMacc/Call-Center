import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DataGrid from "../components/clientsDataGrid"
import EditClientsModal from "../components/EditClientsModal";
import useAuth from '../hooks/useAuth';
import DeleteClientsModal from "../components/DeleteClientsModal";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {

    const { auth, editClientsModal, deleteClientsModal } = useAuth();
    const clientId = auth?.clientId;
    const token = localStorage.getItem("token");
    const [clients, setClients] = useState();   
    const [refresh, setRefresh] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [lengthDatas, setLengthDatas] = useState(0);

    useEffect(() => {
        const getClients = async () => {

            setIsLoading(true);

            try {
                const response = await axios.get('/clients', 
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        // withCredentials: true
                    }
                )
                if(response.data.success === -1) {
                    localStorage.clear();
                    navigate('/login', {state: { from: location }, replace: true })
                } else {
                    setClients(response.data);
                    setLengthDatas(response.data.length)
                }
                setIsLoading(false)
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
                    <DataGrid clients={clients} lengthDatas={lengthDatas} />                    
                </div>

                { isLoading && 
                    <div className='containerLoader'>
                        <Loader />
                    </div>
                }
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
