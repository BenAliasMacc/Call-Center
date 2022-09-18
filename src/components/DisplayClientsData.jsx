import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "../api/axios";
import { AiFillSetting, AiOutlineMessage } from "react-icons/ai";
import { FaInternetExplorer } from 'react-icons/fa';
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';
import '../styles/styles.css';
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import DeleteClientsModal from "./DeleteClientsModal";
import NotesEtConsignes from "./NotesEtConsignes";
import MessageMenu from "./MessageMenu";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const DisplayClientsData = ({ client, setClient, clientId, token, booleen, setRefresh, refresh }) => {
  
  const userRole = localStorage.getItem("userRole");
  const { deleteClientsModal, setEditClientsModal, auth, setAuth } = useAuth();
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  const {
    nom,
    prenom,
    id,
    societe,
    activite,
    adresse,
    mail,
    telephone,
    site,
    crm,
    consignes,
    consignesOut,
    langue,
    modeles,
    emailsEnvoie,
    telephonesEnvoie,
    choixEnvoie
  } = client !== undefined && client;
  
  const [editMode, setEditMode] = useState(booleen);
  const [isModal] = useState(booleen);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [selected, setSelected] = useState(choixEnvoie);

  const ROLES = {
    'User': "0",
    'Admin': "1"
  };

  const displayPrenom = !editMode ? (
    prenom
  ) : (
    <>
      <input
        className="headerClient__input"
        style={{marginBottom: "5px"}}
        type="text"
        id="prenom"
        defaultValue={prenom}
        {...register("prenom")}
      />
    </>
  );
  const displayNom = !editMode ? (
    nom
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="nom"
        defaultValue={nom}
        {...register("nom")}
      />
    </>
  );  
  const displayId = !editMode ? (
    id
  ) : (
    <>
      <input
        className="headerClient__input"
        type="number"
        id="id"
        defaultValue={id}
        {...register("id")}
      />
    </>
  );
  const displaySociete = !editMode ? (
    societe
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="societe"
        defaultValue={societe}
        {...register("societe")}
      />
    </>
  );
  const displayLangue = !editMode ? (
    langue
  ) : ( 
    <>
      <input
        className="headerClient__input"
        type="text"
        id="langue"
        defaultValue={langue}
        {...register("langue")}
      />
    </>
 ); 
  const displayActivite = !editMode ? (
    activite
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="activite"
        defaultValue={activite}
        {...register("activite")}
      />
    </>
  );
  const displayTelephone = !editMode ? (
    telephone
  ) : (
    <>
      <Controller
      control={control}
      name="telephone"
      rules={{ required: true }}
      defaultValue={telephone}
      render={({ field: { ref, ...field } }) => (
          <PhoneInput
          {...field}
          inputExtraProps={{
              ref,
              required: true,
              autoFocus: true              
          }}          
          country={"il"}
          onlyCountries={["il", "fr"]}
          countryCodeEditable={false}
          />
      )}
      />
      {errors?.telephone?.type === "required" && <p className="error-message">Ce champ doit être complété</p>}
    </>
  );
  const displaySite = !editMode ? (
    site
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="site"
        defaultValue={site}
        {...register("site")}
      />
    </>
  );
  const displayMail = !editMode ? (
    mail
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="mail"
        defaultValue={mail}
        {...register("mail")}
      />
    </>
  );
  const displayCrm = !editMode ? (
    crm
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="crm"
        defaultValue={crm}
        {...register("crm")}
      />
    </>
  );
  const displayAdresse = !editMode ? (
    adresse
  ) : (
    <>
      <input
        className="headerClient__input"
        type="text"
        id="adresse"
        defaultValue={adresse}
        {...register("adresse")}
      />
    </>
  );
  const displayEmailsEnvoie = !editMode ? (
    <div>{emailsEnvoie[0] && emailsEnvoie[0].split("\n").map((elt, i) => <p key={i} style={{whiteSpace: "pre-line"}}>{elt}</p>)}</div>    
  ) : (
    <>
      <textarea
        className="headerClient__input"
        type="text"
        id="emailsEnvoie"
        defaultValue={emailsEnvoie}
        {...register("emailsEnvoie")}
      />
    </>
  );
  const displayTelephonesEnvoie = !editMode ? (
    <div>{telephonesEnvoie[0] && telephonesEnvoie[0].split("\n").map((elt, i) => <p key={i} style={{whiteSpace: "pre-line"}}>{elt}</p>)}</div>
  ) : (
    <>
      <textarea
        className="headerClient__input"
        type="text"
        id="telephonesEnvoie"
        defaultValue={telephonesEnvoie}
        {...register("telephonesEnvoie")}
      />
    </>
  );
  const displayChoixEnvoie = !editMode ? (
    choixEnvoie === "1" ? "Email" : 
      (choixEnvoie === "2" ? "Téléphone" :
      (choixEnvoie === "3" ? "Email et téléphone" : ""))
  ) : ( 
    <>
      <div className="inputRadio__item">
        <label htmlFor="byMail">Email</label>
        <input 
          type="radio" value="1" id="byMail" name='choixEnvoie'
          {...register("choixEnvoie", {
          required: true})}    
        />
      </div>
      <div className="inputRadio__item">
        <label htmlFor="byTel">Téléphone</label>
        <input 
          type="radio" value="2" id="byTel" 
          {...register("choixEnvoie", {
          required: true})}                    
        />                        
      </div>
      <div className="inputRadio__item">
        <label htmlFor="both" style={{width: '66px'}}>Les deux</label>
        <input 
          style={{width: '13px'}}
          type="radio" value="3" id="byTel" 
          {...register("choixEnvoie", {
          required: true})}
        />                        
       </div>
       {errors?.choixEnvoie && <span style={{color: 'red'}}> Le champ "Type d'envoi" doit être complété</span>}                         
    </>
);

  const displayConsignes = !editMode ? (
    <div className="textZone-consignes width100">
        {consignes.map((consigne, index) => <p key={index} style={{whiteSpace: "pre-line"}}>{consigne}</p>)}
    </div>        
  ) : (
    <textarea
      className="textZone-consignes width100"
      id="consignes"
      defaultValue={consignes}
      rows="20"
      {...register("consignes")}
    >
    </textarea>
  );

  const displayConsignesOut = !editMode ? (
    <div className="textZone-consignes width100" >
        {consignesOut.map((consigne, index) => <p key={index} style={{whiteSpace: "pre-line"}}>{consigne}</p>)}
    </div>        
  ) : (
    <textarea
      className="textZone-consignes width100"
      id="consignes"
      defaultValue={consignesOut}
      rows="20"
      {...register("consignesOut")}
    >
    </textarea>
  );

  const handleCancelButton = (e) => {
    e.preventDefault();    
    setEditMode(!editMode);
  };

  const handleCloseModal = () => {
    setEditClientsModal(false);
    setAuth({...auth, clientId: undefined})
  }

  const onSubmit = data => {

    setIsLoading(true);
    const editClientData = async () => {

      try {
        const response = await axios.put(
          `/clients/modifyClient/${clientId}`,
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
        toast.success('Modifications enregistré')
        setEditClientsModal(false);        
        setRefresh(!refresh);
        setEditMode(false);      
        setIsLoading(false);
      } catch (err) {
        toast.error('Erreur lors de la validation')
      } 
    };

    editClientData();
  };

  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const handleModels = () => {
    setShowModels(true)
}

  const stopPropagation = (e) => {
    e.stopPropagation()
  }  

  return (
    <section className="display-clients-data" onClick={handleCloseModal}>        
        {client !== undefined && <div className="globalContainer width100">           

            <header className='headerClient' onClick={stopPropagation}>

                <div className="flex containerIcons" >
                    <div className="flex containerIcon" >
                        <AiOutlineMessage className="icon" onClick={handleMessage}/>
                        <MessageMenu refresh={refresh} setRefresh={setRefresh} client={client} setClient={setClient} clientId={clientId} modeles={modeles} showMessage={showMessage} setShowMessage={setShowMessage} showModels={showModels} setShowModels={setShowModels} token={token} />
                    </div>
                    <div className="flex containerIcon" >
                        <a href={site} rel="noreferrer" target="_blank">
                            <FaInternetExplorer className="icon" />
                        </a>
                    </div>
                </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {isModal ? 
                  <button className="headerClient__close-button" onClick={handleCloseModal} style={{fontSize: "1.5rem"}}>X</button> 
                  :
                  <>
                    { userRole === ROLES.Admin &&
                      <div className="display-clients-data__buttons-top">
                        {!editMode && <AiFillSetting style={{color: "grey", width: "30px", height: "30px", cursor: "pointer", marginRight: "0.5rem"}} onClick={handleModels} /> }
                        <EditButton editMode={editMode} setEditMode={setEditMode} />
                        <DeleteButton clientId={client.id} />
                      </div>
                    }                   
                  </>

                }
                <div className="headerClient__input-container">
                      <ul className="listeInfosClient">
                          <li><b>Id :</b> {displayId}</li>
                          <li className="mt5"><b>Nom complet :</b> {displayPrenom} {displayNom}</li>
                          <li className="mt5"><b>Adresse : </b>{displayAdresse}</li>
                          { editMode && <li className="mt5"><b>Langue : </b>{displayLangue}</li> }
                      </ul>                  
                      <ul className="listeInfosClient">
                          <li><b>Société :</b> {displaySociete}</li>
                          <li className="mt5"><b>Site : </b>{displaySite}</li>
                          <li className="mt5"><b>CRM : </b>{displayCrm}</li>
                          <li className="mt5"><b>Activité :</b> {displayActivite}</li>                                              
                      </ul>
                      <ul className="listeInfosClient">
                        <li><b>Tel client:</b> {displayTelephone}</li>      
                        { editMode && <li className="mt5"><b>Tels contacts:</b> {displayTelephonesEnvoie}</li> }
                      </ul>
                      <ul className="listeInfosClient">
                        <li><b>Mail client : </b>{displayMail}</li>
                       { editMode && <li className="mt5"><b>Mails contacts : </b>{displayEmailsEnvoie}</li> }                     
                      </ul>
                  </div>
                  { editMode && <div className="inputRadio"><b>Type d'envoi :</b> {displayChoixEnvoie}</div> }

                {editMode && (
                  <div className="clients-card__buttons">
                    {!isModal &&
                      <button onClick={handleCancelButton} className="clients-card__buttons__cancel">
                        Annuler
                      </button>             
                    }
                    
                    <button className="clients-card__buttons__submit">
                      Valider
                    </button>
                  </div>
                )}
              {!isModal && 
                <div className="containerColonne colonne-consignes"> 
                      <u>CONSIGNES :</u>
                      <div className="container-consignes">
                        {displayConsignes}
                        {displayConsignesOut}
                      </div>
                </div>
              }
              </form>
            </header>

            {!isModal && <NotesEtConsignes editMode={editMode} clientId={clientId} token={token} client={client} refresh={refresh} setRefresh={setRefresh}/>}
        </div>}

        {deleteClientsModal === true && 
          <DeleteClientsModal clientId={client._id} setRefresh={setRefresh} />
        }

        { isLoading && 
          <div className='containerLoader'>
            <Loader />
          </div>
        }
    </section>
  );
};

export default DisplayClientsData;