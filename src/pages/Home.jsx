import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import MainTable from '../components/mainTable';
import Users from "../components/Users";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <section className="home">
            <Users />
            <button onClick={logout}>Log-out</button>
        </section>
    )
}

export default Home
