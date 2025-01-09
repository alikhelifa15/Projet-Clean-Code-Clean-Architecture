import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "./components/PageTitle";
import DefaultLayoutFront from "./layout/DefaultLayoutFront";
import DefaultLayoutDashboard from "./layout/DefalutLayoutDashbord";
import Loader from "./components/Loader";

// Pages publiques
import Overview from "./pages/Overview";
import ProEdition from "./pages/ProEdition";
import RiderEdition from "./pages/RiderEdition";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterCompany from "./pages/RegisterCompany";
import RegisterUser from "./pages/RegisterUser";
import Diver from "./pages/dashboard/Diver";
import Motorcycle from "./pages/dashboard/Motorcycle";
import WorkshopControls from "./pages/dashboard/WorkshopControls";
import WorkshopMaintenance from "./pages/dashboard/WorkshopMaintenance";
import Profile from "./pages/dashboard/Profile";
import Users from "./pages/dashboard/Users";
import ServiceBook from "./pages/dashboard/ServiceBook";
import CustomerBase from "./pages/dashboard/CustomerBase";
import Parts from "./pages/dashboard/Parts";
import WorkshopSheet from "./pages/dashboard/WorkshopSheet";
// Pages dashboard (exemple)
import Home from "./pages/dashboard/Home";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  

  // Fonction pour wrapper la page avec le bon layout et le titre
  const wrapPage = (title: string, element: JSX.Element, isDashboard = false) => {
    const LayoutComponent = isDashboard ? DefaultLayoutDashboard : DefaultLayoutFront;
    
    return (
      <>
        <PageTitle title={`Triumph Motorcycles | ${title}`} />
        <LayoutComponent>
          {element}
        </LayoutComponent>
      </>
    );
  };

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* Routes publiques */}
      <Route index element={wrapPage("Carnet d'entretien digital pour ateliers et motards", <Overview />)} />
      <Route path="/pro" element={wrapPage("Outil de gestion de parc clients moto partagé", <ProEdition />)} />
      <Route path="/rider" element={wrapPage("Suivi et anticipation d'entretien moto", <RiderEdition />)} />
      <Route path="/register" element={wrapPage("Inscription", <Register />)} />
      <Route path="/register/user" element={wrapPage("Inscription utilisateur", <RegisterUser />)} />
      <Route path="/register/company" element={wrapPage("Inscription entreprise", <RegisterCompany />)} />
      <Route path="/login" element={wrapPage("Connexion", <Login />)} />

      {/* Routes dashboard */}
      <Route path="/dashboard" element={wrapPage("Tableau de bord", <Home />, true)} />
      <Route path="/dashboard/customer-base" element={wrapPage("Parc clients", <CustomerBase />, true)} />
      <Route path="/dashboard/service-book" element={wrapPage("Carnet d'entretien", <ServiceBook />, true)} />

      <Route path="/dashboard/motorcycle" element={wrapPage("Motos", <Motorcycle />, true)} />
      <Route path="/dashboard/profile" element={wrapPage("Profile", <Profile />, true)} />
      <Route path="/dashboard/users" element={wrapPage("Utilisateurs", <Users />, true)} />
      <Route path="/dashboard/driver" element={wrapPage("Conducteurs", <Diver />, true)} />
      <Route path="/dashboard/parts" element={wrapPage(" Pièces", <Parts />, true)} />
      <Route path="/dashboard/workshop/workshop-sheet" element={wrapPage("Fiche moto", <WorkshopSheet />, true)} />
      <Route path="/dashboard/workshop/workshop-maintenance" element={wrapPage("Entretien moto", <WorkshopMaintenance />, true)} />
      <Route path="/dashboard/workshop/workshop-controls" element={wrapPage("Contrôle moto", <WorkshopControls />, true)} />

    </Routes>
  );
}

export default App;