/* icons */
import { MdPublishedWithChanges } from 'react-icons/md';

const EditButton = ({ editMode, setEditMode }) => {
    const handleEditButton = (e) => {
      e.preventDefault();
      setEditMode(!editMode);
    };
  
    return (
      <>
        {!editMode &&
          <button onClick={(e) => handleEditButton(e)}>
            <MdPublishedWithChanges style={{color: "green", width: "30px", height: '30px', cursor: "pointer"}}/>
          </button>
        }
      </>
    );
  };
  
  export default EditButton;
  