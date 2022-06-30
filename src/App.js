import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Missing from './pages/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route, useParams } from 'react-router-dom';
import NewuCustomer from './pages/NewCustomers';
import CustomerCard from './pages/CustomerCard';

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
        <Route path="new-customer" element={<NewuCustomer />} />
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