 import { useState } from "react";
 import '../styles/styles.css';
 import { MdDeleteForever } from 'react-icons/md';
 import { MdPublishedWithChanges } from 'react-icons/md';
import { useForm } from "react-hook-form";

const NotesEtConsignes = ({ clientId, token, client, refresh, setRefresh, editMode }) => {

    const { notes, consignes } = client !== undefined && client;
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modifyNote, setModifyNote] = useState(false);
    const { register } = useForm();
    
    function handleSubmitNotes(e) {
        e.stopPropagation();
        e.preventDefault();
/*         setIsLoading(true);*/

        if (notes) {
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: [...notes, note]
                })
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false); 
                setNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
        } 
    };

    function deleteNote(index) {
        let newArray = notes;
        newArray.splice(index, 1);

        fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: newArray
                })
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false); 
                setNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
    }

    return (
        <>        
        {
            client &&
            <form className="notesEtConsignes" onSubmit={handleSubmitNotes} >
                <div className="containerColonne colonne-notes width30"> 
                    <u>NOTES :</u> 
                    <div className="textZone width100" style={{overflowY: "scroll", maxHeight: "40vh"}}>
                        {
                            notes.map((note, id) => 
                            <div key={id} className="notes">
                                {
                                    modifyNote ?
                                    <div>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><input value={note} type='text'/>
                                    </div>
                                    :
                                    <div style={{display: "flex", flex: 1, width: "50%", paddingRight: "0.5rem"}}>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><span>{note}</span>
                                    </div>

                                }
                                <div>
                                    <MdPublishedWithChanges onClick={() => setModifyNote(!modifyNote)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />
                                    <MdDeleteForever className='iconNotes colorRed' onClick={() => deleteNote(id)}/>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="containerInput">
                        <input onChange={(e) => setNote(e.target.value)} value={note} className="notesEtConsignes__input" type="text" id="notes" defaultValue="" />
                        <button className='btn'>Envoyer</button> 
                    </div>
                </div>                
            </form>
        }
        </>
    )
}

export default NotesEtConsignes