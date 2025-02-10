import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import partApi from "../api/rest";
import { Part, PartData } from "../types"; // Importe PartData depuis tes types
import { getDecodedToken } from "../../../utils";

interface PartFormProps {
  isOpen: boolean;
  onClose: () => void;
  part?: Part;
  mode: "add" | "edit";
}

// Utilise PartData directement au lieu de FormData
const PartForm: React.FC<PartFormProps> = ({
  isOpen,
  onClose,
  part,
  mode,
}) => {
  const [formData, setFormData] = useState<PartData>({
    id: "", 
    reference: "",
    name: "",
    description: "",
    currentStock: "", 
    alertThreshold: "", 
    unitPrice: "", 
    companyId: "",
  });

  const queryClient = useQueryClient();

  // Effet pour initialiser/réinitialiser le formulaire
  useEffect(() => {
    if (!isOpen) return;

    const user = getDecodedToken();
    const initialFormData: PartData = {
      id: "",
      reference: "",
      name: "",
      description: "",
      currentStock: "",
      alertThreshold: "",
      unitPrice: "",
      companyId: user.type.value === "DEALER" ? user.id : "",
    };

    if (mode === "edit" && part) {
      setFormData({
        id: part.id.toString(), // Convertit l'id en chaîne de caractères
        reference: part.reference,
        name: part.name,
        description: part.description,
        currentStock: part.currentStock,
        alertThreshold: part.alertThreshold,
        unitPrice: part.unitPrice,
        companyId:
          user.type.value === "DEALER" ? user.id : part.companyId.toString(),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, part, mode]);

  const addMutation = useMutation({
    mutationFn: (data: PartData) => partApi.createPart(data), // Utilise PartData ici
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      onClose();
      toast.success("Pièce ajoutée avec succès");
    },
    onError: (error) => {
      console.error("Erreur d'ajout:", error);
      toast.error("Erreur lors de l'ajout de la pièce");
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: PartData) => {
      if (!part?.id) throw new Error("ID manquant");
      return partApi.updatePart(part.id.toString(), data); // Utilise PartData ici
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      onClose();
      toast.success("Pièce modifiée avec succès");
    },
    onError: (error) => {
      console.error("Erreur de modification:", error);
      toast.error("Erreur lors de la modification de la pièce");
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

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Ajouter une pièce" : "Modifier la pièce"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Référence */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Référence</label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
            </div>

            {/* Stock actuel */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock actuel</label>
              <input
                type="text"
                name="currentStock" // Utilise currentStock
                value={formData.currentStock}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Seuil d'alerte */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Seuil d'alerte</label>
              <input
                type="text"
                name="alertThreshold" // Utilise alertThreshold
                value={formData.alertThreshold}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Prix unitaire */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Prix unitaire (€)</label>
              <input
                type="text"
                name="unitPrice" // Utilise unitPrice
                value={formData.unitPrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
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

export default PartForm;