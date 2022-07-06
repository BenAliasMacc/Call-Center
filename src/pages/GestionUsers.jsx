import React from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import BackHomeLink from "../components/BackHomeLink";
import Header from "../components/Header";

const GestionUsers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const token = localStorage.getItem("token");

  const onSubmit = (data) => {
    const createNewClients = async () => {
      try {
        const response = await axios.post(
          `/clients/createClient`,
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
        console.log(response.data);
      } catch (err) {
        console.log();
      }
    };

    createNewClients();
  };

  return (
    <>
      <Header />
      <section className="gestion-users">
        <div className="gestion-users--container">
          <BackHomeLink />
          <form
            className="gestion-users__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="prenom">
              Prénom <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              id="prenom"
              {...register("prenom", {
                required: true,
                maxLength: 20
              })}
            />
            {errors?.prenom?.type === "required" && (
              <p className="error-message">Ce champ doit être complété</p>
            )}
            {errors?.prenom?.type === "maxLength" && (
              <p className="error-message">
                Le nombre de caractéres autorisé est de maximum 20
              </p>
            )}

            <label htmlFor="nom">
              Nom <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              id="nom"
              {...register("nom", {
                required: true,
                maxLength: 20
              })}
            />
            {errors?.nom?.type === "required" && (
              <p className="error-message">Ce champ doit être complété</p>
            )}
            {errors?.nom?.type === "maxLength" && (
              <p className="error-message">
                Le nombre de caractéres autorisé est de maximum 20
              </p>
            )}

            <label htmlFor="mail">
              mail <span className="mandatory">*</span>
            </label>
            <input
              type="email"
              id="mail"
              {...register("mail", {
                required: true
              })}
            />
            {errors?.mail?.type === "required" && (
              <p className="error-message">Ce champ doit être complété</p>
            )}

            <label htmlFor="role">
              Rôle <span className="mandatory">*</span>
            </label>
            <select
              type="radio"
              id="role"
              options={["female", "male", "other"]}
              {...register("role", {
                required: true
              })}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            {errors?.mail?.type === "required" && (
              <p className="error-message">Ce champ doit être complété</p>
            )}

            <button type="submit">Valider</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default GestionUsers;
