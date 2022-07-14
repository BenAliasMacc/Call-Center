import { MdPublishedWithChanges } from 'react-icons/md';
import useAuth from '../hooks/useAuth';

const OpenModal = ({ clientId }) => {

  const userRole = localStorage.getItem("userRole");
  const { setEditClientsModal, auth, setAuth } = useAuth();

  const ROLES = {
    'User': "62cf5893bb421ce8fa8529ae",
    'Admin': "62ceb80a29ad61b74e971ae3" ||  "62cea7cb29ad61b74e971aa6"
  } 

  const handleModal = () => {
    setEditClientsModal(true)
    setAuth({...auth, clientId})
  }
    
  return (
    <>
      { userRole === ROLES.Admin &&
        <div className="open-modal">        
          <button onClick={handleModal} className="open-modal__button">
              <MdPublishedWithChanges style={{color: "green", width: "30px", height: '30px', cursor: "pointer"}}/>
          </button>            
        </div>
      }
    </>
    )
}

export default OpenModal;