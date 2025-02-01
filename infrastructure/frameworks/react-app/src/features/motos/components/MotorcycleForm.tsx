import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { motorcycleApi } from '../api/rest';
import { Motorcycle } from '../types';
import { getDecodedToken } from '../../../utils';

interface MotorcycleFormProps {
  isOpen: boolean;
  onClose: () => void;
  motorcycle?: Motorcycle;
  mode: 'add' | 'edit';
}

interface FormData {
  id?: string;
  companyId?: string;
  dealerId?: string;
  serialNumber: string;
  model: string;
  brand: string;
  status: 'active' | 'maintenance' | 'inactive';
  mileage: number;
  maintenanceInterval: number;
  photo: string;
}

const MotorcycleForm: React.FC<MotorcycleFormProps> = ({ isOpen, onClose, motorcycle, mode }) => {

  const [formData, setFormData] = useState<FormData>({
    serialNumber: '',
    model: '',
    brand: '',
    status: 'active',
    mileage: 0,
    maintenanceInterval: 0,
    photo: '',
    companyId: '',
    dealerId: '',
  });

  const queryClient = useQueryClient();

  // Effet pour initialiser/réinitialiser le formulaire
  useEffect(() => {
    if (!isOpen) return; // Ne rien faire si le modal est fermé

    const user = getDecodedToken();
    const initialFormData: FormData = {
      serialNumber: '',
      model: '',
      brand: '',
      status: 'active',
      mileage: 0,
      maintenanceInterval: 0,
      photo: '',
      companyId: user.type.value === 'COMPANY' ? user.id : '',
      dealerId: user.type.value === 'DEALER' ? user.id : '',
    };

    if (mode === 'edit' && motorcycle) {
      setFormData({
        id: motorcycle.id.toString(),
        serialNumber: motorcycle.serialNumber,
        model: motorcycle.model,
        brand: motorcycle.brand,
        status: motorcycle.status,
        mileage: motorcycle.mileage,
        maintenanceInterval: motorcycle.maintenanceInterval,
        photo: motorcycle.photo,
        companyId: user.type.value === 'COMPANY' ? user.id : motorcycle.companyId,
        dealerId: user.type.value === 'DEALER' ? user.id : motorcycle.dealerId,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, motorcycle, mode]);

  const addMutation = useMutation({
    mutationFn: (data: FormData) => motorcycleApi.createMotorcycle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motorcycles'] });
      onClose();
      toast.success('Moto ajoutée avec succès');
    },
    onError: (error) => {
      console.error('Erreur d\'ajout:', error);
      toast.error('Erreur lors de l\'ajout de la moto');
    }
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => {
      if (!motorcycle?.id) throw new Error('ID de moto manquant');
      return motorcycleApi.updateMotorcycle(motorcycle.id.toString(), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['motorcycles'] });
      onClose();
      toast.success('Moto modifiée avec succès');
    },
    onError: (error) => {
      console.error('Erreur de modification:', error);
      toast.error('Erreur lors de la modification de la moto');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'add') {
      addMutation.mutate(formData);
    } else {
      editMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    const processedValue = type === 'number' ? Number(value) : value;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: processedValue
      };
      return newData;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image est trop volumineuse. Taille maximum : 5MB');
      return;
    }

    try {
      const base64String = await convertToBase64(file);
      setFormData(prev => ({
        ...prev,
        photo: base64String
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Erreur lors du chargement de l\'image');
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Échec de la conversion de l\'image en base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'add' ? 'Ajouter une moto' : 'Modifier la moto'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Numéro de série
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Modèle
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>

            {/* Marque */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marque
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
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
                <option value="maintenance">En maintenance</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>

            {/* Kilométrage */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kilométrage
              </label>
              <input
                type="number"
                name="mileage"
                value={formData.mileage}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                min="0"
              />
            </div>

            {/* Intervalle maintenance */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Intervalle maintenance (km)
              </label>
              <input
                type="number"
                name="maintenanceInterval"
                value={formData.maintenanceInterval}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                min="0"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Choisir une image
                </label>
                {formData.photo && (
                  <div className="relative w-24 h-24">
                    <img
                      src={formData.photo}
                      alt="Aperçu"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photo: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
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
              {mode === 'add' ? 'Ajouter' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotorcycleForm;