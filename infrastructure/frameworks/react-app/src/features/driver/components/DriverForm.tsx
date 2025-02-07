import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { driverApi } from "../api/rest";
import { Driver } from "../types";
import { getDecodedToken } from "../../../utils";

interface DriverFormProps {
  isOpen: boolean;
  onClose: () => void;
  driver?: Driver;
  mode: "add" | "edit";
}

interface FormData {
  id?: string;
  companyId?: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseDate: string;
  experience?: string;
  status: "active" | "inactive";
}

const DriverForm: React.FC<DriverFormProps> = ({
  isOpen,
  onClose,
  driver,
  mode,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseDate: "",
    experience: "",
    status: "active",
    companyId: "",
  });

  const queryClient = useQueryClient();

  // Effet pour initialiser/réinitialiser le formulaire
  useEffect(() => {
    if (!isOpen) return; 

    const user = getDecodedToken();
    const initialFormData: FormData = {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      licenseDate: "",
      experience: "",
      status: "active",
      companyId: user.type.value === "COMPANY" ? user.id : "",
    };

    if (mode === "edit" && driver) {
      setFormData({
        id: driver.id.toString(),
        firstName: driver.firstName,
        lastName: driver.lastName,
        licenseNumber: driver.licenseNumber,
        licenseDate: driver.licenseDate.toString(),
        experience: driver.experience || "",
        status: driver.status as "active" | "inactive",
        companyId:
          user.type.value === "COMPANY" ? user.id : driver.companyId.toString(),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, driver, mode]);

  const addMutation = useMutation({
    mutationFn: (data: FormData) => driverApi.createDriver(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      onClose();
      toast.success("Conducteur ajouté avec succès");
    },
    onError: (error) => {
      console.error("Erreur d'ajout:", error);
      toast.error("Erreur lors de l'ajout du conducteur");
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => {
      if (!driver?.id) throw new Error("ID du conducteur manquant");
      return driverApi.updateDriver(driver.id.toString(), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      onClose();
      toast.success("Conducteur modifié avec succès");
    },
    onError: (error) => {
      console.error("Erreur de modification:", error);
      toast.error("Erreur lors de la modification du conducteur");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      addMutation.mutate(formData);
    } else {
      editMutation.mutate(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const processedValue = type === "number" ? Number(value) : value;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: processedValue,
      };
      return newData;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Ajouter un conducteur" : "Modifier le conducteur"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Numéro de licence */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro de licence
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Date de licence */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date de licence
              </label>
              <input
                type="date"
                name="licenseDate"
                value={formData.licenseDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Expérience */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expérience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              {mode === "add" ? "Ajouter" : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
