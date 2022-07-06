import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DataGrid from "../components/clientsDataGrid"

const Home = () => {

    const [users, setUsers] = useState();
    const token = localStorage.getItem("token");    

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/clients', 
                    {
                        headers: { 'Authorization': `Bearer ${token}` },
                        // withCredentials: true
                    }
                )
                setUsers(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();
    }, [])


    return (
        <>
            <Header />

            <section className="home">
                <div className="home--container">
                    <DataGrid users={users} />
                </div>
            </section>
        </>
    )
}

export default Home
