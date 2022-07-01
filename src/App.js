import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './pages/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useParams } from 'react-router-dom';
import NewClients from './pages/NewClients';
import GestionUsers from './pages/GestionUsers';
import CustomerCard from './pages/ClientsCard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./styles/loader.css";

const ROLES = {
  'User': '62b08ba33f8191dd23368c83',
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="new-clients" element={<NewClients />} />
        <Route path="gestion-users" element={<GestionUsers />} />
        <Route path=":id" element={<CustomerCard />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;