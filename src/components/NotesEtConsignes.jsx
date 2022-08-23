import { useState, useEffect } from "react";
import '../styles/styles.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdPublishedWithChanges } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const NotesEtConsignes = ({ clientId, token, client, refresh }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { notes } = client !== undefined && client;
    const [inputNote, setInputNote] = useState('');
    const [notesArray, setNotesArray] = useState([]);
    const [arrayOfIndex, setArrayOfIndex] = useState([]);
    const [newRefresh, setNewRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChangeIcon, setIsChangeIcon] = useState(false);

   useEffect(() => {
       setNotesArray([...notes]); 
   }, [notes]);

   useEffect(() => {
    
    fetch(`https://calldirect.herokuapp.com/api/clients/getClient/${clientId}`, {
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${token}`,
                   "Accept": "application/json, text/plain,"
               }
           })
           .then(response => response.json())
           .then(data => {
                if (data.success === -1)  {
                    localStorage.clear();
                    navigate('/login', {state: { from: location }, replace: true });
                }
                setNotesArray(data.notes);      
           })
           .catch(error => console.log(error));

}, [newRefresh]);
   
   function handleSubmitNotes(e) {
        setIsLoading(true);
        console.log(inputNote);
        e.stopPropagation();
        e.preventDefault();

        console.log(clientId)

        if (notes && inputNote !== "") {
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json, text/plain,"
                },
                body: JSON.stringify({
                    notes: [...notesArray, inputNote]
                })
            })
            .then(response => response.json())
            .then(data => {                    
                    if (data.success === -1)  {
                        localStorage.clear();
                        navigate('/login', {state: { from: location }, replace: true });
                    }            
                    console.log(notesArray);
                    console.log(notes);        
                    setNewRefresh(!newRefresh);
                    setInputNote('');                
                    setIsLoading(false);                    
            })
            .catch(error => console.log(error));
        }else{
            setIsLoading(false); 
        }
   };

   function handleChangeNote(e, index) {
       let newArray = [...notesArray]; 
       newArray[index] = e.target.value; 
       setNotesArray(newArray);
       setIsChangeIcon(true);
   }

   function deleteNote(index) {
        setIsLoading(true); 
        let newArray = [...notesArray];
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
                    if (data.success === -1)  {
                        localStorage.clear();
                        navigate('/login', {state: { from: location }, replace: true });
                    }
                    setInputNote('');
                    setNewRefresh(!newRefresh);  
                    setIsLoading(false);
            })
            .catch(error => console.log(error));
   }

   function handleModifyNote(index) {

    if (arrayOfIndex.includes(index)) {

        let copyOfArray = [...arrayOfIndex];
        let indexOfNote = copyOfArray.indexOf(index);
        copyOfArray.splice(indexOfNote, 1);
        setArrayOfIndex(copyOfArray);

        if (notes[index] !== notesArray[index]) { 
        
            setIsLoading(true);
            console.log(clientId)
    
            fetch(`https://calldirect.herokuapp.com/api/clients/modifyClient/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*', 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    notes: notesArray
                }),
            })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.success === -1)  {
                        navigate('/login', {state: { from: location }, replace: true })
                   } else {
                }
            })
            .catch(error =>console.log(error))
            }

            setIsChangeIcon(false);

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
                   <div className="textZone width100" style={{overflowY: "scroll"}}>
                       {
                           notesArray.map((note, index) => 
                           <div key={index} className="notes">
                               {
                                   arrayOfIndex.includes(index) ? 
                                   <div className="notes__input">
                                       <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><input onChange={(e) => handleChangeNote(e, index)} value={notesArray[index]} type='text'/>
                                   </div>
                                   :
                                   <div style={{display: "flex", flex: 1, width: "50%", paddingRight: "0.5rem"}}>
                                       <span style={{fontSize: "0.5rem"}} className="pastille">🟢</span><span>{note}</span>
                                   </div>
                               }
                               <div>
                                {
                                    isChangeIcon && arrayOfIndex.includes(index) ?
                                    <BsCheck onClick={() => handleModifyNote(index, note)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />
                                    : 
                                    <MdPublishedWithChanges onClick={() => handleModifyNote(index, note)} className='iconNotes colorGreen' style={{marginRight: "10px"}} />

                                }
                                   <MdDeleteForever className='iconNotes colorRed' onClick={() => deleteNote(index)}/>
                               </div>
                           </div>)
                       }
                   </div>
                   <div className="containerInput">
                       <input onChange={(e) => setInputNote(e.target.value)} value={inputNote} className="notesEtConsignes__input" type="text" id="notes" />
                       <button className='btn'>
                            {isLoading ?
                                    <TailSpin color="white" height={32} width={32} /> 
                                    :
                                    <p>Envoyer</p>
                            }
                        </button> 
                       
                   </div>
               </div>                
           </form>
       }
       {/* { isLoading && 
          <div className='containerLoader'>
            <Loader />
          </div>
        } */}
       </>
   )
}

export default NotesEtConsignes;


// const navigate = useNavigate();
// const location = useLocation();

// if (data.success === -1)  {
//     localStorage.clear();
//     navigate('/login', {state: { from: location }, replace: true });
// }