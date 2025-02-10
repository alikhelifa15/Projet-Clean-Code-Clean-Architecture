
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaCheckDouble, FaLink } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Hero from "../../assets/Overview/hero.png";
import Laptop from "../../assets/Overview/laptop_1_high.png";
import CostumerBase from "../../assets/Overview/customer_base.png";
import Banner from "../../assets/Overview/top_banner.png";

const ProEdition = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { ref: maintenanceRef, inView: maintenanceInView } = useInView({
    triggerOnce: true,
  });

  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-30 items-center p-10 overflow-x-hidden">
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl p-2">GESTION PRO</h1>
          <p className="text-4xl lg:text-4xl text-primary p-2">TRIUMPH MOTORCYCLES</p>
          <p className="text-secondary px-2 py-5">
            Découvrez notre solution professionnelle complète pour la gestion de votre flotte Triumph.
            Optimisez vos opérations, maximisez votre efficacité et gardez le contrôle total sur
            l'entretien de vos motos avec notre plateforme intuitive et puissante.
          </p>
        </div>
        <div className="relative w-full lg:w-1/2">
          <svg
            className="w-80 md:w-180 opacity-15"
            viewBox="0 0 1220 960"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1187.7 407.625L1187.69 407.62C1208.14 443.676 1219.81 485.36 1219.81 529.771C1219.81 646.044 1139.8 743.629 1031.83 770.468L416.22 939.642C382.081 952.789 344.99 959.994 306.218 959.994C137.098 959.994 0 822.896 0 653.776C0 595.982 16.0111 541.925 43.8406 495.804L43.8136 495.817L238.752 130.841C274.589 56.1962 349.448 3.84051 436.889 0.208073L436.903 0.00561523H860.445L860.45 0.0224867C931.054 0.96223 992.185 41.1518 1023.02 99.7668L1023.02 99.7584L1187.7 407.625Z"
              fill="#F27F18"
            />
          </svg>
          <img
            src={Banner}
            alt="banner.png"
            className="absolute top-10 w-full md:top-30 lg:w-[48rem] animate-zoomInLeft"
          />
        </div>
      </section>

      <section className="bg-light flex flex-col">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-45 py-10 px-5 lg:px-44 overflow-x-hidden">
          <img
            src={Hero}
            alt="hero.png"
            className="w-90"
            data-aos="fade-right"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl">
              Une gestion <span className="text-primary">intelligente et efficace</span> de votre flotte
            </h1>
            <hr className="w-30 ml-1 h-0.5 bg-primary mt-4 border-none" />
            <p className="text-secondary text-xl px-2 py-5" data-aos="fade-left">
              Notre plateforme vous offre tous les outils nécessaires pour une gestion optimale
              de votre flotte. De la maintenance préventive à la gestion des stocks, en passant
              par le suivi des conducteurs, tout est centralisé pour faciliter vos opérations.
            </p>
          </div>
        </div>

        <div className="py-10 flex flex-col items-center md:flex-row md:gap-10 md:px-50">
          <div className="flex flex-col items-center py-5 md:w-1/3 text-center" data-aos="fade-up">
            <FaCheckDouble size={30} />
            <h2 className="text-xl py-2">Maintenance Optimisée</h2>
            <p className="text-secondary">
              Planification intelligente des entretiens basée sur le kilométrage
              et l'historique d'utilisation de chaque moto.
            </p>
          </div>
          <div className="flex flex-col items-center py-5 md:w-1/3 text-center" data-aos="fade-up">
            <FaHistory size={30} />
            <h2 className="text-xl py-2">Gestion des Stocks</h2>
            <p className="text-secondary">
              Suivi en temps réel des pièces détachées avec alertes automatiques
              et gestion intelligente des commandes.
            </p>
          </div>
          <div className="flex flex-col items-center py-5 md:w-1/3 text-center" data-aos="fade-up">
            <FaLink size={30} />
            <h2 className="text-xl py-2">Suivi Complet</h2>
            <p className="text-secondary">
              Tableau de bord détaillé avec KPIs, rapports personnalisés
              et analyse des performances de la flotte.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="relative flex flex-col lg:flex-row items-center gap-20 py-30 px-5 lg:px-15 overflow-x-hidden">
          <div className="relative" data-aos="fade-up">
            <img src={Laptop} alt="laptop.png" className="w-[500rem]" />
            <img
              src={CostumerBase}
              alt="customer.png"
              className="absolute top-2.5 left-[50%] translate-x-[-50%] w-[16rem] md:top-5 md:w-[38rem]"
            />
          </div>
          <div className="flex flex-col">
            <span className="bg-primary text-white px-2 w-39 rounded-full text-center py-1 mt-2">
              Fonctionnalités Pro
            </span>
            <h1 className="text-3xl lg:text-4xl font-semibold text-start">
              Des outils professionnels
              <span className="text-primary"> sur mesure</span>
            </h1>
            <hr className="w-20 ml-1 text-primary mt-4" />
            <p className="text-secondary text-xl px-2 py-5 w-150">
              Profitez d'une suite complète d'outils conçus pour les professionnels :
              planification automatisée des entretiens, gestion intelligente des stocks,
              suivi détaillé des conducteurs, rapports personnalisables et bien plus encore.
              Notre plateforme s'adapte à vos besoins spécifiques pour une gestion optimale
              de votre flotte Triumph.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col mt-90 md:mt-0 md:flex-row md:gap-40 justify-center items-center py-10 px-4 md:px-0">
        <div className="flex flex-col items-center" ref={maintenanceRef}>
          <h1 className="text-4xl md:text-5xl font-semibold">
            {maintenanceInView && (
              <CountUp start={0} end={98} duration={3} separator="" />
            )}%
          </h1>
          <hr className="w-12 md:w-16 lg:w-20 text-primary mt-4" />
          <p className="text-secondary text-lg md:text-xl py-2">Taux de satisfaction</p>
        </div>
      </div>
    </div>
  );
}

export default ProEdition