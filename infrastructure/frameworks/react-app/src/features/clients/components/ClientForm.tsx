import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { clientApi } from '../api/rest';
import { Client } from '../types';
import { getDecodedToken } from '../../../utils';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
  mode: 'add' | 'edit';
}

interface FormData {
  id?: string;
  dealerId?: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const ClientForm: React.FC<ClientFormProps> = ({ isOpen, onClose, client, mode }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    dealerId: '',
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) return;

    const user = getDecodedToken();
    const initialFormData: FormData = {
      firstName: '',
      lastName: '',
      phone: '',
      dealerId: user.type.value === 'DEALER' ? user.id : '',
    };

    if (mode === 'edit' && client) {
      setFormData({
        id: client.id.toString(),
        firstName: client.firstName,
        lastName: client.lastName,
        phone: client.phone,
        dealerId: client.dealerId,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isOpen, client, mode]);

  const addMutation = useMutation({
    mutationFn: (data: FormData) => clientApi.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onClose();
      toast.success('Client ajouté avec succès');
    },
    onError: (error) => {
      console.error('Erreur d\'ajout:', error);
      toast.error('Erreur lors de l\'ajout du client');
    }
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => {
      if (!client?.id) throw new Error('ID du client manquant');
      return clientApi.updateClient(client.id.toString(), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      onClose();
      toast.success('Client modifié avec succès');
    },
    onError: (error) => {
      console.error('Erreur de modification:', error);
      toast.error('Erreur lors de la modification du client');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'add' ? 'Ajouter un client' : 'Modifier le client'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                pattern="[0-9]{10}"
                title="Numéro de téléphone à 10 chiffres"
                required
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
              disabled={addMutation.isPending || editMutation.isPending}
            >
              {mode === 'add' ? 'Ajouter' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;