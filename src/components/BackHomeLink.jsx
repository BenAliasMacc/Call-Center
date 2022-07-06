import back from '../assets/icons/back-home.svg'
import { Link } from "react-router-dom";

const BackHomeLink = () => {
  return (
    <Link to="/" className="back-home-link">
      <img src={back} alt="retour à l'accueil" />
      <p>Accueil</p>
    </Link>
  );
};

export default BackHomeLink;