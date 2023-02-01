import React, { useEffect } from 'react';
import arrow from "../assets/icons/down-arrow.svg"

export const ButtonModel = ({ modeles, setModelSelected, isOpen, setIsOpen }) => {

    useEffect(() => {
        setModelSelected(0)
    }, [])

    const handleButtonModel = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen)
    }   

    const handleModel = (e, i) => {
        setIsOpen(false);
        setModelSelected(i)       
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const displayModels = isOpen ? "" : "show-models"

    return (
        
        <div className={`button-model ${displayModels}`} onClick={handleButtonModel}>
            <div className="button-model__button" >
                <p>modeles</p>
                <img src={arrow} alt="drop down arrow" />
            </div>
            {isOpen && 
                <ul className="models__options">
                    {modeles.map((modele, i) => <li onClick={(e) => handleModel(e, i)} key={i}>{modele.title}</li>)}
                </ul>            
            }         
        </div>
    )
}


                                    
                                