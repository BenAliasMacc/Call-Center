import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../api/axios";

const NotesEtConsignes = ({ clientId, token, client }) => {

    const { notes, consignes } = client !== undefined && client;
    console.log(client);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    console.log(token);
    console.log(notes);

    const onSubmit = data => {
        console.log(data);
        setIsLoading(true);
    
        const editClientData = async () => {
    
          try {
            const response = await axios.put(
              `/clients/modifyClient/${clientId}`,
              JSON.stringify(data),        
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  Accept: "application/json, text/plain,"
                }
                // withCredentials: true
              }
            );
            // setRefresh(!refresh
            console.log('test');
            console.log(response);      
            setIsLoading(false);
          } catch (err) {
            console.log();
          }
        };
    
        editClientData();
      };

    return (
        <>        
            {client &&
            <form className="notesEtConsignes" onSubmit={handleSubmit(onSubmit)} >
                <div className="containerColonne width50"> 
                    <u>NOTES :</u> 
                    <div className="textZone width100">
                        {notes.map((note, id) => <div key={id} className="notes">{note}</div>)}
                    </div>
                    <div className="containerInput">
                        <input 
                            className="notesEtConsignes__input"
                            type="text"
                            id="notes"
                            defaultValue=""
                            {...register("notes")}
                        />
                        <button className='btn'>Envoyer</button> 
                    </div>
                </div>
                <div className="containerColonne width50"> 
                    <u>CONSIGNES :</u> 
                    <div className="textZone width100">
                        
                    </div>
                </div>
            </form>}
        </>
    )
}

export default NotesEtConsignes