import editButton from '../assets/icons/edit-button.svg'

const EditButton = ({ editMode, setEditMode }) => {
    const handleEditButton = (e) => {
      e.preventDefault();
      setEditMode(!editMode);
    };
  
    return (
      <>
        {editMode ? (
          <button className="edit-button" onClick={(e) => handleEditButton(e)}>
            Fermer
          </button>
        ) : (
          <button className="edit-button" onClick={(e) => handleEditButton(e)}>
            <img src={editButton} alt="editer" />
          </button>
        )}
      </>
    );
  };
  
  export default EditButton;
  