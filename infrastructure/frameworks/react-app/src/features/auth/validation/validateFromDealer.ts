import { z } from "zod";

export const dealerSignupSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide"),
  
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
  
  confirmPassword: z.string(),
  
  name: z
    .string()
    .min(2, "Le nom d'enseigne doit contenir au moins 2 caractères")
    .max(100, "Le nom d'enseigne ne peut pas dépasser 100 caractères"),
  
  services: z.string(),
  
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      "Numéro de téléphone invalide"
    ),
  
  address: z
    .string()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères"),
  
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Le code postal doit contenir exactement 5 chiffres"),
  
  city: z
    .string()
    .min(2, "Le nom de la ville doit contenir au moins 2 caractères")
    .max(50, "Le nom de la ville ne peut pas dépasser 50 caractères"),
  
  passwordVisible: z.boolean(),
  confirmPasswordVisible: z.boolean()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export type DealerSignupFormData = z.infer<typeof dealerSignupSchema>;
export type FormErrors = Partial<Record<keyof DealerSignupFormData, string>>;