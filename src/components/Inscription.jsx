import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../api/axios";
import Loader from '../components/Loader';
import '../styles/modalAnimation.css';
import '../styles/styles.css';

function Inscription(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    const animation = useRef();

    console.log(props.user);
    function closeModale() {

        animation.current.style.animation = "slideBack .5s ease-in-out";
        setTimeout(() => {
            props.setIsCreated(!props.isCreated);
        }, 500);
    }

    const onSubmit = data => {

        setIsLoading(true);

        fetch("https://calldirect.herokuapp.com/api/users/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === -1)  {
                navigate('/login', {state: { from: location }, replace: true })
            } else {
                props.setIsCreated(false)
                props.setRefreshList(!props.refreshList)
            } 
            setIsLoading(false)
        })
        .catch(error =>console.log(error))

    }
  
    return (
        <section className="gestion-users" style={{width: "50%", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h4 style={{position: "absolute", top: "20px", fontSize: "1.5rem", color: "white"}}>Inscription d'un nouveau membre</h4>
            <div className="gestion-users--container modal" ref={animation} style={{position: "relative"}}>
                <div onClick={closeModale} style={{position: "absolute", top: "20px", right: "10px", width: "30px", height: "30px", color: "#F2A965", fontWeight: "bold", fontSize: "1.5rem", cursor: 'pointer'}}>X</div>
                <form className="gestion-users__form" onSubmit={handleSubmit(onSubmit)} style={{border: "1px solid #0dbad8", padding: '10px'}}>
                    <label htmlFor="email">Mail <span className="mandatory">*</span></label>
                    <input type="email" id="mail" defaultValue="" {...register("email", { required: true })}/>
                    {
                        errors?.mail?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>)
                    }
                    
                    <label htmlFor="password">Mot de passe <span className="mandatory">*</span></label>
                    <input type="password" id="password" {...register("password", {required: true, maxLength: 20})}/>
                    {
                        errors?.nom?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>
                    )}
                    {
                        errors?.nom?.type === "maxLength" && (
                        <p className="error-message">
                            Le nombre de caractéres autorisé est de maximum 20
                        </p>
                    )}      

                    <label htmlFor="nom">Nom <span className="mandatory">*</span></label>
                    <input type="text" id="nom" defaultValue="" {...register("nom", { required: true })}/>
                    {
                        errors?.nom?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>)
                    }  

                    <label htmlFor="groupe">Rôle <span className="mandatory">*</span></label>
                    <select type="radio" id="groupe" defaultValue="user" {...register("groupe", {required: true})}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    {
                        errors?.mail?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>
                    )}

                    <button className="btnSubmitInscription" type="submit">Valider</button>
                </form>
            </div>

            { isLoading && 
                <div className='containerLoader'>
                    <Loader />
                </div>
            }
            
        </section>
    )
}

export default Inscription;