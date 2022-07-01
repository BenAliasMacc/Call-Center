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
                // console.log(response.data);
                setUsers(response.data)
            } catch (err) {
                console.log(err);
            }
        }

        getUsers();
    }, [])

    // useEffect(() => {
    //     const getUsers = () => {
    //         fetch('https://calldirect.herokuapp.com/api/clients', { 
    //             method: "GET",
    //             params: {
    //                 "userId": "62b08ba33f8191dd23368c83"
    //             },
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 Authorization: `Bearer ${auth.accessToken}`
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => console.log(data) );
    //     }

    //     getUsers()
    // }, [])

    return (
        <>
            <MainTable users={users} />
        </>
    )
}

export default Users