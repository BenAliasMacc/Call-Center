import { useState } from "react";
import { ButtonModel } from "./ButtonModel";
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";
import { AiFillSetting } from "react-icons/ai";

const MessageMenu = ({ client, clientId, showMessage, setShowMessage, showModels, setShowModels, token, modeles, setRefresh, refresh }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [telephoneDest, setTelephoneDest] = useState(0);
    const [mailDest, setMailDest] = useState(0);
    const [txtMessage, setTxtMessage] = useState("");
    const [titleMessage, setTitleMessage] = useState("");
    const [emailDest, setEmailDest] = useState("");
    const [emailsDest, setEmailsDest] = useState([]);
    const [telephonesDest, setTelephonesDest] = useState([]);
    const [txtEmail, setTxtEmail] = useState("");
    const [objectEmail, setObjectEmail] = useState("");
    const [txtModel, setTxtModel] = useState("");
    const [titleModel, setTitleModel] = useState("");
    const [isOpen, setIsOpen] = useState(false);    
    const [modelSelected, setModelSelected] = useState();    
    const emailsEnvoie = client.emailsEnvoie[0] && client.emailsEnvoie[0].replace(" ", "\n").split("\n")
    const telephonesEnvoie = client.telephonesEnvoie[0] && client.telephonesEnvoie[0].replace(" ", "\n").split("\n")

    /* console.log(client);
    console.log(modelSelected);
    console.log(modeles.length); */

    function handleSubmitMessage(e) {
        e.preventDefault();
        
        if (client.telephone.startsWith('972')) {
            setIsLoading(true)

            fetch("https://calldirect.herokuapp.com/api/smsemail/sendSmsIsr", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: "+"+client.telephone,
                    message: txtMessage
                }),
            })
            .then(response => response.json())
            .then(data => {  
                if (data.success === 1) {   
                    setIsLoading(false);     
                    toast.success("Message envoyé")
                }
            })
            .catch(error => {
                toast.error("Le sms n'a pas pu être envoyé")
            })
        } else if (client.telephone.startsWith('33')) {
            console.log('test')
        }
    }

    function handleSubmitEmail(e) {
        setIsLoading(true)
        e.preventDefault();
        
        fetch("https://calldirect.herokuapp.com/api/smsemail/sendEmail", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailDest: emailDest,
                text: txtEmail,
                object: objectEmail
            }),
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false)
            toast.success("Mail envoyé")
        })
        .catch(error => {
            toast.error("Le mail n'a pu être envoyé")
        })
    }

    function handleSubmitModels(index, e) {

        e.preventDefault();
        
        const newModeles = [...modeles];
        newModeles.push({
            title: titleModel,
            modele: txtModel
        }); 

        const newClient = {...client, modeles: newModeles};

        if (titleModel && txtModel !== "") {
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newClient)         
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 1) {
                    toast.success('Modèle enregistré')
                    setRefresh(!refresh);                
                }  
            })
            .catch(error => toast.error('Erreur lors de la validation'))
        }
    }

    function handleDeleteModel(index, e) {

        e.preventDefault()
        console.log(index);

        let newArray = [...modeles];
        newArray.splice(index, 1);

        fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    modeles: newArray
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === 1) {
                    toast.info('Modèle supprimé')
                    setModelSelected()
                    setRefresh(!refresh);       
                } 
            })
            .catch(error => toast.error('Erreur lors de la supression'));
   }

    const handleCloseMessage = () => {
        setModelSelected();
        setShowMessage(false);
    }

    

    const handleCloseModels = () => {
        setShowModels(false)
    }
    
    const handleCloseButtonModel = () => {
        setIsOpen(false);
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
        handleCloseButtonModel()
    }

    console.log(emailsDest)
    console.log(telephonesDest)

    function handleChangeCheckEmails(e) {

        if (e.target.checked) {

            if (!emailsDest.includes(e.target.value)) {
                let copyEmails = [...emailsDest];
                copyEmails.push(e.target.value)
                setEmailsDest(copyEmails) 
            } 
        } else {
            if (emailsDest.includes(e.target.value)) {
                let copyEmails = [...emailsDest];
                let index = copyEmails.indexOf(e.target.value);
                copyEmails.splice(index, 1);
                setEmailsDest(copyEmails)
            }
        }
    }

    function handleChangeCheckTels(e) {

        if (e.target.checked) {

            if (!emailsDest.includes(e.target.value)) {
                let copyEmails = [...telephonesDest];
                copyEmails.push(e.target.value)
                setTelephonesDest(copyEmails) 
            } 
        } else {
            if (emailsDest.includes(e.target.value)) {
                let copyEmails = [...telephonesDest];
                let index = copyEmails.indexOf(e.target.value);
                copyEmails.splice(index, 1);
                setTelephonesDest(copyEmails)
            }
        }
    }

    return (

        <>
            {showMessage &&
                <div className='modalEmail' onClick={handleCloseMessage}>       
                    <form onSubmit={(e) => handleSubmitEmail(e)} className='modal' style={{position: "relative"}} onClick={stopPropagation}>
                        <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseMessage}>X</span>                                     
                        {(modeles && modeles.length !== 0) &&
                            <ButtonModel modeles={modeles} setModelSelected={setModelSelected} isOpen={isOpen} setIsOpen={setIsOpen} />
                        }
                        
                        { (emailsEnvoie && (emailsEnvoie.length > 0 || telephonesEnvoie.length > 0)) &&
                        <>
                            <div>Destinataire</div>
                            <div className="destinataireMessage">
                                {/* {(emailsEnvoie.length > 0 && (client.choixEnvoie === "1" || client.choixEnvoie === "3")) &&
                                    <select name="emailDest">
                                        {emailsEnvoie.map((email, i) => <option key={i} value={email}>{email}</option>)}
                                    </select>
                                } */}
                                {(emailsEnvoie.length > 0 && (client.choixEnvoie === "1" || client.choixEnvoie === "3")) &&
                                    <div name="emailDest"> Emails :
                                        {emailsEnvoie.map((email, i) => {
                                            return (
                                                <div key={i} style={{display: "flex", justifyContent: "flex-start", alignItems: 'center'}}>
                                                    <input type="checkbox" id={`email${i}`} name={`email${i}`} value={email} onChange={(e) => handleChangeCheckEmails(e)}/>
                                                    <label for={`email${i}`}>{email}</label>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {(telephonesEnvoie.length > 0 && (client.choixEnvoie === "2" || client.choixEnvoie === "3")) &&
                                    <div name="telDest"> Téléphones : 
                                        {telephonesEnvoie.map((telephone, i) => {
                                             return (
                                                <div key={i} style={{display: "flex", justifyContent: "flex-start", alignItems: 'center'}}>
                                                    <input type="checkbox" id={`telephone${i}`} name={`telephone${i}`} value={telephone} onChange={(e) => handleChangeCheckTels(e)}/>
                                                    <label for={`telephone${i}`}>{telephone}</label>
                                                </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>                        
                        </>
                        }
                        <label>Objet</label>
                        <input 
                            onChange={(e) => setTitleMessage(e.target.value)} 
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].title : ""}
                        />
                        <label>Message</label>
                        <textarea 
                            onChange={(e) => setTxtMessage(e.target.value)}
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].modele : ""}
                        />
                        <button className="btnSms">
                        {isLoading ?
                            <TailSpin color="white" height={32} width={32} /> 
                            :
                            <p>Envoyer</p>
                        }
                        </button>
                    </form>
                </div>
            }

            {showModels &&
                <div className='modalEmail' onClick={handleCloseModels}>                    
                <form onSubmit={(e)=>handleSubmitModels(modelSelected, e)} style={{position: "relative"}} className='modal' onClick={stopPropagation}>
                    <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseModels}>X</span>  
                    {modeles.length > 0 &&
                        <ButtonModel modeles={modeles} setModelSelected={setModelSelected} isOpen={isOpen} setIsOpen={setIsOpen} />
                    }            
                    <label>Titre</label>
                    <input 
                        onChange={(e) => setTitleModel(e.target.value)}
                        defaultValue={modelSelected !== undefined ? modeles[modelSelected].title : ""}
                    />                        
                    <label>Modèle</label>
                    <textarea                    
                        onChange={(e) => setTxtModel(e.target.value)}
                        defaultValue={modelSelected !== undefined ? modeles[modelSelected].modele : ""} 
                    />
                    <div className="buttons-Model">
                        <button className="btnSms">Sauvegarder</button>
                        {modelSelected !== undefined && <button onClick={(e) => handleDeleteModel(modelSelected, e)} className="btnSms-delete">Supprimer</button>}                            
                    </div>
                </form>
            </div>
            } 

        
            {/* {
                isOpenMessage &&
                <div className='modalMessage' onClick={handleCloseModals} >
                    <form onSubmit={(e) => handleSubmitMessage(e)} style={{position: "relative"}} className='modal' onClick={stopPropagation}>
                    <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseModals}>X</span>             
                        <label>Message</label>
                        <textarea onChange={(e) => setTxtMessage(e.target.value)}/>
                        <button className="btnSms">
                        {isLoading ?
                            <TailSpin color="white" height={32} width={32} /> 
                            :
                            <p>Envoyer</p>
                        }
                        </button>                        
                    </form>
                </div>
            }

            {
                isOpenEmail &&
                <div className='modalEmail' onClick={handleCloseModals}>       
                    <form onSubmit={(e) => handleSubmitEmail(e)} className='modal' style={{position: "relative"}} onClick={stopPropagation}>
                        <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseModals}>X</span>              
                        <ButtonModel modeles={modeles} setModelSelected={setModelSelected} isOpen={isOpen} setIsOpen={setIsOpen} />
                        <label>Objet</label>
                        <input 
                            onChange={(e) => setObjectEmail(e.target.value)} 
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].title : ""}
                        />
                        <label>Message</label>
                        <textarea 
                            onChange={(e) => setTxtEmail(e.target.value)}
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].modele : ""}
                        />
                        <button className="btnSms">
                        {isLoading ?
                            <TailSpin color="white" height={32} width={32} /> 
                            :
                            <p>Envoyer</p>
                        }
                        </button>
                    </form>
                </div>
            }           

            {
                isOpenModels &&
                <div className='modalEmail' onClick={handleCloseModals}>                    
                    <form onSubmit={(e)=>handleSubmitModels(modelSelected, e)} style={{position: "relative"}} className='modal' onClick={stopPropagation}>
                        <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseModals}>X</span>
                        <ButtonModel modeles={modeles} setModelSelected={setModelSelected} isOpen={isOpen} setIsOpen={setIsOpen} />            
                        <label>Titre</label>
                        <input 
                            onChange={(e) => setTitleModel(e.target.value)}
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].title : ""}
                        />                        
                        <label>Modèle</label>
                        <textarea 
                            onChange={(e) => setTxtModel(e.target.value)}
                            defaultValue={modelSelected !== undefined ? modeles[modelSelected].title : ""}
                        />
                        <div className="buttons-Model">
                            <button className="btnSms">Sauvegarder</button>
                            {modelSelected !== undefined && <button onClick={(e) => handleDeleteModel(modelSelected, e)} className="btnSms-delete">Supprimer</button>}                            
                        </div>
                    </form>
                </div>
            }             */}
        </>
    );
};

export default MessageMenu;