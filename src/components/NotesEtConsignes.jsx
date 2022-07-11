 import { useState } from "react";
 import moment from 'moment/min/moment-with-locales';

const NotesEtConsignes = ({ clientId, token, client }) => {

    const { notes, consignes } = client !== undefined && client;
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    function handleSubmit() {
        setIsLoading(true);
        let tableau = [...notes, note]
        if (notes) {
            setNote(tableau);
    
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    note: note,
                    date: moment().locale('fr').format('llll')
                })
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false); 
                setNote('');
            })
            .catch(error => console.log(error));
        } 
    };

    return (
        <>        
        {
            client &&
            <form className="notesEtConsignes" onSubmit={handleSubmit} >
                <div className="containerColonne width30"> 
                    <u>NOTES :</u> 
                    <div className="textZone width100" style={{overflowY: "scroll", maxHeight: "40vh"}}>
                        {
                            notes.map((note, id) => <div key={id} style={{marginTop: "5px", fontSize: "0.8rem"}} className="notes">{note}</div>)
                        }
                    </div>
                    <div className="containerInput">
                        <input onChange={(e) => setNote(e.target.value)} value={note} className="notesEtConsignes__input" type="text" id="notes" defaultValue="" />
                        <button className='btn'>Envoyer</button> 
                    </div>
                </div>
                <div className="containerColonne width70"> 
                    <u>CONSIGNES :</u> 
                    <div className="textZone width100">
                        
                    </div>
                </div>
            </form>
        }
        </>
    )
}

export default NotesEtConsignes