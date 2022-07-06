import React, {useState, useEffect} from 'react';
import axios from "../api/axios";
import DeleteButton from './DeleteButton';


function ListUsers() {

    const [users, setUsers] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getUsers = async () => {
          try {
            const response = await axios.get(`/users`, {
              headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json, text/plain"
              }
              // withCredentials: true
            });
                setUsers(response.data);
          } catch (err) {
                console.log(err)
          }
        };
    
        getUsers();
      }, []);

    return (

        <div style={{width: "50%", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"}}>
            <section style={{width: "90%", borderRadius: "5px", padding: "20px", backgroundColor: "white", boxShadow: "0 0 8px #ccc", display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: 'center'}}>
                {
                    users && users.map((user, index) => {
                        console.log(user._id)
                        return (
                            <>
                                <div key={index} style={{display: "flex", justifyContent: "flex-start", alignItems: "center", backgroundColor: 'rgb(240, 240, 240)', borderRadius: "10px", width: "90%", height: "40px", padding: '0 10px', color: "#0dbad8", fontWeight: "bold", marginBottom: "15px", boxShadow: "0 0 8px #ccc"}}>
                                    <span>{user.email}</span>
                                    <DeleteButton clientId={user._id}/>
                                </div>
                            </>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default ListUsers;
