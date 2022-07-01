import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const ContainerHeader = ({ name, firstname, clientId }) => {

  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = localStorage.getItem('token');
  const userId = "62b08ba33f8191dd23368c83"
  

  console.log(auth);

  const handleDeleteButton = () => {

    const deleteClients = async() => {

      try {
          const response = await axios.delete(`/clients/deleteClient/${clientId}`,
          {
            headers: 
              {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json, text/plain,'
              },
            data:
              {
                "userId": userId
              }
              // withCredentials: true
          }
          );
          console.log(response.data);
          navigate('/');
      } catch (err) {
        console.log();
      }
    } ;

    deleteClients()
    
  }

  return (
    <div className='container-header'>
        <h1>{firstname} {name}</h1>
        <button onClick={handleDeleteButton}>Supprimer la fiche</button>
    </div>
  )
}

export default ContainerHeader