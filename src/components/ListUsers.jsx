import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import DeleteButton from './DeleteButton';
import { MdDeleteForever } from 'react-icons/md';
import Loader from '../components/Loader';
import Inscription from "../components/Inscription";
import BackHomeLink from "../components/BackHomeLink";
import DeleteUserModal from "./DeleteUserModal";
import ModificationUSer from './ModificationUser';

function ListUsers() {

    const [users, setUsers] = useState();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [isDeleteUsersModal, setIsDeleteUserModal] = useState(false);
    const [openModification, setOpenModification] = useState(false);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState();

    console.log(user);

    console.log(userId)

    useEffect(() => {

        setIsLoading(true);

        const getUsers = async () => {
          try {
            const response = await axios.get(`/users`, {
              headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json, text/plain"
              }
            });
            setUsers(response.data);
            setIsLoading(false);
          } catch (err) {
                console.log(err)
          }
        };
    
        getUsers();
    }, [refreshList]);

    function handleDeleteUser(userId) {

        setIsDeleteUserModal(true);
        setUserId(userId);
    };

    function handleModifyUser(user) {
        setUser(user);
        setOpenModification(true);
    }
    
    function handleCreateUser() {
        setIsCreated(true);
        setUser();
    }

    return (

        <div style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"}}>
            <section style={{width: "90%", borderRadius: "5px", padding: "20px", backgroundColor: "white", boxShadow: "0 0 8px #ccc", display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center', marginTop: '120px'}}>
                <div style={{position: "relative", display: "flex", justifyContent: 'center', alignItems: "center", gap: "30px", borderBottom: "1px solid #F2A965", width: "100%", height: "80px", marginBottom: "30px"}}>
                    <div style={{position: "absolute", top: "0", left: "0"}}>
                        <BackHomeLink />
                    </div>
                    <span style={{color: "#0dbad8"}}>Ajouter un nouvel utilisateur </span>
                    <div onClick={handleCreateUser} style={{width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#F2A965", fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: 'center', color: 'white', cursor: 'pointer'}}>+</div>     
                </div>
                <div style={{width: "100%", overflowY : 'scroll'}}>
                    {
                        users && users.map((user, index) => {

                            return (
                                <div key={index} style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: 'rgb(240, 240, 240)', borderRadius: "10px", width: "90%", height: "40px", padding: '0 20px', color: "#0dbad8", fontWeight: "bold", marginBottom: "15px", boxShadow: "0 0 8px #ccc", cursor: "pointer"}}>
                                    <div onClick={() => handleModifyUser(user)} style={{width: "80%", display: "flex", justifyContent: "flex-start", gap: "20px"}}>
                                        <span >{user.nom}</span>
                                        <span >{user.email}</span>
                                    </div>
                                        <button className="delete-button" onClick={() => handleDeleteUser(user._id)} >
                                            <MdDeleteForever style={{color: "red", width: "30px", height: '30px', cursor: "pointer"}}/>
                                        </button>
                                </div>
                            )
                        })
                    }
                </div>

            { 
                isLoading && 
                <div className='containerLoader'>
                    <Loader />
                </div>
            }

            {
                isDeleteUsersModal && 
                <DeleteUserModal userId={userId} refreshList={refreshList} setRefreshList={setRefreshList} isDeleteUsersModal={isDeleteUsersModal} setIsDeleteUserModal={setIsDeleteUserModal} />
            }

            {
                isCreated && 
                <div style={{position: "fixed", top:"0", left:"0", width: "100%", height: "100%", zIndex: "1000", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <Inscription user={user} setIsCreated={setIsCreated} isCreated={isCreated} refreshList={refreshList} setRefreshList={setRefreshList} />
                </div>
            }

            {
                user && openModification && 
                <div style={{position: "fixed", top:"0", left:"0", width: "100%", height: "100%", zIndex: "1000", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <ModificationUSer user={user} openModification={openModification} setOpenModification={setOpenModification} refreshList={refreshList} setRefreshList={setRefreshList} />
                </div>
            }
                   
            </section>
        </div>
    )
}

export default ListUsers;
