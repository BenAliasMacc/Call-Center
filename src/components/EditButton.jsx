import { useState } from "react";
import editButton from '../assets/icons/edit-button.svg'

const EditButton = ({ editMode, setEditMode }) => {

    const handleEditButton = () => {
        setEditMode(!editMode)
    }

    return (
        <button className="edit-button" onClick={handleEditButton}><img src={editButton} alt="Editer"></img></button>
    )
}

export default EditButton