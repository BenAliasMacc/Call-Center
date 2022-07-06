import { useState } from "react";
import axios from "../api/axios";
import ContainerHeader from "../components/ContainerHeader";

const DisplayClientsData = ({ client, setClient, clientId, token, booleen }) => {
  
  const [editMode, setEditMode] = useState(booleen);
  const [isModal] = useState(booleen)
  const [changeToSave, setChangeToSave] = useState(false);

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

  const changeValues = (e) => {
    console.log(client);
    setChangeToSave(true);
    setClient({ ...client, [e.target.id]: e.target.value });
  };

  const displayId = !editMode ? (
    id
  ) : (
    <>
      <input
        type="number"
        id="id"
        defaultValue={id}
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
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
        onChange={(e) => changeValues(e)}
      />
    </>
  );

  const handleSubmit = (clients, e) => {
    e.preventDefault();
    const editClientData = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          `/clients/modifyClient/${clientId}`,
          JSON.stringify(clients),
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
            onSubmit={(e) => handleSubmit(e)}
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

            {changeToSave && (
              <div className="clients-card__buttons">
                {!isModal && 
                  <button className="clients-card__buttons__cancel">
                    Annuler
                  </button>                
                }
                <button className="clients-card__buttons__submit">
                  Valider
                </button>
              </div>
            )}
          </form>
        </section>
      )}
    </>
  );
};

export default DisplayClientsData;
