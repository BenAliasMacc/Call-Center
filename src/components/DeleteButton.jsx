import { useState } from "react";
import { MdDeleteForever } from 'react-icons/md';
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";

const DeleteButton = ({ clientId }) => {

    const userRole = localStorage.getItem("userRole");
    const { setDeleteClientsModal, auth, setAuth } = useAuth();
    const [isLoading] = useState(false);

    const ROLES = {
        'User': "0",
        'Admin': "1"
    }

    const handleOpenModal = (e) => {
            e.preventDefault();
            setDeleteClientsModal(true)
            setAuth({...auth, clientId})    
    }

    return (    
        <>
            { userRole === ROLES.Admin &&
                <button className="delete-button" onClick={handleOpenModal}>
                    <MdDeleteForever style={{color: "red", width: "30px", height: '30px', cursor: "pointer"}}/>
                </button>               
            }

            { isLoading && 
                <div className='containerLoader'>
                <Loader />
                </div>
            }
        </>
    );
};

export default DeleteButton;
