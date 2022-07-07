import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import DeleteButton from './DeleteButton';
import Loader from '../components/Loader';
import Inscription from "../components/Inscription";
import BackHomeLink from "../components/BackHomeLink";

function ListUsers() {

    const [users, setUsers] = useState();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreated, setIsCreated] = useState(false);

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
      }, []);

    return (

        <div style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"}}>
            <section style={{width: "90%", borderRadius: "5px", padding: "20px", backgroundColor: "white", boxShadow: "0 0 8px #ccc", display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center'}}>
                <div style={{position: "relative", display: "flex", justifyContent: 'center', alignItems: "center", gap: "30px", borderBottom: "1px solid #F2A965", width: "100%", height: "80px", marginBottom: "30px"}}>
                    <div style={{position: "absolute", top: "0", left: "0"}}>
                        <BackHomeLink />
                    </div>
                    <span style={{color: "#0dbad8"}}>Ajouter un nouvel utilisateur </span>
                    <div onClick={() => setIsCreated(true)} style={{width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#F2A965", fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: 'center', color: 'white', cursor: 'pointer'}}>+</div>     
                </div>
                {
                    users && users.map((user, index) => {
                        return (
                            <>
                           
                                <div key={index} style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: 'rgb(240, 240, 240)', borderRadius: "10px", width: "90%", height: "40px", padding: '0 10px', color: "#0dbad8", fontWeight: "bold", marginBottom: "15px", boxShadow: "0 0 8px #ccc"}}>
                                    <span>{user.email}</span>
                                        <DeleteButton clientId={user._id}/>
                                </div>
                            </>
                        )
                    })
                }

            { 
                isLoading && 
                <div className='containerLoader'>
                    <Loader />
                </div>
            }

            {
                isCreated && 
                <div style={{position: "fixed", top:"0", left:"0", width: "100%", height: "100%", zIndex: "1000", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.4)"}}>
                    <Inscription setIsCreated={setIsCreated} isCreated={isCreated} />
                </div>
            }
                   
            </section>
        </div>
    )
}

export default ListUsers;
