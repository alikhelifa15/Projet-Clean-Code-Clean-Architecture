import React, { useState } from "react";
import DealerImage from "../../assets/Register/exchange.png";
import ComanyImage from "../../assets/Register/settings.png";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<string>("dealer");

  const profiles = [
    {
      id: "dealer",
      title: "Concessionnaire",
      image: DealerImage,
    },
    {
      id: "company",
      title: "Entreprise",
      image: ComanyImage,
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* SVG en haut à droite */}
      <svg
        viewBox="0 0 723 569"
        fill="none"
        className="absolute w-full max-w-md md:max-w-lg lg:max-w-xl opacity-15 -top-10 -right-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M703.969 241.602l-.006-.003C716.081 262.97 723 287.677 723 314c0 68.917-47.425 126.757-111.42 142.665L246.7 556.937C226.465 564.729 204.481 569 181.5 569 81.26 569 0 487.74 0 387.5c0-34.256 9.49-66.296 25.985-93.633l-.016.008L141.512 77.548C162.753 33.305 207.123 2.273 258.951.12l.008-.12h251.04l.003.01c41.848.557 78.081 24.378 96.356 59.12l.001-.005 97.61 182.477z"
          fill="#F27F18"
        ></path>
      </svg>

      {/* Contenu principal */}
      <div className="z-10 p-6 bg-white shadow-2xl rounded-lg max-w-sm md:max-w-md lg:max-w-lg my-10">
        <div className="w-full p-2 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-1 text-2xl font-semibold sm:text-2xl text-center">
            Sélectionne ton <span className="text-primary">Profil</span>
            <hr className="w-20 h-0.5 bg-primary my-4 border-none mx-auto" />
          </h2>

          <p className="text-zinc-300 text-sm my-10 text-center">
            Cela définira l'usage de ton compte 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`relative cursor-pointer rounded-lg p-6 border-2 border-zinc-300 transition-all duration-200 ${
                  selectedProfile === profile.id
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                onClick={() => setSelectedProfile(profile.id)}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={profile.image}
                    alt={profile.title}
                    className="w-32 h-32 mb-4"
                  />
                  <h3 className="text-lg font-medium text-zinc-300">
                    {profile.title}
                  </h3>
                </div>
                {selectedProfile === profile.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Link
            to={`/register/${selectedProfile}`}
            className={`w-64 flex items-center flex-row justify-center m-auto py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedProfile
                ? "bg-btn-primary text-white hover:bg-orange-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Suivant
          </Link>
        </div>
      </div>

      {/* SVG en bas à gauche */}
      <svg
        viewBox="0 0 723 569"
        fill="none"
        className="absolute w-full max-w-md md:max-w-lg lg:max-w-xl opacity-15  -bottom-20 -left-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M703.969 241.602l-.006-.003C716.081 262.97 723 287.677 723 314c0 68.917-47.425 126.757-111.42 142.665L246.7 556.937C226.465 564.729 204.481 569 181.5 569 81.26 569 0 487.74 0 387.5c0-34.256 9.49-66.296 25.985-93.633l-.016.008L141.512 77.548C162.753 33.305 207.123 2.273 258.951.12l.008-.12h251.04l.003.01c41.848.557 78.081 24.378 96.356 59.12l.001-.005 97.61 182.477z"
          fill="#dee2e6"
        ></path>
      </svg>
    </div>
  );
};

export default Register;
