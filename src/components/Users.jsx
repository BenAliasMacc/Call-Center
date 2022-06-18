import { useEffect, useState } from "react"
import axios from "../api/axios";
import MainTable from "./mainTable"


const Users = () => {

    const [users, setUsers] = useState()

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('/users')
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