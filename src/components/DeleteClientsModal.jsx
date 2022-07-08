import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const DeleteClientsModal = ({ clientId, refresh, setRefresh }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { setDeleteClientsModal } = useAuth();
    const token = localStorage.getItem("token");
    const userId = "62b08ba33f8191dd23368c83";
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteClient = () => { 

        setIsLoading(true);

        const deleteClients = async () => {
        try {
            const response = await axios.delete(
            `/clients/deleteClient/${clientId}`,
            {
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                Accept: "application/json, text/plain"
                },
                data: {
                userId: userId
                }
                // withCredentials: true
            }
            );
            setRefresh(!refresh)
            setIsLoading(false);
            setDeleteClientsModal(false);            
            navigate(from, { replace: true })
            // window.location.reload();
        } catch (err) {
            console.log();
        }
        };

        deleteClients();
    };

    const handleCloseModal = (e) => {
        e.preventDefault();
        setDeleteClientsModal(false);
    }

    return (

        <div className='delete-clients-modal'>
            <div className='delete-clients-modal--container'>
                <p>Souhaitez-vous confirmer la suppression</p>
                <button onClick={handleCloseModal}>X</button>
                <button onClick={handleDeleteClient}>Confirmer</button>
            </div>
        </div>
    )
}

export default DeleteClientsModal