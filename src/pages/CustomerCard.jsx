import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header"


const CustomerCard = () => {

    const userId = useParams().id
    const token = localStorage.getItem('token');
    const [user, setUser] = useState();

    useEffect(() => {
        const createNewCustomer = async() => {

            try {
                const response = await axios.get(`/clients/getClient/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json, text/plain,'
                    },
                    // withCredentials: true
                }
                );
                console.log(response.data);
                setUser(response.data)
            } catch (err) {

            }
        } ;

        createNewCustomer()
    }, [])

    return (

        <>
            <Header />
        {user !== undefined &&
            
            <section className="customer-card"> 
                <h1>{user.nom} {user.prenom}</h1>
                <div className="customer-card--container">
                    
                </div>
            </section>

        }
        </>
    )
}

export default CustomerCard