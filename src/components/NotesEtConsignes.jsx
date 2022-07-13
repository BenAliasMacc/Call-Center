 import { useState, useEffect } from "react";
 import '../styles/styles.css';
 import { MdDeleteForever } from 'react-icons/md';
 import { MdPublishedWithChanges } from 'react-icons/md';
import { useForm } from "react-hook-form";

const NotesEtConsignes = ({ clientId, token, client, refresh, setRefresh, editMode }) => {

    const { notes, consignes } = client !== undefined && client;
    const [inputNote, setInputNote] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const { register } = useForm();
    const [arrayOfIndex, setArrayOfIndex] = useState([]);

    useEffect(() => {
        setNotesArray([...notes]); 
    }, []);
    
    function handleSubmitNotes(e) {
        e.stopPropagation();
        e.preventDefault();

        if (notes) {
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: [...notes, inputNote]
                })
            })
            .then(response => response.json())
            .then(data => {
                setInputNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
        } 
    };

    function handleChangeNote(e, index) {
        let newArray = [...notesArray]; 
        newArray[index] = e.target.value; 
        setNotesArray(newArray);
    }

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
                setInputNote('');
                setRefresh(!refresh);
            })
            .catch(error => console.log(error));
    }

    function handleModifyNote(index, note) {

        if (arrayOfIndex.includes(index)) {
            let copyOfArray = [...arrayOfIndex];
            let indexOfNote = copyOfArray.indexOf(index);
            copyOfArray.splice(indexOfNote, 1);
            setArrayOfIndex(copyOfArray);

            if (note != notesArray[index]) {

                /* INSERER ici modification des notes */ 
            }

        } else {
            let copyOfArray = [...arrayOfIndex];
            copyOfArray.push(index);
            setArrayOfIndex(copyOfArray);
        }
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
                            notes.map((note, index) => 
                            <div key={index} className="notes">
                                {
                                    arrayOfIndex.includes(index) ?
                                    <div>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><input onChange={(e) => handleChangeNote(e, index)} value={notesArray[index]} type='text'/>
                                    </div>
                                    :
                                    <div style={{display: "flex", flex: 1, width: "50%", paddingRight: "0.5rem"}}>
                                        <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><span>{note}</span>
                                    </div>
                                }
                                <div>
                                    <MdPublishedWithChanges onClick={() => handleModifyNote(index, note)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />
                                    <MdDeleteForever className='iconNotes colorRed' onClick={() => deleteNote(index)}/>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="containerInput">
                        <input onChange={(e) => setInputNote(e.target.value)} value={inputNote} className="notesEtConsignes__input" type="text" id="notes" defaultValue="" />
                        <button className='btn'>Envoyer</button> 
                    </div>
                </div>                
            </form>
        }
        </>
    )
}

export default NotesEtConsignes