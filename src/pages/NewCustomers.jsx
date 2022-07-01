import { useForm } from "react-hook-form";
import Header from "../components/Header";
import '../styles/NewCustomer.scss'

const NewUser = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

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
                {errors?.firstName?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.firstName?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="firstName">Prénom</label>
                <input type="text" id="firstName"
                  {...register("firstName", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.firstName?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.firstName?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="lastName">Nom</label>
                <input type="text" id="lastName"
                  {...register("lastName", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.lastName?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.lastName?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="description">Description</label>
                <textarea id="description"
                  {...register("description", {
                    required: true
                  })}
                />
                {errors?.description?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.description?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}
                {errors?.description?.type === "pattern" && (
                  <p className="error-message">Les chiffres ou caractères spéciaux ne sont pas autorisés</p>
                )}

                <label htmlFor="language">Langue</label>
                <input type="text" id="language"
                  {...register("language", {
                    maxLength: 20,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors?.language?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 50</p>
                )}
                {errors?.language?.type === "pattern" && (
                  <p className="error-message">Les chiffres ou caractères spéciaux ne sont pas autorisés</p>
                )}

                <label htmlFor="message">Message</label>
                <textarea id="message"
                  {...register("message", {
                  })}
                />

              </fieldset>

              <fieldset>
                <legend>Informations sociétés</legend>
                  
                <label htmlFor="company">Société</label>
                <input type="text" id="company"
                  {...register("company", {
                    required: true,
                    maxLength: 20
                  })}
                />
                {errors?.company?.type === "required" && <p>Ce champ doit être complété</p>}
                {errors?.company?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 20</p>
                )}

                <label htmlFor="activity">Activité</label>
                <input type="text" id="activity"
                  {...register("activity", {
                    required: true,
                    maxLength: 50
                  })}
                />
                {errors?.activity?.type === "required" && <p>Ce champ doit être complété</p>}
                {errors?.activity?.type === "maxLength" && (
                  <p className="error-message">Le nombre de caractéres autorisé est de maximum 50</p>
                )}

                <label htmlFor="website">Site web</label>
                <input type='url' id="website"
                  {...register("website")}
                />

                <label htmlFor="crm">CRM</label>
                <input type='url' id="crm"
                  {...register("crm")}
                />

              </fieldset>

              <fieldset>
                <legend>Adresse et coordonnées</legend>

                <fieldset className="newUserFieldset__adress">

                  <label className="street-number" htmlFor="street-number">
                    <p>N°</p>
                    <input type='number' id="street-number"
                      {...register("street-number",
                        { min: 1, max: 999 }
                      )}
                    />
                  </label>
                  
                  <label className="adress" htmlFor="adress">
                    <p>Rue</p>
                    <input type='text' id="adress"
                      {...register("adress")}
                    />
                  </label>

                  <label className="postcode" htmlFor="postcode">
                    <p>Code postale</p> 
                    <input type='number' id="postcode"
                      {...register("postcode")}
                    />         
                  </label>

                  <label className="city" htmlFor="city">                
                    <p>Ville</p>
                    <input type='text' id="city"
                      {...register("city")}
                    />
                  </label>

                  <label className="country" htmlFor="country">                
                    <p>Pays</p>
                    <input type='text' id="country"
                      {...register("country")}
                    />
                  </label>

                </fieldset>

                
                <label htmlFor="email">Email</label>
                <input type='email' id="email"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors?.email?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.email?.type === "pattern" && (
                  <p className="error-message">L'email doit être valide'</p>
                )}

                <label htmlFor="phone">Téléphone</label>
                <input type='tel' id="phone"
                  {...register("phone", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i
                  })}
                />
                {errors?.phone?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
                {errors?.phone?.type === "pattern" && (
                  <p className="error-message">Le numéro de téléphone doit être valide</p>
                )}

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