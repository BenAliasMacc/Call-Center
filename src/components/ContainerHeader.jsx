import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const ContainerHeader = ({
  name,
  firstname,
  clientId,
  setEditMode,
  editMode
}) => {
  return (
    <div className="container-header">
      <h1>
        {firstname} {name}
      </h1>
      <div className="container-header__buttons">
        <EditButton editMode={editMode} setEditMode={setEditMode} />
        <DeleteButton clientId={clientId} />
      </div>
    </div>
  );
};

export default ContainerHeader;