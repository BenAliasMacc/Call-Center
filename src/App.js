
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import NewClients from './pages/NewClients';
import GestionUsers from './pages/GestionUsers';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ClientsCard from './pages/ClientsCard';
// import SendSms from './components/SendSms';

const ROLES = {
  'User': "0",
  'Admin': "1"
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* <Route path="send-sms" element={<SendSms /> } /> */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="new-clients" element={<NewClients />} /> */}
        {/* <Route path="gestion-users" element={<GestionUsers />} /> */}
        {/* <Route path=":id" element={<ClientsCard />} /> */}

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />          
          <Route path="/client" element={<ClientsCard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="gestion-users" element={<GestionUsers />} />
          <Route path="new-clients" element={<NewClients />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;