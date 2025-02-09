import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaCar, FaUsers, FaWrench, FaShieldAlt } from "react-icons/fa";
import ButtonSecondary from "../../components/Button/ButtonSecondary";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import Hero from "../../assets/antoine_mobile_600.jpg";
const RiderEdition = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/[0.05] -z-10" />
        <img src={Hero} alt="" className="absolute inset-y-0 right-0 w-1/2 " data-aos="fade-left" />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary text-sm font-medium px-4 py-1 rounded-full">
                Espace Partenaire
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mt-6 mb-6">
              Gérez votre flotte en toute
              <span className="text-primary"> simplicité</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Un espace dédié pour optimiser la gestion de vos motos Triumph.
              Suivez, analysez et améliorez vos performances en temps réel.
            </p>
            <div className="flex gap-4">
              <ButtonPrimary to="/login">Connexion</ButtonPrimary>
              <ButtonSecondary to="/rider"> En savoir plus</ButtonSecondary>
            </div>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques avec cartes modernes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Une Suite Complète d'Outils
            </h2>
            <p className="text-gray-600">
              Tout ce dont vous avez besoin pour une gestion efficace de votre
              flotte
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-lg shadow-sm p-6 group hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <FaCar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion de Flotte</h3>
              <p className="text-gray-600">
                Suivi en temps réel de l'état et de la localisation de vos motos
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Suivi kilométrique
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  État des véhicules
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Historique détaillé
                </li>
              </ul>
            </div>

            <div
              className="bg-white rounded-lg shadow-sm p-6 group hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <FaUsers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Gestion des Conducteurs
              </h3>
              <p className="text-gray-600">
                Gérez efficacement vos équipes et leurs autorisations
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Profils détaillés
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Suivi des permis
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Attribution des véhicules
                </li>
              </ul>
            </div>

            <div
              className="bg-white rounded-lg shadow-sm p-6 group hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <FaWrench className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
              <p className="text-gray-600">
                Planifiez et suivez tous vos entretiens
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Entretiens programmés
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Suivi des réparations
                </li>
                <li className="flex items-center">
                  <FaShieldAlt className="h-4 w-4 mr-2 text-primary" />
                  Historique complet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default RiderEdition;
