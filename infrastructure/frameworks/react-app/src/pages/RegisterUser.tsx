import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RegisterUser: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    // Vérification si les mots de passe sont identiques
    setPasswordMatch(e.target.value === password);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
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

      <div className="z-10 p-6 bg-white shadow-2xl rounded-lg max-w-sm md:max-w-md lg:max-w-lg my-10">
        <div className="w-full p-2 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-1 text-2xl font-semibold sm:text-2xl text-center">
            Inscription <span className="text-primary">Rider</span>
            <hr className="w-20 h-0.5 bg-primary my-4 border-none mx-auto" />
          </h2>

          <form>
            <div className="mb-4">
              <label className="mb-2.5 block  text-black text-sm">Nom</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: DIO"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block  text-black  text-sm">Prénom</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Goku"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block  text-black text-sm ">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="exemple@gmail.com"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block  text-black text-sm">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter votre mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                />
                <span
                  className="absolute right-4 top-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye className="text-zinc-500" /> : <FaEyeSlash className="text-zinc-500" />}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block  text-black text-sm">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirmer votre mot de passe"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`w-full rounded-lg border ${passwordMatch ? 'border-stroke' : 'border-red-500'} bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
                />
                <span
                  className="absolute right-4 top-5 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEye className="text-zinc-500" /> : <FaEyeSlash className="text-zinc-500" />}
                </span>
              </div>
              {!passwordMatch && <p className="text-red-500 text-sm">Les mots de passe ne correspondent pas.</p>}
            </div>
            <div className="mb-5">
              <input
                type="submit"
                value="S'inscrire"
                className="w-full cursor-pointer rounded-lg border border-primary bg-btn-primary p-4 text-white transition hover:bg-opacity-90"
              />
            </div>
            <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_191_13499)">
                      <path
                        d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_191_13499">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Se connecter avec Google
              </button>
  
              <div className="mt-6 text-center text-sm text-slate-300">
                <p>
                Déjà inscrit ? {" "}
                  <Link to="/login" className="text-primary">
                  Se connecter
                  </Link>
                </p>
              </div>
          </form>
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

export default RegisterUser;
