import unauthorizedImgage from "../../assets/unauthorized.png" 
import ButtonPrimary from "../../components/Button/ButtonPrimary";

const Unauthorized: React.FC = () => {
    return (
        <>
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
        <div className="w-full p-2 sm:p-12.5 xl:p-17.5 flex flex-col items-center justify-center">
          <h2 className="mb-1 text-2xl font-semibold sm:text-2xl text-center">
            Ooops,page <span className="text-primary">introuvable</span>
            <hr className="w-20 h-0.5 bg-primary my-4 border-none mx-auto" />
          </h2>
          <img src={unauthorizedImgage} alt=" unauthorized.png" />
          <h3 className=" text-center text-xs my-5">Il semblerait que tu tentes d'accéder à une page non existante.</h3>
        <ButtonPrimary to="/" > 
          Retour à l'accueil    
        </ButtonPrimary>
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
        </>
    );
}    
export default Unauthorized