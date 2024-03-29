import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/images/logoCallDirect.png";

import axios from '../api/axios';
import Loader from '../components/Loader';
const LOGIN_URL = '/users/login';

const Login = () => {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
        
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.groupe);
            const accessToken = response?.data?.token;
            const roles = [response?.data?.userId];
            setAuth({ email, password, roles, accessToken });
            console.log(auth);
            localStorage.setItem('userEmail', email);
            setEmail('');
            setPassword('');
            setIsLoading(false);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg('L\'Email ou le mot de passe est manquant');
            } else if (err.response?.status === 401) {
                setErrMsg('L\'Email ou le mot de passe est erroné');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
            setIsLoading(false);
        }
    }

    return (

        <section className='login'>

            <div className="login--container">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1><img src={logo} alt="retour à l'acceuil" />  </h1>
                <form className='login__form' onSubmit={handleSubmit}>
                    
                    <div className="group">                            
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="username">Email:</label>
                    </div>

                    <div className="group"> 
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="password">Mot de passe</label>
                    </div>

                    <button className='button-submit'>Connexion</button>
                </form>
            </div>

            { isLoading && 
                <div className='containerLoader'>
                    <Loader />
                </div>
            }

        </section>
    )
}

export default Login
