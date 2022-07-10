import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import bin from '../assets/icons/bin-modal.svg';
import Loader from '../components/Loader';

const DeleteUserModal = (props) => {

    console.log(props)

    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

    const handleDeleteClient = () => { 

        setIsLoading(true);

        fetch(`https://calldirect.herokuapp.com/api/users/delete/${props.userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success == "1") {

                setIsLoading(false);
                props.setRefreshList(!props.refreshList);
                props.setIsDeleteUserModal(false);
            }
        })
        .catch(error =>console.log(error))
    };

    return (

        <div className='delete-clients-modal'>
            <div className='delete-clients-modal--container'>
                <div className='delete-clients-modal__text'>
                    <h2><img src={bin} alt="suppression" /> Confirmer la suppression ?</h2>
                    <p>Attention si vous cliquez sur confirmer la suppression de l'utilisateur sera définitive</p>
                </div>
                <div className='delete-clients-modal__buttons'>
                    <button className='delete-clients-modal__buttons__cancel' onClick={() => props.setIsDeleteUserModal(false)}>Annuler</button>
                    <button className='delete-clients-modal__buttons__confirm' onClick={handleDeleteClient}>Confirmer</button>
                </div>
            </div>
            { 
                isLoading && 
                <div className='containerLoader'>
                    <Loader />
                </div>
            }
        </div>
    )
}

export default DeleteUserModal;