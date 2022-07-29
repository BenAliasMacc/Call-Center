import useAuth from "../hooks/useAuth";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const ContainerHeader = ({ name, firstname, clientId, setEditMode, editMode, isModal }) => {
  const { setEditClientsModal, auth, setAuth } = useAuth();

  const handleCloseModal = () => {
    setEditClientsModal(false);
    setAuth({...auth, clientId: undefined})
  }

  return (
    <div className="container-header">
      <h1>
        {firstname} {name}
      </h1>
      {isModal ? 
        <button onClick={handleCloseModal} style={{fontSize: "1.5rem"}}>X</button> 
        :
        <div className="container-header__buttons">
          <EditButton editMode={editMode} setEditMode={setEditMode} />
          <DeleteButton clientId={clientId} />
        </div>    
      }
    </div>
  );
};

export default ContainerHeader;