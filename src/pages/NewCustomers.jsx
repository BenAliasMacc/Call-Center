import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import Header from "../components/Header";

const NewUser = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = localStorage.getItem('token');
  
  const onSubmit = data => {
    
    const createNewCustomer = async() => {
          console.log(token)
          // fetch('https://calldirect.herokuapp.com/api/clients/createClient', { 
          //       method: 'POST', 
          //       headers: {
          //         'Content-Type': 'application/json',
          //           'Authorization': `Bearer ${token}`,
          //           'Accept': 'application/json, text/plain,'
          //       },
          //       body: JSON.stringify(data)
          //       })
          //       .then(res => res.json())
          //       .then(data => console.log(data))
          //       .catch(err => {
                    
          //       })

          try {
              const response = await axios.post(`/clients/createClient`,
              JSON.stringify(data),
              {
                headers: 
                  {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain,'
                  },
                  // withCredentials: true
              }
              );
              console.log(response.data);
          } catch (err) {
            console.log();
          }
    } ;
  
    createNewCustomer()
  };

  

  return (

    <>
      <Header />

      <section className="newUser">

        <div className="newUser--container">

          <form className="newUser__form" onSubmit={handleSubmit(onSubmit)}>

            <div className="newUser__form--container">
              <fieldset>
                <legend>Données clients</legend>

                <label htmlFor="id">Identifiant</label>
                <input type="number" id="id"
                  {...register("id", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.id?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.id?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom"
                  {...register("prenom", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.prenom?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.prenom?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom"
                  {...register("nom", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.nom?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.nom?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="description">Description</label>
                <textarea id="description"
                  {...register("description")}
                />

                <label htmlFor="langue">Langue</label>
                <input type="lang" id="langue"
                  {...register("langue", {
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors?.langue?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}
                {errors?.langue?.type === "pattern" && (
                  <p className="error-message">Les chiffres ou caractères spéciaux ne sont pas autorisés</p>
                )}

              </fieldset>

              <fieldset>
                <legend>Informations sociétés</legend>
                  
                <label htmlFor="societe">Société</label>
                <input type="text" id="societe"
                  {...register("societe", {
                    maxLength: 20
                  })}
                />
                {errors?.societe?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="activite">Activité</label>
                <input type="text" id="activite"
                  {...register("activite", {
                    maxLength: 50
                  })}
                />
                {errors?.activite?.type === "required" && <p>Ce champ doit être complété</p>}
                {errors?.activite?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 50</p>
                )}

                <label htmlFor="site">Site web</label>
                <input type='url' id="site" preload="Texte initial" 
                  {...register("site")}
                />

                <label htmlFor="crm">CRM</label>
                <input type='url' id="crm"
                  {...register("crm")}
                />

              </fieldset>

              <fieldset>
                <legend>Adresse et coordonnées</legend>
                  
                  <label className="adresse" htmlFor="adresse">Adress compléte</label>
                    <textarea id="adresse"
                      {...register("adresse")}
                    />
                  

                <label htmlFor="mail">mail</label>
                <input type='email' id="mail"
                  {...register("mail", {
                    required: true
                  })}
                />
                {errors?.mail?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}

                <label htmlFor="telephone">Téléphone</label>
                <input type='number' id="telephone"
                  {...register("telephone", {
                    required: true
                  })}
                />
                {errors?.telephone?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}

              </fieldset>
            </div>

            <button className='button-submit'>Valider</button>
          </form>
        </div>
      </section>   
    </>

  )
}

export default NewUser