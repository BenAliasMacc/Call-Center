import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import ContainerHeader from "../components/ContainerHeader";
import EditButton from "../components/EditButton";
import Header from "../components/Header"


const ClientsCard = () => {

    const clientId = useParams().id
    const token = localStorage.getItem('token');
    const [client, setClient] = useState();
    const [editMode, setEditMode] = useState(false);

    console.log(editMode);

    useEffect(() => {

        const getClients = async() => {

            try {
                const response = await axios.get(`/clients/getClient/${clientId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json, text/plain,'
                    },
                    // withCredentials: true
                }
                );
                console.log(response.data);
                setClient(response.data)                
            } catch (err) {

            }
        } ;

        getClients()
       
    }, [])

    const { nom, prenom, id, societe, activite, adresse, mail, telephone, site, crm, consignes, notes, langue } = client !== undefined && client

    const handleTest = () => {
        setClient({...client, nom: "test"})
    }

    console.log(client);

    return (

        <>
            <Header />

            {client !== undefined &&            
                <section className="clients-card">
                    <ContainerHeader name={nom} firstname={prenom} clientId={clientId} />
                    <div className="clients-card--container">
                        <button onClick={handleTest}>Test</button>
                        <table>
                            <tbody>
                                <tr className="odd">
                                    <td className="first"><EditButton editMode={editMode} setEditMode={setEditMode} />Identifiant:</td>
                                    <td>{id}</td>
                                    <td className="first">Société:</td>
                                    <td>{societe}</td>
                                </tr>
                                <tr className="even">
                                    <td className="first">Language:</td>
                                    <td>{langue}</td>
                                    <td className="first">Activité</td>
                                    <td>{activite}</td>
                                </tr>
                                <tr className="odd">
                                    <td className="first">Téléphone:</td>
                                    <td>{telephone}</td>
                                    <td className="first">Site web:</td>
                                    <td><a href={site} rel="noreferrer" target="_blank" >{site}</a></td>
                                </tr>
                                <tr className="even">
                                    <td className="first">Adresse mail:</td>
                                    <td><a href={mail} rel="noreferrer" target="_blank" >{mail}</a></td>
                                    <td className="first">CRM:</td>
                                    <td><a href={crm} rel="noreferrer" target="_blank" >{crm}</a></td>
                                </tr>
                                <tr className="odd">
                                    <td className="first">Adresse postale:</td>
                                    <td>{adresse}</td>
                                    <td className="first">Consignes:</td>
                                    <td><ul>{consignes !== undefined && consignes.map((consigne, index) => <li key={index}>{consigne}</li>)}</ul></td>
                                </tr>
                                <tr className="even">
                                    <td className="first">Notes:</td>
                                    <td><ul>{notes !== undefined && notes.map((note, index) => <li key={index}>{note}</li>)}</ul></td>
                                    <td className="first"></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                </section>
            }
        </>
    )
}

export default ClientsCard

                        // <p>Société : {societe}</p>
                        // <p>Activité : {activite}</p>
                        // <p>Adresse postale : {adresse}</p>
                        // <div>
                        //     <p>Adresse mail : {mail}</p>
                        //     <EditButton editMode={editMode} setEditMode={setEditMode} />
                        // </div>
                        // <p>Téléphone : {telephone}</p>
                        // <p>Site web : {site}</p>
                        // <p>CRM : {crm}</p>
                        // <p>Consignes : {consignes}</p>
                        // <p>Notes : {notes}</p>