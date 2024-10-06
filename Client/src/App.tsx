import { Route, Routes, useLocation } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import DefaultLayout from "./layout/DefaultLayout";
import Overview from "./pages/Overview";
import ProEdition from "./pages/ProEdition";
import RiderEdition from "./pages/RiderEdition";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Triumph Motorcycles | Carnet d’entretien digital pour ateliers et motards" />
              <Overview />
            </>
          }
        />
        <Route
          path="/pro"
          element={
            <>
              <PageTitle title="Triumph Motorcycles | Outil de gestion de parc clients moto partagé" />
              <ProEdition />
            </>
          }
        />
        <Route
          path="/rider"
          element={
            <>
              <PageTitle title="Triumph Motorcycles | Suivi et anticipation d'entretien moto" />
              <RiderEdition />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <PageTitle title="Triumph Motorcycles | Inscription" />
              <Register/>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Triumph Motorcycles |Connexion" />
              <Login/>
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
