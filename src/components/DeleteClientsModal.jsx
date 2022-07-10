import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import bin from '../assets/icons/bin-modal.svg'

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
                <div className='delete-clients-modal__text'>
                    <h2><img src={bin} alt="suppression" /> Confirmer la suppression ?</h2>
                    <p>Attention si vous cliquez sur confirmer la suppression de la fiche client sera définitive</p>
                </div>
                <div className='delete-clients-modal__buttons'>
                    <button className='delete-clients-modal__buttons__cancel' onClick={handleCloseModal}>Annuler</button>
                    <button className='delete-clients-modal__buttons__confirm' onClick={handleDeleteClient}>Confirmer</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteClientsModal