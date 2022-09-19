import React, { useState, useEffect } from "react";
import arrow from "../assets/icons/down-arrow.svg"
import { ButtonModel } from "./ButtonModel";
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";

const MessageMenu = ({ client, clientId, showMessage, setShowMessage, showModels, setShowModels, token, modeles, setRefresh, refresh }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [showListEmails, setShowListEmails] = useState(false);
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
    const [modelSelected, setModelSelected] = useState(0);  
    const [titleModelSelected, setTitleModelSelected] = useState('');
    const [bodyModelSelected, setBodyModelSelected] = useState('');
    let emailsEnvoie = client.emailsEnvoie[0] && client.emailsEnvoie[0].replace(" ", "\n").split("\n");
    let telephonesEnvoie = client.telephonesEnvoie[0] && client.telephonesEnvoie[0].replace(" ", "\n").split("\n");
    const [newModel, setNewModel] = useState(false);
    const [newModelTitle, setNewModelTitle] = useState("");
    const [newModelBody, setNewModelBody] = useState("");

    function cleanTableauOfEmailsOrTels(emails, tels) {
        let newEmails = [];
        let newTels = [];

        if (emails) {
            for (let i = 0; i < emails.length; i++) {
                if (emails[i].length > 5) {
                    newEmails.push(emails[i]);
                }
            }
        }

        if (tels) {
            for (let i = 0; i < tels.length; i++) {
                if (tels[i].length > 5) {
                    newTels.push(tels[i]);
                }
            }
        }
        
        emailsEnvoie = newEmails;
        telephonesEnvoie = newTels;

        if (emails) {
            if (emailsDest.length == 0 && emails.length < 2) {
                setEmailsDest(emailsEnvoie);
            };
        }

        if (tels) {
            if (telephonesDest.length == 0 && tels.length < 2) {
                setTelephonesDest(telephonesEnvoie);
            };
        }

    }   

    cleanTableauOfEmailsOrTels(emailsEnvoie, telephonesEnvoie);    
    
    useEffect(() => {

        modeles.length > 0 && setTitleModelSelected(modeles[modelSelected]?.title);
        modeles.length > 0 && setBodyModelSelected(modeles[modelSelected]?.modele);

    }, [modelSelected])

    useEffect(() => {
        setEmailsDest([]);
        setTelephonesDest([]);
    }, [showMessage])

    function handleSubmitMessage(e) {

        e.preventDefault();

        setIsLoading(true);

        if (client.choixEnvoie == '3') {

            if (telephonesDest.length == 0 && emailsDest.length == 0) {
                toast.error("Aucun destinataire renseigné")
                setIsLoading(false);
            }

            for (let i = 0; i < emailsDest.length; i++) {
                handleSubmitEmail(emailsDest[i]);
            };

            for (let i = 0; i < telephonesDest.length; i++) {
                console.log('test')
                handleSubmitTextos(telephonesDest[i]);
            };

        } else if (client.choixEnvoie == '2') {

            if (telephonesDest.length == 0) {
                toast.error("Aucun numéro de téléphone renseigné")
                setIsLoading(false);
            } else {

                for (let i = 0; i < telephonesDest.length; i++) {
                    handleSubmitTextos(telephonesDest[i]);
                };
            }
        } else {

            if (emailsDest.length == 0) {
                toast.error("Aucun email renseigné")
                setIsLoading(false);
            } else {

                for (let i = 0; i < emailsDest.length; i++) {
                    handleSubmitEmail(emailsDest[i]);
                };
            } 
        }
    }

    function handleSubmitTextos(tel) {

        if (tel.startsWith('+972')) {
            setIsLoading(true)

            fetch("https://calldirect.herokuapp.com/api/smsemail/sendSmsIsr", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    number: tel,
                    message: bodyModelSelected || 'VIP ISRAEL'
                }),
            })
            .then(response => response.json())
            .then(data => {  
                if (data.success === 1) {   
                    setIsLoading(false);     
                    toast.success("Message envoyé");
                    setShowMessage(false);
                    setTelephonesDest([]);
                }
            })
            .catch(error => {
                toast.error("Le sms n'a pas pu être envoyé")
            })
        } else if (tel.startsWith('+33')) {
            console.log('test')
        }
    }

    function handleSubmitEmail(email) {

        
        let newBody = bodyModelSelected.split('\n').join("<br>");
        
        if (bodyModelSelected != '') {

            fetch("https://calldirect.herokuapp.com/api/smsemail/sendEmail", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailDest: email,
                    text: newBody || 'VIP ISRAEL',
                    object: titleModelSelected || 'VIP ISRAEL'
                }),
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                toast.success("Mail envoyé");
                setShowMessage(false);
                setEmailsDest([]);
            })
            .catch(error => {
                toast.error("Le mail n'a pu être envoyé");
                setIsLoading(false);
            })
        }
    }

    function handleSubmitModels(index, e) {

        e.preventDefault();
        
        const newModeles = [...modeles];
        newModeles.push({
            title: newModelTitle,
            modele: newModelBody
        }); 

        const newClient = {...client, modeles: newModeles};

        if (newModelTitle && newModelBody !== "") {
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
                    setRefresh(!refresh);
                    toast.success('Modèle enregistré')
                    handleCloseModels();  
                    setNewModel(false);              
                }  
            })
            .catch(error => {
                toast.error('Erreur lors de la validation');
                setNewModel(false);
            })
        }
    }

    function handleDeleteModel(index, e) {

        e.preventDefault();

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
                    setRefresh(!refresh);       
                    toast.info('Modèle supprimé')
                    setModelSelected(0);
                    handleCloseModels();
                } 
            })
            .catch(error => toast.error('Erreur lors de la supression'));
   }

    const handleCloseMessage = () => {
        setModelSelected(0);
        setShowMessage(false);
    }    

    const handleCloseModels = () => {
        setShowModels(false)
    }
    
    const handleCloseButtonModel = () => {
        setIsOpen(false);
    }

    const handleListEmails = (e) => {
        e.preventDefault()
        setShowListEmails(!showListEmails)
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
        handleCloseButtonModel()
    }

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

            if (!telephonesDest.includes(e.target.value)) {
                let copyEmails = [...telephonesDest];
                copyEmails.push(e.target.value)
                setTelephonesDest(copyEmails) 
            } 
        } else {
            if (telephonesDest.includes(e.target.value)) {
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
                    <form onSubmit={(e) => handleSubmitMessage(e)} className='modal' style={{position: "relative"}} onClick={stopPropagation}>
                        <span style={{position: "absolute", top: "20px", right: "20px", color: "#0dbad8", padding: "5px", fontWeight: "bold"}} onClick={handleCloseMessage}>X</span>                                     
                        {(modeles && modeles.length !== 0) &&
                            <ButtonModel modeles={modeles} setModelSelected={setModelSelected} isOpen={isOpen} setIsOpen={setIsOpen} />
                        }
                        
                        { (emailsEnvoie && (emailsEnvoie.length > 1 || telephonesEnvoie.length > 1)) &&
                        <>
                            <div>Destinataire</div>
                            <div className="destinataireMessage">
                            {(emailsEnvoie.length > 1 && (client.choixEnvoie === "1" || client.choixEnvoie === "3")) &&
                                    <div className="destinataireMessage__container" name="emailDest">
                                        <button className={`${!showListEmails && "show-listEmails"} destinataireMessage__button`} onClick={handleListEmails}>Emails <img src={arrow} alt=""/></button>
                                        <div className="destinataireMessage__options" style={!showListEmails ? {display: "none"} : {display: "block"}}>
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
                                    </div>
                                }
                                {(telephonesEnvoie.length > 1 && (client.choixEnvoie === "2" || client.choixEnvoie === "3")) &&
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
                            /* onChange={(e) => setTitleMessage(e.target.value)} */ 
                            /* value={modeles.length > 0 ? modeles[modelSelected]?.title : ""} */
                            value={titleModelSelected}
                            onChange={(e) => setTitleModelSelected(e.target.value)}
                        />
                        <label>Message</label>
                        <textarea 
                            /* onChange={(e) => setTxtMessage(e.target.value)} 
                            value={modeles.length > 0 ? modeles[modelSelected]?.modele : ""} */
                            value={bodyModelSelected}
                            onChange={(e) => setBodyModelSelected(e.target.value)}
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
                    {
                        newModel
                        ?
                        <input 
                        onChange={(e) => setNewModelTitle(e.target.value)}
                        value={newModelTitle} 
                    />  
                        :
                        <input 
                            /* onChange={(e) => setTitleModel(e.target.value)} */
                            value={modeles.length > 0 ? modeles[modelSelected]?.title : ""} disabled
                        />                        

                    }
                    <label>Modèle</label>

                    {
                        newModel
                        ?
                        <textarea                    
                        onChange={(e) => setNewModelBody(e.target.value)} 
                        value={newModelBody}
                    />  
                        :
                        <textarea                    
                        /* onChange={(e) => setTxtModel(e.target.value)} */
                        value={modeles.length > 0  ? modeles[modelSelected]?.modele : ""} disabled
                    />                       

                    }
                    <div className="buttons-Model">
                        {   newModel ?
                            <button className="btnSms" onClick={(e)=> handleSubmitModels(modelSelected, e)}>Sauvegarder</button>
                            :
                            <button className="btnSms" onClick={() => setNewModel(true)}>Nouveau</button>
                        }
                        {modeles.length > 0 && newModel ? 
                            <button onClick={(e) => setNewModel(false)} className="btnSms-delete">Annuler</button> 
                            : 
                            <button onClick={(e) => handleDeleteModel(modelSelected, e)} className="btnSms-delete">Supprimer</button> 
                        }                            
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