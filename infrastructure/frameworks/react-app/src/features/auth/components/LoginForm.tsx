import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";
import { DecodedUser } from "../types";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordVisible: false,
  });

  const { login, isLoading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      passwordVisible: !prev.passwordVisible,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData: LoginData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await login(loginData);
      if (response?.token) {
        const decodedToken: DecodedUser = jwtDecode(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", decodedToken.type.value);
        
        toast.success('Connexion réussie !', {
          position: "top-right",
          autoClose: 2000
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error('Échec de la connexion. Veuillez vérifier vos identifiants.', {
        position: "top-right",
        autoClose: 3000
      });
      console.error("Erreur de connexion:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black">Email</label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter votre email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
          <span className="absolute right-4 top-4">
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5">
                <path
                  d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                  fill=""
                />
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black">
          Mot de passe
        </label>
        <div className="relative">
          <input
            type={formData.passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter votre mot de passe"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
          />
          <span
            className="absolute right-4 top-5 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {formData.passwordVisible ? (
              <FaEye className="text-zinc-500" />
            ) : (
              <FaEyeSlash className="text-zinc-500" />
            )}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-red-500 text-sm">
          Identifiants incorrects. Veuillez réessayer.
        </div>
      )}

      <div className="flex justify-center">
        <Link to="/" className="text-primary text-sm mb-5">
          Mot de passe oublié ?
        </Link>
      </div>

      <div className="mb-5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg border border-primary bg-btn-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-slate-300">
        <p>
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-primary">
            S'inscrire
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
