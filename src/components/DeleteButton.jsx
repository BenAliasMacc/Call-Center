import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { MdDeleteForever } from 'react-icons/md'; 

const DeleteButton = ({ clientId }) => {
  console.log(clientId);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = "62b08ba33f8191dd23368c83";

  const handleDeleteButton = () => {
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
        console.log(response.data);
        navigate("/");
        window.location.reload();
      } catch (err) {
        console.log();
      }
    };

    deleteClients();
  };

  return (
    <button className="delete-button" onClick={handleDeleteButton}>
      <MdDeleteForever style={{color: "red", width: "30px", height: '30px', cursor: "pointer"}}/>
    </button>
  );
};

export default DeleteButton;
