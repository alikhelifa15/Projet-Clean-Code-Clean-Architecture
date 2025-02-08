import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { testMotoApi } from "../api/rest";
import { TestMoto } from "../types";
import { getDecodedToken } from "../../../utils";
import { useMotorcyclesByDealer } from "../../motos/hooks/useMotorcyclesByDealer";
import { useMotorcyclesByCompany } from "../../motos/hooks/useMotorcyclesByCompany";
import { useDriversByCompany } from "../hooks/useDriversByCompany";
import { useClientsByDealer } from "../../clients/hooks/useClientsByDealer";

interface TestMotoFormProps {
  isOpen: boolean;
  onClose: () => void;
  testMoto?: TestMoto;
  mode: "add" | "edit";
}

interface FormData {
  id?: string;
  motorcycle_id: string;
  driver_id?: string;
  client_id?: string;
  start_date: string;
  end_date?: string;
  starting_mileage: number;
  ending_mileage?: number;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  comments?: string;
}

// Définition des types pour les données des motos
interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  serialNumber: string;
  photo: string;
}

interface Driver {
  id: string;
  firstName: string;
  lastName: string;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
}

const TestMotoForm: React.FC<TestMotoFormProps> = ({
  isOpen,
  onClose,
  testMoto,
  mode,
}) => {
  const [formData, setFormData] = useState<FormData>({

    motorcycle_id: "",
    driver_id: "",
    client_id: "",
    start_date: "",
    starting_mileage: 0,
    status: "scheduled",
    comments: "",
  });

  const user = getDecodedToken();
  const queryClient = useQueryClient();

  const motorcyclesByCompanyQuery = useMotorcyclesByCompany(user.id);
  const motorcyclesByDealerQuery = useMotorcyclesByDealer(user.id);
  const driversQuery = useDriversByCompany(user.id);
  const clientsQuery = useClientsByDealer(user.id);

  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && testMoto) {
      setFormData({
        id: testMoto.id,
        motorcycle_id: testMoto.motoId,
        driver_id: testMoto.driverId,
        client_id: testMoto.clientId,
        start_date: testMoto.startDate,
        end_date: testMoto.endDate,
        starting_mileage: testMoto.startingMileage,
        ending_mileage: testMoto.endingMileage,
        comments: testMoto.comments,
        status: testMoto.status as
          | "scheduled"
          | "in_progress"
          | "completed"
          | "cancelled",
      });
    } else {
      setFormData({
        motorcycle_id: "",
        start_date: "",
        starting_mileage: 0,
        status: "scheduled",
      });
    }
  }, [isOpen, testMoto, mode]);

  const addMutation = useMutation({
    mutationFn: (data: FormData) => testMotoApi.createTestMoto(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testMotos"] });
      onClose();
      toast.success("Test ajouté avec succès");
    },
    onError: (error) => {
      console.error("Erreur d'ajout:", error);
      toast.error("Erreur lors de l'ajout du test");
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => {
      if (!testMoto?.id) throw new Error("ID de test manquant");
      return testMotoApi.updateTestMoto(testMoto.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testMotos"] });
      onClose();
      toast.success("Test modifié avec succès");
    },
    onError: (error) => {
      console.error("Erreur de modification:", error);
      toast.error("Erreur lors de la modification du test");
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  if (!isOpen) return null;

  const motorcycles = (
    user.type.value === "COMPANY"
      ? motorcyclesByCompanyQuery.data?.motorcyclesByCompany
      : motorcyclesByDealerQuery.data?.motorcyclesByDealer
  ) as Motorcycle[] | undefined;

  const drivers = driversQuery.data?.driversByCompany as Driver[] | undefined;
  const clients = clientsQuery.data?.clientsByDealer as Client[] | undefined;
  const selectedMoto = motorcycles?.find(
    (moto) => moto.id === formData.motorcycle_id
  );
  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Ajouter un test" : "Modifier le test"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Moto
              </label>
              <div className="space-y-2">
                <select
                  name="motorcycle_id"
                  value={formData.motorcycle_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  required
                >
                  <option value="">Sélectionnez une moto</option>
                  {motorcycles?.map((moto: Motorcycle) => (
                    <option key={moto.id} value={moto.id}>
                      {moto.brand} {moto.model} - {moto.serialNumber}
                    </option>
                  ))}
                </select>
                {selectedMoto?.photo && (
                  <div className="mt-2">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={selectedMoto.photo}
                        alt={`${selectedMoto.brand} ${selectedMoto.model}`}
                        className="w-40 h-28 object-cover rounded-lg border border-gray-200"
                      />
                      <p className="text-sm text-gray-600">
                        {selectedMoto.brand} {selectedMoto.model}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {user.type.value === "COMPANY" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Conducteur
                </label>
                <select
                  name="driver_id"
                  value={formData.driver_id || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Sélectionnez un conducteur</option>
                  {drivers?.map((driver: Driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.firstName} {driver.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {user.type.value === "DEALER" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client
                </label>
                <select
                  name="client_id"
                  value={formData.client_id || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Sélectionnez un client</option>
                  {clients?.map((client: Client) => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* Rest of the form remains the same */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date de début
              </label>
              <input
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kilométrage initial
              </label>
              <input
                type="number"
                name="starting_mileage"
                value={formData.starting_mileage}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
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
                <option value="scheduled">Planifié</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Commentaires
              </label>
              <textarea
                name="comments"
                value={formData.comments || ""}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                rows={3}
              />
            </div>
          </div>

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

export default TestMotoForm;
