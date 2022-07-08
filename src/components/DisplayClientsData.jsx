import { useState } from "react";
import { useForm } from "react-hook-form";
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

const DisplayClientsData = ({ client, clientId, token, booleen, setRefresh, refresh }) => {
  
  const { deleteClientsModal, setEditClientsModal, auth, setAuth } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [editMode, setEditMode] = useState(booleen);
  const [isModal] = useState(booleen);
  const [isLoading, setIsLoading] = useState(false);

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
    notes,
    langue
  } = client !== undefined && client;

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
      <input
        className="headerClient__input"
        type="text"
        id="telephone"
        defaultValue={telephone}
        {...register("telephone")}
      />
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

      console.log(data);

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
        window.location.reload();
        setEditMode(false)        
        setIsLoading(false);
      } catch (err) {
        console.log();
      }
    };

    editClientData();
  };

  return (
    <section className="display-clients-data">        
        <div className="globalContainer width100" onSubmit={handleSubmit(onSubmit)}>           
          
            <div className="flex containerIcons width100" >
                <div className="flex containerIcon" >
                  <a href={crm} rel="noreferrer" target="_blank">
                    <AiOutlineMessage className="icon" />
                  </a>
                </div>
                <div className="flex containerIcon" >
                  <a href={site} rel="noreferrer" target="_blank">
                    <FaInternetExplorer className="icon" />
                  </a>
                </div>
            </div>

            <header className='headerClient'>
              <form>
                {/* {isModal ? 
                  <button className="headerClient__close-button" onClick={handleCloseModal} style={{fontSize: "1.5rem"}}>X</button> 
                  : */}
                  <div className="display-clients-data__buttons-top">
                    <EditButton editMode={editMode} setEditMode={setEditMode} />
                    <DeleteButton clientId={clientId} />
                  </div>    
                {/* } */}
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
              </form>
            </header>

            <NotesEtConsignes clientId={clientId} token={token} client={client} />        
        </div>

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
