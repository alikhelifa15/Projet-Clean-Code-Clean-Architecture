import Banner from "../../assets/Overview/top_banner.png";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import ButtonSecondary from "../../components/Button/ButtonSecondary";
import Hero from "../../assets/Overview/hero.png";
import Laptop from "../../assets/Overview/laptop_1_high.png";
import LaptobWithLogo from "../../assets/Overview/laptop.png";
import CostumerBase from "../../assets/Overview/customer_base.png";
import AppMobile from "../../assets/Overview/Container.png";
import SecondeAppMobile from "../../assets/Overview/ContainerSecode.png";
import Manager from "../../assets/Overview/manager.svg";
import Seller from "../../assets/Overview/seller.svg";
import RedirUser from "../../assets/Overview/rider_user.svg";
import Mechanic from "../../assets/Overview/mechanic.svg";
import CombinationCircle from "../../assets/Overview/combination_circle.png";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { FaCheckDouble, FaLink } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function Overview() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const { ref: usersRef, inView: usersInView } = useInView({
    triggerOnce: true,
  });
  const { ref: modelsRef, inView: modelsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: historyRef, inView: historyInView } = useInView({
    triggerOnce: true,
  });
  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-30 items-center p-10 overflow-x-hidden">
        <div className="p-5 lg:p-10 w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl p-2">CARNET D'ENTRETIEN</h1>
          <p className="text-4xl lg:text-5xl text-primary p-2">MOTO DIGITAL</p>
          <p className="text-secondary px-2 py-5">
            Triumph Motorcycles redéfinit l'expérience du suivi d'entretien moto
            pour les ateliers de réparation et les passionnés de deux-roues.
            Avec une approche novatrice et axée sur la simplicité, notre
            plateforme offre une gestion intuitive et complète de l'entretien
            des motos, révolutionnant ainsi la manière dont les motards et les
            concessionnaires interagissent avec leurs véhicules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonPrimary to="/pro">Triumph Motorcycles Pro</ButtonPrimary>
            <ButtonSecondary to="/rider">Rider Edition</ButtonSecondary>
          </div>
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
      <div className="relative">
        <svg
          viewBox="0 0 1920 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3_1499)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 0C960 320 1920 320 1920 320H2880V640H-960V0H0Z"
              fill="#F8F9FA"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_1499">
              <rect width="1920" height="320" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <section className="bg-light flex flex-col ">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-45 py-10 px-5 lg:px-44 overflow-x-hidden">
          <img
            src={Hero}
            alt="hero.png"
            className="w-90"
            data-aos="fade-right"
          />
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl ">
              Un suivi{" "}
              <span className="text-primary">simplifié et optimisé</span> des
              entretiens périodiques et des points de contrôle
            </h1>
            <hr className="w-30 ml-1 h-0.5 bg-primary mt-4 border-none" />
            <p
              className="text-secondary text-xl px-2 py-5"
              data-aos="fade-left"
            >
              Triumph Motorcycles offre une solution intégrale et collaborative
              aux ateliers / concessionnaires et aux motards. D'un côté, les
              ateliers adoptent un outil de gestion avancé pour leur clientèle.
              De l'autre, les motards profitent d'une application en accès libre
              pour simplifier le suivi de l'entretien de leurs motos.
            </p>
          </div>
        </div>
        <div className="py-10 flex flex-col items-center md:flex-row md:gap-10 md:px-50">
          <div
            className="flex flex-col  items-center py-5 md:w-1/3 text-center"
            data-aos="fade-up"
          >
            <FaCheckDouble size={30} />

            <h2 className="text-xl py-2 ">Certification</h2>
            <p className="text-secondary">
              Lors du passage en atelier d’un motard chez son concessionnaire
              prescripteur, son entretien sera enregistré et certifié
              automatiquement dans son carnet d’entretien personne
            </p>
          </div>
          <div
            className="flex flex-col  items-center py-5 md:w-1/3 text-center"
            data-aos="fade-up"
          >
            <FaHistory size={30} />
            <h2 className="text-xl py-2">Anticipation</h2>
            <p className="text-secondary ">
              Une solution qui prédit les entretiens à venir, nécessaires à la
              sécurité et à la longévité de chaque moto, à l’aide d’intervalles
              prédéfinis, de la moyenne de roulage et d’indices de fiabilité.
            </p>
          </div>
          <div
            className="flex flex-col  items-center py-5  md:w-1/3 text-center"
            data-aos="fade-up"
          >
            <FaLink size={30} />

            <h2 className="text-xl  py-2">Interconnectivité</h2>
            <p className="text-secondary text-base">
              Une approche collaborative entre concessionnaires et motards qui
              promeut la transparence et la fluidité des échanges, tout en
              respectant la confidentialité des données de tous les acteurs.
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
            <span className="bg-primary text-white px-2 w-25 rounded-full text-center py-1 mt-2">
              Pro Edition
            </span>
            <h1 className="text-3xl lg:text-4xl font-semibold text-start">
              L’outil de gestion de parc clients
              <span className="text-primary"> indispensable</span>
            </h1>
            <hr className="w-20 ml-1  text-primary mt-4 " />
            <p className="text-secondary text-xl px-2 py-5">
              Professionnels du monde de la moto, vous avez maintenant
              l’opportunité d'adopter un outil révolutionnaire pour développer
              significativement votre part de service après-vente et votre taux
              de rétention. Comment ? Vous proposerez la certification des
              entretiens effectués sur les machines, et visualiserez
              l’historique ainsi que tous les futurs travaux à effectuer. De
              plus, vous aurez la possibilité de créer des campagnes
              promotionnelles personnalisées, ciblant spécifiquement votre base
              de clients. Enfin, vous pourrez promouvoir votre atelier ou votre
              enseigne auprès d'une vaste audience en atteignant l'ensemble des
              utilisateurs de Triumph Motorcycles.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="relative flex flex-col lg:flex-row items-center justify-between py-5 px-5 lg:px-30">
          <div className="flex flex-col w-full lg:w-[32rem] mb-10 lg:mb-0">
            <span className="bg-primary text-white px-4 py-1 rounded-full text-center mt-2 w-max">
              Rider Edition
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-start mt-5">
              Le suivi d’une moto n’a jamais été aussi
              <span className="text-primary"> simplifié</span>
            </h1>
            <hr className="w-16 lg:w-20 text-primary mt-4" />
            <p className="text-secondary text-base sm:text-lg lg:text-xl px-2 py-5">
              Passionnés de deux-roues motorisés, nous vous mettons à
              disposition un carnet d’entretien moto numérique, facilitant le
              suivi de chacune de vos motos. L'outil s'adapte à votre modèle,
              qu'il soit doté d'une motorisation thermique, électrique, ou de
              toutes autres spécificités techniques, et à votre usage, qu'il
              soit sur route, sur tout-terrain ou sur piste. Regroupez
              l'historique complet de vos motos, accompagné de leurs factures.
              Visualisez de manière simple et concise tous les futurs travaux à
              effectuer sur vos motos. Profitez des bons plans de votre atelier
              habituel ou ponctuel. Renforcez la valeur de revente de votre moto
              et facilitez la transmission de vos données lors de la vente.
              Comme des milliers de personnes, essayez-la, vous ne pourrez plus
              vous en passer.
            </p>
          </div>

          <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src={SecondeAppMobile}
              alt="second-app-mobile"
              className="absolute top-100 md:right-50 md:top-20 z-1"
              data-aos="fade-left"
              data-aos-delay="150"
            />
            <img
              src={AppMobile}
              alt="app-mobile"
              className="w-full max-w-xs lg:max-w-none"
              data-aos="fade-left"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col mt-90 md:mt-0 md:flex-row md:gap-40 justify-center items-center py-10 px-4 md:px-0">
        <div className="flex flex-col items-center" ref={usersRef}>
          <h1 className="text-4xl md:text-5xl font-semibold">
            {usersInView && (
              <CountUp start={0} end={13566} duration={3} separator="" />
            )}
          </h1>
          <hr className="w-12 md:w-16 lg:w-20 text-primary mt-4" />
          <p className="text-secondary text-lg md:text-xl py-2">Utilisateurs</p>
        </div>
        <div className="flex flex-col items-center" ref={modelsRef}>
          <h1 className="text-4xl md:text-5xl font-semibold">
            {modelsInView && (
              <CountUp start={0} end={4935} duration={3} separator="" />
            )}
          </h1>
          <hr className="w-12 md:w-16 lg:w-20 text-primary mt-4" />
          <p className="text-secondary text-lg md:text-xl py-2">Modèles</p>
        </div>
        <div className="flex flex-col items-center" ref={historyRef}>
          <h1 className="text-4xl md:text-5xl font-semibold">
            {historyInView && (
              <CountUp start={0} end={88209} duration={3} separator="" />
            )}
          </h1>
          <hr className="w-12 md:w-16 lg:w-20 text-primary mt-4" />
          <p className="text-secondary text-lg md:text-xl py-2">Historiques</p>
        </div>
      </div>
      <svg
        viewBox="0 0 1920 390"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3_2444)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1920 0C960 320 0 320 0 320H-960V640H2880V0H1920Z"
            fill="#F8F9FA"
          />
        </g>
        <defs>
          <clipPath id="clip0_3_2444">
            <rect width="1920" height="390" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <section className="bg-light">
        <div className="flex flex-col justify-center items-center px-4 md:px-0 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            La combinaison
            <span className="text-primary"> gagnante</span>
          </h1>
          <hr className="w-12 md:w-16 lg:w-20 text-primary mt-4" />
          <p className="text-center py-5 text-base md:text-lg lg:text-xl text-secondary w-full md:w-3/4 lg:w-2/3">
            Triumph Motorcycles offre une solution universelle en matière de
            suivi d'entretien moto, permettant aux passionnés de deux-roues
            d'enregistrer leur historique d'entretien en toute simplicité, tout
            en offrant aux professionnels la possibilité de suivre efficacement
            leur parc clients.
          </p>
        </div>
        <div>
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex flex-col items-center md:items-end mb-8 md:mb-0">
                <img
                  src={Manager}
                  alt="Le gérant"
                  className="w-24 h-24 md:w-35 md:h-35 mb-4"
                />
                <div className="text-center md:text-right">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Le gérant
                  </h3>
                  <p className="text-sm text-secondary">
                    Analyse efficacement son évolution grâce aux indicateurs
                    clés.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={RedirUser}
                  alt="Le motard"
                  className="w-24 h-24 md:w-35 md:h-35 mb-4"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Le motard
                  </h3>
                  <p className="text-sm text-secondary">
                    Surveille l'entretien de sa moto tout en ayant un atelier de
                    confiance.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center relative mt-8 mb-8">
              <img src={CombinationCircle} className="w-64 md:w-80 max-w-md" />
              <img
                src={LaptobWithLogo}
                alt="MotoBook App"
                className="w-40 md:w-60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex flex-col items-center md:items-end mb-8 md:mb-0">
                <img
                  src={Seller}
                  alt="Le commercial"
                  className="w-24 h-24 md:w-35 md:h-35 mb-4"
                />
                <div className="text-center md:text-right">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Le commercial
                  </h3>
                  <p className="text-sm text-secondary">
                    Propose un service complémentaire lors de l'achat d'un VN et
                    facilite la reprise des VO.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <img
                  src={Mechanic}
                  alt="Le vendeur atelier"
                  className="w-24 h-24 md:w-35 md:h-35 mb-4"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-semibold">
                    Le vendeur atelier
                  </h3>
                  <p className="text-sm text-secondary">
                    Augmente la valeur ajoutée de l'atelier en proposant les
                    fonctionnalités.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Overview;
