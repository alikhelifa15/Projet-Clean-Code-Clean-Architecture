import React from "react";
import Appstore from "../../assets/footer/appstore.png";
import Playstore from "../../assets/footer/Playstore.png";
import { Link } from "react-router-dom";
import Logo from "../../assets/footer/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className=" relative mt-10 ">
        <svg
          className="w-full "
          viewBox="0 0 1920 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_1313)">
            <path
              d="M-960 64H2880V0H1920C963.333 69.3333 0 0 0 0H-960V64Z"
              fill="#212529"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_1313">
              <rect width="1920" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      <section className="bottom-0 right-0 left-0 pt-6 bg-dark md:pt-8">
        <div className="relative z-1 pb-6 md:pb-8  text-white">
          <div className="w-full md:px-50 ">
            <div className="flex flex-col pb-10 items-center md:flex-row md:justify-between border-b-2 border-white  ">
              <div>
                <h3 className="font-bold mb-1 text-xl  ">
                  Disponible sur toutes les plateformes
                </h3>
                <p className="font-thin text-sm text-secondary pb-2">
                  Au format web et applicatif
                </p>
              </div>
              <div className="flex flex-row gap-5">
                <a href="#" rel="noopener noreferrer">
                  <img src={Appstore} alt="Appstore" />
                </a>
                <a href="#" rel="noopener noreferrer">
                  <img src={Playstore} alt="Playstore" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-dark py-10 md:pt-6">
        <div className="w-full flex flex-col  md:flex-row justify-around md:px-40">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Link to={"/"} rel="stylesheet">
              <img src={Logo} alt="" className="w-32 h-16 md:w-40 md:h-20" />
            </Link>
            <div className="flex flex-row justify-between w-40 mt-4">
              <Link to={"/"} rel="stylesheet">
                <FaFacebook color="white" size={20} />
              </Link>
              <Link to={"/"} rel="stylesheet">
                <FaTwitter color="white" size={20} />
              </Link>
              <Link to={"/"} rel="stylesheet">
                <FaInstagram color="white" size={20} />
              </Link>
            </div>
            <p className="text-sm text-secondary hover:text-white mt-4 text-center md:text-left">
              2024 Copyright ©Triumph.app
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="font-bold text-white text-xl">Solutions</h3>
            <div className="flex flex-col ">
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Pro Edition
              </Link>
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Rider Edition
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="font-semibold text-white text-xl">Services</h3>
            <div className="flex flex-col ">
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Connexion
              </Link>
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Inscription
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="font-bold text-white text-xl">Informations</h3>
            <div className="flex flex-col ">
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Mises à jour
              </Link>
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Légal */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white text-xl">Légal</h3>
            <div className="flex flex-col ">
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                Mentions légales
              </Link>
              <Link
                to={"/"}
                rel="stylesheet"
                className="text-sm text-secondary hover:text-white"
              >
                CGV & CGU
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
