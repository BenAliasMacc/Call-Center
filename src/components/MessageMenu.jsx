import React, { useState } from "react";

const BurgerMenu = ({ showNavMessage, token }) => {

    const [telephoneDest, setTelephoneDest] = useState("");
    const [txtMessage, setTxtMessage] = useState("");
    const [isOpenMessage, setIsOpenMessage] = useState(false);
    const diplayNav = showNavMessage ? "show-navbar" : "";

    function handleSubmitMessage(e) {
        e.preventDefault();
        
        fetch("https://calldirect.herokuapp.com/api/smsemail/sendSms", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*', 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        number: "0584545127",
                        message: "test"
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error =>console.log(error))
      }

    const handleCloseMessage = () => {
        setIsOpenMessage(false);
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
      }

    return (

        <>
            <nav
            className={`message-menu ${diplayNav}`}
            style={{ position: "absolute" }}
            >
            <ul className="message-menu__list">
                <li className="message-menu__list__link">
                <button onClick={() => setIsOpenMessage(true)}>SMS</button>
                </li>
                <li className="message-menu__list__link">
                <button>Email</button>
                </li>
            </ul>
            </nav>
        
            {
                isOpenMessage &&
                <div className='modalMessage' onClick={handleCloseMessage}>
                    <form onSubmit={(e) => handleSubmitMessage(e)} className='modal' onClick={stopPropagation}>
                        <label>Tel</label>
                        <input type="text" onChange={(e) => setTelephoneDest(e.target.value)}/>
                        <label>Message</label>
                        <textarea onChange={(e) => setTxtMessage(e.target.value)}/>
                        <button className="btnSms">Envoyer</button>
                    </form>
                </div>
            }
        </>
    );
};

export default BurgerMenu;
