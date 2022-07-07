import { useState } from "react";
import Header from "../components/Header";
import Inscription from "../components/Inscription";
import ListUsers from '../components/ListUsers';

const GestionUsers = () => {

    const [isCreated, setIsCreated] = useState(false);

    return (
        <>
            <Header />
            <div style={{display: "flex", justifyContent: "center",width: "100%", height: "100%"}}>
                <ListUsers />
                <div onClick={() => setIsCreated(true)} style={{width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#F2A965", fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: 'center', color: 'white', cursor: 'pointer'}}>+</div>     
                {
                    isCreated && <Inscription />
                }
            </div>
        </>
    );
};

export default GestionUsers;