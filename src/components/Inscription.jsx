import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import BackHomeLink from "../components/BackHomeLink";
import axios from "../api/axios";
import Loader from '../components/Loader';

function Inscription() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = data => {

        setIsLoading(true);

        const createNewUsers = async () => {
          try {
            const response = await axios.post(
              `/users/signup`,
              JSON.stringify(data),
              {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json, text/plain,"
                }
                // withCredentials: true
              }
            );
            setIsLoading(false);
          } catch (err) {
             console.log();
          }
        };
    
        createNewUsers();
      };


    return (
        <section className="gestion-users" style={{width: "50%", padding: "20px"}}>
            <div className="gestion-users--container">
                <BackHomeLink />
                <form className="gestion-users__form" onSubmit={handleSubmit(onSubmit)} >
                    <label htmlFor="email">mail <span className="mandatory">*</span></label>
                    <input type="email" id="mail" {...register("email", { required: true })}/>
                    {
                        errors?.mail?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>)
                    }
                    
                    <label htmlFor="password">Mot de passe <span className="mandatory">*</span></label>
                    <input type="password" id="password"{...register("password", {required: true, maxLength: 20})}/>
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

                    <label htmlFor="groupe">Rôle <span className="mandatory">*</span></label>
                    <select type="radio" id="groupe" {...register("groupe", {required: true})}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                    {
                        errors?.mail?.type === "required" && (
                        <p className="error-message">Ce champ doit être complété</p>
                    )}

                    <button type="submit">Valider</button>
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