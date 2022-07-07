import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";
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

  const displayId = !editMode ? (
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
  );

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
      {client !== undefined && (
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
      )}
    </>
  );
};

export default DisplayClientsData;
