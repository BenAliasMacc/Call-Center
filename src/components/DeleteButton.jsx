import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import bin from '../assets/icons/bin.svg'

const DeleteButton = ({ clientId }) => {
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
              Accept: "application/json, text/plain,"
            },
            data: {
              userId: userId
            }
            // withCredentials: true
          }
        );
        console.log(response.data);
        navigate("/");
      } catch (err) {
        console.log();
      }
    };

    deleteClients();
  };

  return (
    <button className="delete-button" onClick={handleDeleteButton}>
      <img src={bin} alt="supprimer" />
    </button>
  );
};

export default DeleteButton;
