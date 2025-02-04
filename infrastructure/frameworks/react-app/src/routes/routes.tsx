import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import DefaultLayoutFront from "../layout/DefaultLayoutFront";
import DefaultLayoutDashboard from "../layout/DefalutLayoutDashbord";
import Loader from "../components/Loader";


import Overview from "../pages/front/Overview";
import ProEdition from "../pages/front/ProEdition";
import RiderEdition from "../pages/front/RiderEdition";
import Login from "../pages/front/Login";
import Register from "../pages/front/Register";
import RegisterCompany from "../pages/front/RegisterCompany";
import Diver from "../pages/dashboard/Diver";
import Motorcycle from "../pages/dashboard/Motorcycle";
import WorkshopControls from "../pages/dashboard/WorkshopControls";
import WorkshopMaintenance from "../pages/dashboard/WorkshopMaintenance";
import Profile from "../pages/dashboard/Profile";
import Users from "../pages/dashboard/Users";
import Client from "../pages/dashboard/Client";
import ServiceBook from "../pages/dashboard/ServiceBook";
import CustomerBase from "../pages/dashboard/CustomerBase";
import Parts from "../pages/dashboard/Parts";
import WorkshopSheet from "../pages/dashboard/WorkshopSheet";
import Home from "../pages/dashboard/Home";
import RegisterDealer from "../pages/front/RegisterDealer";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/dashboard/Unauthorized";
import { Test } from "../pages/dashboard/test";
import { Incident } from "../pages/dashboard/incident";


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const wrapPage = (title: string, element: JSX.Element, isDashboard = false, types?: string[]) => {
    const LayoutComponent = isDashboard ? DefaultLayoutDashboard : DefaultLayoutFront;
    const wrappedElement = (
      <>
        <PageTitle title={`Triumph Motorcycles | ${title}`} />
        <LayoutComponent>
          {element}
        </LayoutComponent>
      </>
    );

    return isDashboard ? (
      <ProtectedRoute allowedTypes={types}>
        {wrappedElement}
      </ProtectedRoute>
    ) : wrappedElement;
  };

  if (loading) return <Loader />;

  return (
    <>
      <Routes>
        {/* Routes publiques */}
        <Route index element={wrapPage("Carnet d'entretien digital pour ateliers et motards", <Overview />)} />
        <Route path="/unauthorized" element={wrapPage("Inscription d'un concessionnaire", <Unauthorized />)} />
        <Route path="/pro" element={wrapPage("Outil de gestion de parc clients moto partagé", <ProEdition />)} />
        <Route path="/rider" element={wrapPage("Suivi et anticipation d'entretien moto", <RiderEdition />)} />
        <Route path="/register" element={wrapPage("Inscription", <Register />)} />
        <Route path="/register/dealer" element={wrapPage("Inscription concessionnaire", <RegisterDealer />)} />
        <Route path="/register/company" element={wrapPage("Inscription entreprise", <RegisterCompany />)} />
        <Route path="/login" element={wrapPage("Connexion", <Login />)} />

        {/* Routes dashboard protégées */}
        <Route path="/dashboard" element={wrapPage("Tableau de bord", <Home />, true, ["ADMIN", "DEALER", "COMPANY"])} />
        <Route path="/dashboard/customer-base" element={wrapPage("Parc clients", <CustomerBase />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/service-book" element={wrapPage("Carnet d'entretien", <ServiceBook />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/motorcycle" element={wrapPage("Motos", <Motorcycle />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/profile" element={wrapPage("Profile", <Profile />, true, ["ADMIN", "DEALER", "COMPANY"])} />
        <Route path="/dashboard/users" element={wrapPage("Utilisateurs", <Users />, true, ["ADMIN"])} />
        <Route path="/dashboard/driver" element={wrapPage("Conducteurs", <Diver />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/client" element={wrapPage("Clients", <Client />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/test" element={wrapPage("tests", <Test />, true, ["DEALER", "COMPANY"])} />
        <Route path="/dashboard/incident" element={wrapPage("incidents", <Incident />, true, ["DEALER", "COMPANY"])} />



        <Route path="/dashboard/parts" element={wrapPage("Pièces", <Parts />, true, ["DEALER"])} />
        <Route path="/dashboard/workshop/workshop-sheet" element={wrapPage("Fiche moto", <WorkshopSheet />, true, ["DEALER"])} />
        <Route path="/dashboard/workshop/workshop-maintenance" element={wrapPage("Entretien moto", <WorkshopMaintenance />, true, ["DEALER"])} />
        <Route path="/dashboard/workshop/workshop-controls" element={wrapPage("Contrôle moto", <WorkshopControls />, true, ["DEALER"])} />
         {/* Route catch-all pour les pages qui n'existent pas */}
         <Route path="*" element={wrapPage("Page non trouvée", <Unauthorized />)} />
      </Routes>
    
    </>
  );
}



export default App;