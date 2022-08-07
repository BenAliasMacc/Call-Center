import { useState } from "react";
import { ButtonModel } from "./ButtonModel";

const MessageMenu = ({ client, setClient, showNavMessage, setShowNavMessage, token, modeles, setRefresh, refresh }) => {

    const [telephoneDest, setTelephoneDest] = useState("");
    const [txtMessage, setTxtMessage] = useState("");
    const [emailDest, setEmailDest] = useState("");
    const [txtEmail, setTxtEmail] = useState("");
    const [objectEmail, setObjectEmail] = useState("");
    const [txtModel, setTxtModel] = useState("");
    const [titleModel, setTitleModel] = useState("");
    const [isOpenMessage, setIsOpenMessage] = useState(false);
    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenModels, setIsOpenModels] = useState(false);
    const [isOpen, setIsOpen] = useState(false);    
    const [modelSelected, setModelSelected] = useState();
    const diplayNav = showNavMessage ? "show-navbar" : "";

    function handleSubmitMessage(e) {
        e.preventDefault();
        
        if (client.telephone.startsWith('972')) {

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
                if (data.success == '1') {
                    setIsOpenMessage(false);
                }
            })
            .catch(error =>console.log(error))
        } else if (client.telephone.startsWith('33')) {
            console.log('test')
        }
    }

    function handleSubmitEmail(e) {
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
            console.log(data)
        })
        .catch(error =>console.log(error))
    }

    function handleSubmitModels(e) {
        e.preventDefault();

        const newModeles = [...modeles];
        newModeles.push({
            title: titleModel,
            modele: txtModel
        });

        const newClient = {...client, modeles: newModeles};

        fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${client._id}`, {
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
            console.log(data);
            if (data.success === 1) {
                setIsOpenModels(false);
                setRefresh(!refresh);
            }
        })
        .catch(error =>console.log(error))
    }

    const handleModalEmail = () => {
        setIsOpenEmail(true)
        setShowNavMessage(false)        
    }

    const handleModalMessage = () => {
        setIsOpenMessage(true)
        setShowNavMessage(false)        
    }

    const handleModalModels = () => {
        setIsOpenModels(true)
        setShowNavMessage(false)        
    }

    const handleCloseModals = () => {
        setModelSelected();
        setIsOpenMessage(false);
        setIsOpenEmail(false);
        setIsOpenModels(false);
    }   
    
    const handleCloseButtonModel = () => {
        setIsOpen(false);
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
        handleCloseButtonModel()
    }

    return (

        <>
            <nav
            className={`message-menu ${diplayNav}`}
            style={{ position: "absolute" }}
            >
            <ul className="message-menu__list">
                <li className="message-menu__list__link">
                    <button onClick={handleModalMessage}>SMS</button>
                </li>
                <li className="message-menu__list__link">
                    <button onClick={handleModalEmail}>Email</button>
                </li>
                <li className="message-menu__list__link">
                    <button onClick={handleModalModels}>Modèle</button>
                </li>
            </ul>
            </nav>
        
            {
                isOpenMessage &&
                <div className='modalMessage' onClick={handleCloseModals}>
                    <form onSubmit={(e) => handleSubmitMessage(e)} className='modal' onClick={stopPropagation}>
                        <label>Message</label>
                        <textarea onChange={(e) => setTxtMessage(e.target.value)}/>
                        <button className="btnSms">Envoyer</button>
                    </form>
                </div>
            }

            {
                isOpenEmail &&
                <div className='modalEmail' onClick={handleCloseModals}>                    
                    <form onSubmit={(e) => handleSubmitEmail(e)} className='modal' onClick={stopPropagation}>
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
                        <button className="btnSms">Envoyer</button>
                    </form>
                </div>
            }           

            {
                isOpenModels &&
                <div className='modalEmail' onClick={handleCloseModals}>                    
                    <form onSubmit={(e) => handleSubmitModels(e)} className='modal' onClick={stopPropagation}>
                        <label>Titre</label>
                        <input onChange={(e) => setTitleModel(e.target.value)}/>
                        <label>Modèle</label>
                        <textarea onChange={(e) => setTxtModel(e.target.value)}/>
                        <button className="btnSms">Sauvegarder</button>
                    </form>
                </div>
            }            
        </>
    );
};

export default MessageMenu;
