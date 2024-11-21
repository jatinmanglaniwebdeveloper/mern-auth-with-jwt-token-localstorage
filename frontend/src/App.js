import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import LeadsTable from "./components/LeadsTable";
import LeadsList from "./components/LeadsList";
import LeadForm from "./components/LeadForm";
import EditLead from "./components/EditLead";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/view" element={<LeadsList />} />
            <Route path="/leads" element={<LeadsTable />} /> {/* View all leads */}
            <Route path="/leads/new" element={<LeadForm />} /> {/* Add new lead */}
            <Route path="/leads/:id" element={<EditLead />} /> {/* Edit existing lead */}
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}
