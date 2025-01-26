import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from '../hooks/useRegister';
import type { DealerRegistrationData } from '../types';
import { toast } from 'react-toastify';
import {
  dealerSignupSchema,
  type DealerSignupFormData,
  type FormErrors,
} from "../validation/validateFromDealer";
import { z } from "zod";

const SignupFormDealer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DealerSignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    services: "CONCESSIONNAIRE MOTO",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    passwordVisible: false,
    confirmPasswordVisible: false
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { registerDealer, isLoading, error } = useRegister();

  const isFormComplete = (data: DealerSignupFormData): boolean => {
    const requiredFields: (keyof DealerSignupFormData)[] = [
      "email",
      "password",
      "confirmPassword",
      "name",
      "services",
      "phone",
      "address",
      "postalCode",
      "city",
    ];

    return requiredFields.every((field) => {
      const value = data[field];
      return value !== undefined && value !== "";
    });
  };

  const validateField = (
    name: keyof DealerSignupFormData,
    value: string | boolean
  ) => {
    try {
      const partialData = {
        ...formData,
        [name]: value,
      };

      const fieldsToValidate = new Set([name]);
      if (name === "password" || name === "confirmPassword") {
        fieldsToValidate.add("password");
        fieldsToValidate.add("confirmPassword");
      }

      const schemaFields: { [K in keyof DealerSignupFormData]?: z.ZodType } = {};

      Array.from(fieldsToValidate).forEach((field) => {
        switch (field) {
          case "email":
            schemaFields.email = z
              .string()
              .min(1, "L'email est requis")
              .email("Format d'email invalide");
            break;
          case "password":
            schemaFields.password = z
              .string()
              .min(8, "Le mot de passe doit contenir au moins 8 caractères")
              .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
              );
            break;
          case "confirmPassword":
            schemaFields.confirmPassword = z.string();
            break;
          case "name":
            schemaFields.name = z
              .string()
              .min(2, "Le nom d'enseigne doit contenir au moins 2 caractères")
              .max(100, "Le nom d'enseigne ne peut pas dépasser 100 caractères");
            break;
          case "phone":
            schemaFields.phone = z
              .string()
              .regex(
                /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                "Numéro de téléphone invalide"
              );
            break;
          case "address":
            schemaFields.address = z
              .string()
              .min(5, "L'adresse doit contenir au moins 5 caractères")
              .max(200, "L'adresse ne peut pas dépasser 200 caractères");
            break;
          case "postalCode":
            schemaFields.postalCode = z
              .string()
              .regex(
                /^\d{5}$/,
                "Le code postal doit contenir exactement 5 chiffres"
              );
            break;
          case "city":
            schemaFields.city = z
              .string()
              .min(2, "Le nom de la ville doit contenir au moins 2 caractères")
              .max(50, "Le nom de la ville ne peut pas dépasser 50 caractères");
            break;
        }
      });

      let partialSchema = z.object(schemaFields);

      if (
        fieldsToValidate.has("password") &&
        fieldsToValidate.has("confirmPassword")
      ) {
        partialSchema = partialSchema.extend({
          password: z.string(),
          confirmPassword: z.string()
        }).refine(
          (data) => data.password === data.confirmPassword,
          {
            message: "Les mots de passe ne correspondent pas",
            path: ["confirmPassword"],
          }
        );
      }

      const dataToValidate = Array.from(fieldsToValidate).reduce(
        (acc, field) => ({
          ...acc,
          [field]: partialData[field],
        }),
        {}
      );

      const result = partialSchema.safeParse(dataToValidate);

      if (result.success) {
        const newErrors = { ...formErrors };
        fieldsToValidate.forEach((field) => {
          delete newErrors[field as keyof DealerSignupFormData];
        });
        setFormErrors(newErrors);
        return true;
      } else {
        const newErrors = { ...formErrors };
        result.error.errors.forEach((error) => {
          const field = error.path[0] as keyof DealerSignupFormData;
          if (fieldsToValidate.has(field)) {
            newErrors[field] = error.message;
          }
        });
        setFormErrors(newErrors);
        return false;
      }
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    validateField(name as keyof DealerSignupFormData, newValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = dealerSignupSchema.parse(formData);

      const registrationData: DealerRegistrationData = {
        email: validatedData.email,
        password: validatedData.password,
        type: 'DEALER',
        additionalData: {
          name: validatedData.name,
          services: validatedData.services,
          phone: validatedData.phone,
          address: validatedData.address,
          postalCode: validatedData.postalCode,
          city: validatedData.city
        }
      };

      await registerDealer(registrationData);
      toast.success('Compte créé avec succès ! Vous allez être redirigé vers la page de connexion.', {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof DealerSignupFormData] = err.message;
          }
        });
        setFormErrors(errors);
        toast.error('Erreur lors de la validation du formulaire', {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.error("Erreur lors de l'inscription:", error);
        toast.error('Erreur lors de la création du compte', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const renderInput = (
    name: keyof DealerSignupFormData,
    label: string,
    type: string = "text",
    placeholder: string
  ) => (
    <div className="mb-4">
      <label className="mb-2.5 block text-black text-sm">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={formData[name] as string}
          onChange={handleChange}
          placeholder={placeholder}
          required
          className={`w-full rounded-lg border ${
            formErrors[name] ? "border-red-500" : "border-stroke"
          } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
        />
      </div>
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  const renderPasswordInput = (
    name: "password" | "confirmPassword",
    label: string,
    visibilityKey: "passwordVisible" | "confirmPasswordVisible"
  ) => (
    <div className="mb-6">
      <label className="mb-2.5 block text-black text-sm">{label}</label>
      <div className="relative">
        <input
          type={formData[visibilityKey] ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={
            name === "password"
              ? "Entrer votre mot de passe"
              : "Confirmer votre mot de passe"
          }
          className={`w-full rounded-lg border ${
            formErrors[name] ? "border-red-500" : "border-stroke"
          } bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
        />
        <span
          className="absolute right-4 top-5 cursor-pointer"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              [visibilityKey]: !prev[visibilityKey],
            }))
          }
        >
          {formData[visibilityKey] ? (
            <FaEye className="text-zinc-500" />
          ) : (
            <FaEyeSlash className="text-zinc-500" />
          )}
        </span>
      </div>
      {formErrors[name] && (
        <p className="text-red-500 text-sm mt-1">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderInput("name", "Nom d'enseigne", "text", "Ex: Ma Société")}
      {renderInput("phone", "Téléphone", "tel", "0751458789")}
      {renderInput("email", "E-mail", "email", "exemple@gmail.com")}
      {renderInput("address", "Adresse", "text", "1 rue de la paix")}
      {renderInput("postalCode", "Code postal", "text", "75000")}
      {renderInput("city", "Ville", "text", "Paris")}

      {renderPasswordInput("password", "Mot de passe", "passwordVisible")}
      {renderPasswordInput(
        "confirmPassword",
        "Confirmer le mot de passe",
        "confirmPasswordVisible"
      )}

      {error && (
        <div className="mb-4 text-red-500 text-sm">{error.message}</div>
      )}

      <div className="mb-5">
        <button
          type="submit"
          disabled={
            isLoading ||
            Object.keys(formErrors).length > 0 ||
            !isFormComplete(formData)
          }
          className="w-full cursor-pointer rounded-lg border border-primary bg-btn-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-slate-300">
        <p>
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-primary">
            Se connecter
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupFormDealer;