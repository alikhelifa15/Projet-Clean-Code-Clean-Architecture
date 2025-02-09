import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import  maintenanceApi  from "../api/rest";
import  partApi  from "../../parts/api/rest";
import { FaTrash } from 'react-icons/fa';
import { useParts } from "../../parts/hooks/useParts";
import { useParams } from "react-router-dom";

interface MaintenanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  maintenance?: any; 
  mode: "add" | "edit";
}

interface FormData {
  motorcycleId: string;
  maintenanceDate: string;
  type: string;
  description: string;
  totalCost: number;
  recommendations: string;
  status: "En cours" | "Terminé" | "programmé" | "Annulé" ;
  usedParts: Array<{
    partId: string;
    name: string;
    unitPrice: number;
    quantity: number;
  }>;
}

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ isOpen, onClose, maintenance, mode }) => {
    const params = useParams();
    const id = params.idmoto || "";
  const [formData, setFormData] = useState<FormData>({
    motorcycleId:  id,
    maintenanceDate: new Date().toISOString().split("T")[0],
    type: "",
    description: "",
    totalCost: 0,
    recommendations: "",
    status: "En cours",
    usedParts: [],
  });

  const [selectedPart, setSelectedPart] = useState(null);
  const [updatPart, setupdatePart] = useState<Array<{ partId: string; name: string; unitPrice: number; quantity: number }> | null>(null);
  const [quantity, setQuantity] = useState(1);

  const queryClient = useQueryClient();
  const { data, isLoading, isError } =  useParts();
  const parts = data?.parts ?? [];
  
  useEffect(() => {

  }, [data]);
  
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "add") {
      setFormData({
        motorcycleId: id,
        maintenanceDate: new Date().toISOString().split("T")[0],
        type: "",
        description: "",
        totalCost: 0,
        recommendations: "",
        status: "En cours",
        usedParts: [],
      });
    }
    if (mode === "edit" && maintenance) {
      setFormData({
        motorcycleId: maintenance.motorcycleId,
        maintenanceDate: maintenance.maintenanceDate,
        type: maintenance.type,
        description: maintenance.description,
        totalCost: maintenance.totalCost,
        recommendations: maintenance.recommendations,
        status: maintenance.status,
        usedParts: maintenance.usedParts || [],
      });
    }
  }, [isOpen, maintenance, mode]);
 console.log(data);
 const addMutation = useMutation({
  
  mutationFn: async (data: FormData) => { 
    const partsToUpdate = data.usedParts || [];
    setupdatePart(partsToUpdate);
    return maintenanceApi.createMaintenance(data);
  },
  onSuccess: async (data: FormData) => {
    try {
      if (!updatPart || updatPart.length === 0) {
        return;
      }
      await Promise.all(
        updatPart?.map(async (partItem) => {
          const partToUpdate = parts.find((part: any) => part.id === partItem.partId);
          if (partToUpdate) {
            console.log(`🔄 Mise à jour de la pièce ${partToUpdate.id}`);
            await partApi.updatePart(partToUpdate.id, {
              ...partToUpdate,
              currentStock: Number(partToUpdate.currentStock) - Number(partItem.quantity),
            });
          }
        })
      );
      queryClient.invalidateQueries({ queryKey: ["maintenances"] });
      queryClient.invalidateQueries({ queryKey: ["parts"] });
      onClose();
      toast.success("Entretien ajouté et stock des pièces mis à jour");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du stock");
    }
  },
  onError: () => toast.error("Erreur lors de l'ajout de l'entretien"),
});

  const editMutation = useMutation({
    // mutationFn: (data: FormData) => maintenanceApi.updateMaintenance(data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["maintenances"] });
    //   onClose();
    //   toast.success("Entretien modifié avec succès");
    // },
    // onError: () => toast.error("Erreur lors de la modification de l'entretien"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      addMutation.mutate(formData);
    } else {
      editMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handlePartSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('from handlePartSelect', e.target.value);
    
    const partId = e.target.value;
    const part = parts?.find((p:any) => p.id === partId);
    console.log('found handlePartSelect', part);
    
    setSelectedPart(part);
    setQuantity(1);
  };

  const handleAddPart = () => {
    if (!selectedPart) return;
    const newPart = {
      partId: selectedPart.id,
      name: selectedPart.name,
      unitPrice: selectedPart.unitPrice,
      quantity,
    };

    setFormData((prev) => ({
      ...prev,
      usedParts: [...prev.usedParts, newPart],
      totalCost: prev.totalCost + newPart.unitPrice * quantity,
    }));
    setSelectedPart(null);
    setQuantity(1);
  };

  const handleDeletePart = (index: number) => {
    const partToDelete = formData.usedParts[index];
  const updatedParts = [...formData.usedParts];
  updatedParts.splice(index, 1); // Supprime l'élément à l'index donné

  // Met à jour le coût total en soustrayant le coût de la pièce supprimée
  setFormData((prev) => ({
    ...prev,
    usedParts: updatedParts,
    totalCost: prev.totalCost - partToDelete.unitPrice * partToDelete.quantity,
  }));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">{mode === "add" ? "Ajouter un entretien" : "Modifier un entretien"}</h2>
       <h2><p>ID du véhicule : {formData.motorcycleId}</p></h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
           
            <div>
              <label className="block text-sm font-medium text-gray-700">Date d'entretien</label>
              <input
                type="date"
                name="maintenanceDate"
                value={formData.maintenanceDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type d'entretien</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
           
          </div>

          <div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <label className="block text-sm font-medium text-gray-700">Pièces utilisées</label>
            <select onChange={handlePartSelect} className="mt-1 block w-full rounded-md border border-gray-300 p-2">
           
              <option value="">Sélectionner une pièce</option>
              {parts?.map((part:any) => (
                <option key={part.id} value={part.id}>
                  {part.name} {part.reference} - {part.unitPrice} € / {part.currentStock} en stock
                </option>
              ))}
            </select>
            {selectedPart && (
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border p-2 w-20"
                />
                <button type="button" onClick={handleAddPart} className="bg-blue-500 text-white p-2 rounded">
                  Ajouter
                </button>
              </div>
            )}
                    <ul>
            {formData.usedParts.map((part, index) => (
            <li key={index} className="flex justify-between items-center">
                <span>
                {part.name} x {part.quantity} - {part.unitPrice * part.quantity}€
                </span>
                <button
                onClick={() => handleDeletePart(index)} 
                className="flex  text-red-500 hover:text-red-700 ml-2"
                >
                <FaTrash className="flex justify-end " />
                </button>
                <hr />
            </li>
            ))}
        </ul>
          </div>

          <p>Total: <strong>{formData.totalCost}€</strong> </p>

          <textarea
            name="recommendations"
            placeholder="Recommandations"
            value={formData.recommendations}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          >
            <option value="En cours">En cours</option>
            <option value="programmé">programmé</option>
            <option value="Terminé">Terminé</option>
            <option value="Annulé">Annulé</option>
          </select>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              {mode === "add" ? "Ajouter" : "Modifier"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
