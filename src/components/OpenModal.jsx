import { MdPublishedWithChanges } from 'react-icons/md';
import useAuth from '../hooks/useAuth';

const OpenModal = ({ clientId }) => {

  const { auth, setAuth } = useAuth();

  const handleModal = () => {
    console.log(clientId);
    setAuth({...auth, clientId})
  }
    
  return (
      <div className="open-modal">        
        <button onClick={handleModal} className="open-modal__button">
            <MdPublishedWithChanges style={{color: "green", width: "30px", height: '30px', cursor: "pointer"}}/>
        </button>            
      </div>
    )
}

export default OpenModal;