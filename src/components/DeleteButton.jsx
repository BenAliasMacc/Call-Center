import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { MdDeleteForever } from 'react-icons/md';
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";

const DeleteButton = ({ clientId }) => {

  const { setDeleteClientsModal, auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setDeleteClientsModal(true)
    setAuth({...auth, clientId})
  }

  return (
    <>
      <button className="delete-button" onClick={handleOpenModal}>
        <MdDeleteForever style={{color: "red", width: "30px", height: '30px', cursor: "pointer"}}/>
      </button>
    
      { isLoading && 
        <div className='containerLoader'>
          <Loader />
        </div>
      }

    </>
  );
};

export default DeleteButton;
