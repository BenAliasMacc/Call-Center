import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useForm } from "react-hook-form";
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

    const changeValues = (e) => {
        console.log(client);
        setClient({...client, [e.target.id]: e.target.value})
    }

    const displayId = !editMode ? (id) : (
        <>
            <input type="number" id="id" defaultValue={id} onChange={e => changeValues(e)} />
        </>
    );
    const displaySociete= !editMode ? (societe) : (
        <>
            <input type="text" id="societe" defaultValue={societe} onChange={e => changeValues(e)} />
        </>
    );
    const displayLangue= !editMode ? (langue) : (
        <>
            <input type="text" id="langue" defaultValue={langue} onChange={e => changeValues(e)} />
        </>
    );
    const displayActivite= !editMode ? (activite) : (
        <>
            <input type="text" id="activite" defaultValue={activite} onChange={e => changeValues(e)} />
        </>
    );
    const displayTelephone= !editMode ? (telephone) : (
        <>
            <input type="text" id="telephone" defaultValue={telephone} onChange={e => changeValues(e)} />
        </>
    );
    const displaySite= !editMode ? (site) : (
        <>
            <input type="text" id="site" defaultValue={site} onChange={e => changeValues(e)} />
        </>
    );
    const displayMail= !editMode ? (mail) : (
        <>
            <input type="text" id="mail" defaultValue={mail} onChange={e => changeValues(e)} />
        </>
    );
    const displayCrm= !editMode ? (crm) : (
        <>
            <input type="text" id="crm" defaultValue={crm} onChange={e => changeValues(e)} />
        </>
    );
    const displayAdresse= !editMode ? (adresse) : (
        <>
            <input type="text" id="adresse" defaultValue={adresse} onChange={e => changeValues(e)} />
        </>
    );

    const handleSubmit = (clients, e) => {
        e.preventDefault();
        const editClientData = async(e) => {
            e.preventDefault();
            try {
                const response = await axios.put(`/clients/modifyClient/${clientId}`,
                JSON.stringify(clients),
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
    
        editClientData()
    };


    return (

        <>
            <Header />

            {client !== undefined &&            
                <section className="clients-card">
                    <ContainerHeader name={nom} firstname={prenom} clientId={clientId} />
                    <form onSubmit={e => handleSubmit(e)} className="clients-card--container">
                        <table>
                            <tbody>
                                <tr className="odd">
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Identifiant:
                                    </td>
                                    <td>{displayId}</td>
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Société:</td>
                                    <td>{displaySociete}</td>
                                </tr>
                                <tr className="even">
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Language:</td>
                                    <td>{displayLangue}</td>
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Activité</td>
                                    <td>{displayActivite}</td>
                                </tr>
                                <tr className="odd">
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Téléphone:</td>
                                    <td>{displayTelephone}</td>
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Site web:</td>
                                    <td>
                                        {!editMode ? 
                                                (<a href={site} rel="noreferrer" target="_blank" >{displaySite}</a>)
                                            :
                                                (<>{displaySite}</>)
                                        }
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Adresse mail:</td>
                                    <td>
                                        {!editMode ? 
                                                (<a href={mail} rel="noreferrer" target="_blank" >{displayMail}</a>)
                                            :
                                                (<>{displayMail}</>)
                                        }
                                    </td>
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        CRM:</td>
                                    <td>
                                        {!editMode ? 
                                                (<a href={crm} rel="noreferrer" target="_blank" >{displayCrm}</a>)
                                            :
                                                (<>{displayCrm}</>)
                                        }
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td className="first">
                                        <EditButton editMode={editMode} setEditMode={setEditMode} client={client} setClient={setClient}/>
                                        Adresse postale:</td>
                                    <td>{displayAdresse}</td>
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

                            <button className='button-submit'>Valider</button>
                        </form>
                </section>
            }
        </>
    )
}

export default ClientsCard