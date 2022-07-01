import { useState } from "react";
import editButton from '../assets/icons/edit-button.svg'

const EditButton = ({ editMode, setEditMode, client, setClient, objectKey, value }) => {

    const handleEditButton = e => {
        e.preventDefault();
        setEditMode(!editMode)
    }

    return (
        <button className="edit-button" onClick={e => handleEditButton(e)}><img src={editButton} alt="Editer"></img></button>
    )
}

export default EditButton