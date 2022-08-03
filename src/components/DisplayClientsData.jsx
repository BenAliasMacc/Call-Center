import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "../api/axios";
import { AiOutlineMessage } from "react-icons/ai";
import { FaInternetExplorer } from 'react-icons/fa';
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";
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
  
  const [editMode, setEditMode] = useState(booleen);
  const [isModal] = useState(booleen);
  const [isLoading, setIsLoading] = useState(false);
  const [showNavMessage, setShowNavMessage] = useState(false);

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
    langue,
    modeles
  } = client !== undefined && client;

  const ROLES = {
    'User': "0",
    'Admin': "1"
  } 

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
  const displayConsignes = !editMode ? (
    <div className="textZone textZone-consignes width100">
        {consignes.map((consigne, index) => <p key={index} style={{whiteSpace: "pre-line"}}>{consigne}</p>)}
    </div>        
  ) : (
    <textarea
      className="textZone textZone-consignes width100"
      id="consignes"
      defaultValue={consignes}
      rows="20"
      {...register("consignes")}
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
        setEditClientsModal(false);        
        setRefresh(!refresh);
        setEditMode(false);      
        setIsLoading(false);
      } catch (err) {
        console.log();
      } 
    };

    editClientData();
  };

  const handleNavMessage = () => {
    setShowNavMessage(!showNavMessage);
  };

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <section className="display-clients-data" onClick={handleCloseModal}>        
        {client !== undefined && <div className="globalContainer width100">           

            <header className='headerClient' onClick={stopPropagation}>

                <div className="flex containerIcons width30" >
                    <div className="flex containerIcon" >
                        <AiOutlineMessage className="icon" onClick={handleNavMessage}/>
                        <MessageMenu client={client} setClient={setClient}  modeles={modeles} showNavMessage={showNavMessage} setShowNavMessage={setShowNavMessage} token={token} />
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
                        <EditButton editMode={editMode} setEditMode={setEditMode} />
                        <DeleteButton clientId={clientId} />
                      </div>
                    }                   
                  </>

                }
                <div className="headerClient__input-container" style={{}}>
                  <div className="flex headerSide" >
                      <ul className="width50">
                          <li><b>Id :</b> {displayId}</li>
                          <li className="mt5"><b>Nom complet :</b> {displayPrenom} {displayNom}</li>
                          <li className="mt5"><b>Adresse : </b>{displayAdresse}</li>
                      </ul>                  
                      <ul>
                          <li><b>Téléphone:</b> {displayTelephone}</li>
                          <li className="mt5"><b>@ : </b>{displayMail}</li>
                      </ul>
                  </div>
                  <div className="flex headerSide">
                      <ul className="width50">
                          <li><b>Société :</b> {displaySociete}</li>
                          <li className="mt5"><b>Site : </b>{displaySite}</li>
                      </ul>
                      <ul>
                          <li><b>Activité :</b> {displayActivite}</li>
                          <li className="mt5"><b>Langue : </b>{displayLangue}</li>
                      </ul>
                  </div>
                </div>

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
                      {displayConsignes}
                </div>
              }

                
              </form>
            </header>

            {!isModal && <NotesEtConsignes editMode={editMode} clientId={clientId} token={token} client={client} refresh={refresh} setRefresh={setRefresh}/>}    

        </div>}

        {deleteClientsModal === true && 
          <DeleteClientsModal clientId={clientId} />
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