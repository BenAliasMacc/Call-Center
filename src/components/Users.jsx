import { useEffect, useState } from "react"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import MainTable from "./mainTable"


const Users = () => {

    const { auth } = useAuth();
    const [users, setUsers] = useState()
    console.log(auth.accessToken);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/clients',
                    {
                        headers: { 'Authorization': `Bearer ${auth?.accessToken}` },
                        // withCredentials: true
                    }
                )
                console.log(response.data);
                setUsers(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();
    }, [])

    return (
        <>
            <MainTable users={users} />
        </>
    )
}

export default Users