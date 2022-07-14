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

const ROLES = {
  'User': "62cf5893bb421ce8fa8529ae",
  'Admin': "62ceb80a29ad61b74e971ae3" || "62cea7cb29ad61b74e971aa6"
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="new-clients" element={<NewClients />} /> */}
        {/* <Route path="gestion-users" element={<GestionUsers />} /> */}
        {/* <Route path=":id" element={<ClientsCard />} /> */}

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="new-clients" element={<NewClients />} />
          <Route path=":id" element={<ClientsCard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="gestion-users" element={<GestionUsers />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;