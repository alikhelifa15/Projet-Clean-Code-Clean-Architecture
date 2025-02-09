import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { incidentApi } from "../api/rest";
import { useTestMotosByCompany } from "../../TestMoto/hooks/useTestMotosByCompany";
import { useTestMotosByDealer } from "../../TestMoto/hooks/useTestMotosByDealer";
import { getDecodedToken } from "../../../utils";

interface IncidentFormProps {
  isOpen: boolean;
  onClose: () => void;
  incident?: any;
  mode: "add" | "edit";
}

interface FormData {
  test_id: string;
  incident_date: string;
  type: "accident" | "infraction" | "technical" | "other";
  severity: "Faible" | "Moyen" | "Élevé";
  description?: string;
  actions_taken?: string;
}

const IncidentForm: React.FC<IncidentFormProps> = ({
  isOpen,
  onClose,
  incident,
  mode,
}) => {
  const [formData, setFormData] = useState<FormData>({
    test_id: "",
    incident_date: new Date().toISOString().slice(0, 16),
    type: "accident",
    severity: "Faible",
    description: "",
    actions_taken: "",
  });

  const user = getDecodedToken();
  const queryClient = useQueryClient();

  const testsByCompanyQuery = useTestMotosByCompany(user.id);
  const testsByDealerQuery = useTestMotosByDealer(user.id);
  const testsQuery =
    user.type.value === "COMPANY" ? testsByCompanyQuery : testsByDealerQuery;

  useEffect(() => {
    if (mode === "edit" && incident) {
      setFormData({
        test_id: incident.test_Id,
        incident_date: incident.incident_Date,
        type: incident.type,
        severity: incident.severity,
        description: incident.description || "",
        actions_taken: incident.actions_Taken || "",
      });
    }
  }, [incident, mode]);

  const addMutation = useMutation({
    mutationFn: (data: FormData) => incidentApi.createIncident(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      onClose();
      toast.success("Incident ajouté avec succès");
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) =>
      incidentApi.updateIncident(incident?.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      onClose();
      toast.success("Incident modifié avec succès");
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  const tests =
    user.type.value === "COMPANY"
      ? testsQuery.data?.testsByCompany
      : testsQuery.data?.testsByDealer;

  return (
    <div className="fixed  z-99999  bg-black bg-opacity-50 flex items-center justify-center top-20">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === "add" ? "Ajouter un incident" : "Modifier l'incident"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Test associé
              </label>
              <select
                name="test_id"
                value={formData.test_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="">Sélectionnez un test</option>
                {tests?.map(
                  (test: {
                    id: number;
                    motorcycle: { brand: string; model: string };
                    driver?: { firstName: string; lastName: string };
                    client?: { firstName: string; lastName: string };
                  }) => (
                    <option key={test.id} value={test.id}>
                      {test.motorcycle?.brand} {test.motorcycle?.model} -{" "}
                      {user.type.value === "COMPANY"
                        ? `${test.driver?.firstName} ${test.driver?.lastName}`
                        : `${test.client?.firstName} ${test.client?.lastName}`}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date de l'incident
              </label>
              <input
                type="datetime-local"
                name="incident_date"
                value={formData.incident_date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="accident">Accident</option>
                <option value="infraction">Infraction</option>
                <option value="technical">Technique</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sévérité
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              >
                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Élevé">Élevé</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Actions prises
              </label>
              <textarea
                name="actions_taken"
                value={formData.actions_taken}
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

export default IncidentForm;
