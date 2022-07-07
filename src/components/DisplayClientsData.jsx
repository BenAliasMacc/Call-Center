import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
import { AiOutlineMessage } from "react-icons/ai";
import { FaInternetExplorer } from 'react-icons/fa';
import ContainerHeader from "../components/ContainerHeader";
import Loader from '../components/Loader';
import useAuth from "../hooks/useAuth";

const DisplayClientsData = ({ client, clientId, token, booleen }) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  
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

  /* const displayId = !editMode ? (
    id
  ) : (
    <>
      <input
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
        type="text"
        id="adresse"
        defaultValue={adresse}
        {...register("adresse")}
      />
    </>
  ); */

  const handleCancelButton = (e) => {
    e.preventDefault();    
    setEditMode(!editMode);    
  };

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
        window.location.reload();
        setIsLoading(false);
      } catch (err) {
        console.log();
      }
    };

    editClientData();
  };

  return (
    <>
        <div style={{width: "100vw", padding: "20px 60px", marginBottom: "40px", overflowY: "scroll"}}>
            <div style={{display: 'flex', justifyContent: "center", alignItems: "center", gap: "20px", width: "100%", height: "140px"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "100px", height: "100px", border: "4px solid #F2A965", color: "rgb(13, 186, 216)", cursor: "pointer"}}>
                    <AiOutlineMessage style={{width: "80px", height: "80px",}}/>
                </div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", width: "100px", height: "100px", border: "4px solid #F2A965", color: "rgb(13, 186, 216)", cursor: "pointer"}}>
                    <FaInternetExplorer style={{width: "80px", height: "80px",}}/>
                </div>
            </div>
            <header style={{display: "flex", width: "100%", height: "120px", backgroundColor: "rgba(13, 186, 216, 0.2)", boxShadow: "0 0 8px #ccc", borderRadius: "10px 10px 0 0"/* , border: "2px solid #F2A965" */}}>
                <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', width: "50%", padding: "15px", }}>
                <ul style={{width: "50%"}}>
                        <li><b>Id :</b> {id}</li>
                        <li style={{marginTop: "5px"}}><b>Nom complet :</b> {nom}{prenom}</li>
                        <li style={{marginTop: "5px"}}><b>Adresse : </b>{adresse}</li>
                    </ul>
                    <ul>
                        <li><b>Téléphone:</b> {telephone}</li>
                        <li style={{marginTop: "5px"}}><b>@ : </b>{mail}</li>
                    </ul>
                </div>
                <div style={{display: 'flex', justifyContent: "center", alignItems: 'center', width: "50%", padding: "15px"}}>
                    <ul style={{width: "50%"}}>
                        <li><b>Société :</b> {societe}</li>
                        <li style={{marginTop: "5px"}}><b>Site : </b>{site}</li>
                    </ul>
                    <ul>
                        <li><b>Activité :</b> {activite}</li>
                        <li style={{marginTop: "5px"}}><b>Langue : </b>{langue}</li>
                    </ul>
                </div>
            </header>
            <div style={{display: 'flex', width: "100%", minHeight: "450px", overFlow: "scroll"}}>
                <div style={{position: "relative", width: "50%", borderRadius: "0 0 0 10px", backgroundColor: "rgba(242, 169, 101, 0.2)", boxShadow: "0 0 8px #ccc", padding: "20px 40px", textAlign: 'center',  overflowY: "scroll"}}> 
                    <u>NOTES :</u> 
                    <div style={{width: "100%", padding: "10px", marginTop: "10px", height: "80%", border: "1px solid black"}}>
                        TEXT
                    </div>
                    <div style={{position: "absolute", bottom: "20px", display: 'flex', width: "90%"}}>
                        <input type="text" />
                        <button style={{borderRadius: "5px", backgroundColor: "rgb(13, 186, 216)", textDecoration: "none"}}>Envoyer</button> 
                    </div>
                </div>
                <div style={{width: "50%", borderRadius: "0 0 0 10px", backgroundColor: "rgba(242, 169, 101, 0.2)", boxShadow: "0 0 8px #ccc", padding: "20px 40px", textAlign: 'center', textDecoration: "underline",  overflowY: "scroll"}}> 
                    <u>CONSIGNES :</u> 
                    <div style={{width: "100%", padding: "10px", marginTop: "10px", height: "80%", border: "1px solid black"}}>
                        TEXT
                    </div>
                </div>
            </div>
        </div>
      {/* {client !== undefined && (
        <section className="clients-card">
          <ContainerHeader
            name={nom}
            firstname={prenom}
            clientId={clientId}
            editMode={editMode}
            setEditMode={setEditMode}
            isModal={booleen}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="clients-card--container"
          >
            <table>
              <tbody>
                <tr className="odd">
                  <td className="first">Identifiant:</td>
                  <td>{displayId}</td>

                  <td className="first">Société:</td>
                  <td>{displaySociete}</td>
                </tr>
                <tr className="even">
                  <td className="first">Language:</td>
                  <td>{displayLangue}</td>
                  <td className="first">Activité</td>
                  <td>{displayActivite}</td>
                </tr>
                <tr className="odd">
                  <td className="first">Téléphone:</td>
                  <td>{displayTelephone}</td>
                  <td className="first">Site web:</td>
                  <td>
                    {!editMode ? (
                      <a href={site} rel="noreferrer" target="_blank">
                        {displaySite}
                      </a>
                    ) : (
                      <>{displaySite}</>
                    )}
                  </td>
                </tr>
                <tr className="even">
                  <td className="first">Adresse mail:</td>
                  <td>
                    {!editMode ? (
                      <a href={mail} rel="noreferrer" target="_blank">
                        {displayMail}
                      </a>
                    ) : (
                      <>{displayMail}</>
                    )}
                  </td>
                  <td className="first">CRM:</td>
                  <td>
                    {!editMode ? (
                      <a href={crm} rel="noreferrer" target="_blank">
                        {displayCrm}
                      </a>
                    ) : (
                      <>{displayCrm}</>
                    )}
                  </td>
                </tr>
                <tr className="odd">
                  <td className="first">Adresse postale:</td>
                  <td>{displayAdresse}</td>
                  <td className="first">Consignes:</td>
                  <td>
                    <ul>
                      {consignes !== undefined &&
                        consignes.map((consigne, index) => (
                          <li key={index}>{consigne}</li>
                        ))}
                    </ul>
                  </td>
                </tr>
                <tr className="even">
                  <td className="first">Notes:</td>
                  <td>
                    <ul>
                      {notes !== undefined &&
                        notes.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                  </td>
                  <td className="first"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

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

          { isLoading && 
            <div className='containerLoader'>
              <Loader />
            </div>
          }

        </section>
      )} */}
    </>
  );
};

export default DisplayClientsData;
