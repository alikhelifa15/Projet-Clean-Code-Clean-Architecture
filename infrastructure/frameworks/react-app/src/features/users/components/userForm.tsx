import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/rest';
import { toast } from 'react-toastify';
import { CompanyRegistrationData, DealerRegistrationData } from '../types';

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

interface User {
  id?: number;
  email: string;
  type: 'DEALER' | 'COMPANY';
  password?: string;
  company?: {
    companyName: string;
    phone: string;
    address: string;
    siretNumber: string;
    postalCode: string;
    city: string;
  };
  dealer?: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    services: string;
  };
}

const UserForm = ({ isOpen, onClose, user }: UserFormProps) => {
  const [formData, setFormData] = useState<User>({
    email: '',
    type: 'COMPANY',
    company: {
      companyName: '',
      phone: '',
      address: '',
      siretNumber: '',
      postalCode: '',
      city: ''
    },
    dealer: {
      name: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      services: ''
    }
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: (data: User) => {
      if (user?.id) {
        return usersApi.updateUser(user.id, data);
      }
      
      if (data.type === 'COMPANY') {
        const companyData: CompanyRegistrationData = {
          email: data.email,
          password: data.password || '',
          type: 'COMPANY',
          additionalData: {
            companyName: data.company?.companyName || '',
            siretNumber: data.company?.siretNumber || '',
            phone: data.company?.phone || '',
            address: data.company?.address || '',
            postalCode: data.company?.postalCode || '',
            city: data.company?.city || ''
          }
        };
        return usersApi.createCompany(companyData);
      } else {
        const dealerData: DealerRegistrationData = {
          email: data.email,
          password: data.password || '',
          type: 'DEALER',
          additionalData: {
            name: data.dealer?.name || '',
            services: data.dealer?.services || '',
            phone: data.dealer?.phone || '',
            address: data.dealer?.address || '',
            postalCode: data.dealer?.postalCode || '',
            city: data.dealer?.city || ''
          }
        };
        return usersApi.createDealer(dealerData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
      toast.success(user?.id ? 'Utilisateur modifié' : 'Utilisateur créé');
    },
    onError: () => {
      toast.error('Une erreur est survenue');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          {user?.id ? 'Modifier' : 'Ajouter'} un utilisateur
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
      
              <div>
                <label className="block mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
    
          </div>

          <div>
            <label className="block mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="COMPANY">Entreprise</option>
              <option value="DEALER">Concessionnaire</option>
            </select>
          </div>

          {formData.type === 'COMPANY' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Nom de l'entreprise</label>
                <input
                  type="text"
                  name="company.companyName"
                  value={formData.company?.companyName}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Numéro SIRET</label>
                <input
                  type="text"
                  name="company.siretNumber"
                  value={formData.company?.siretNumber}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="company.phone"
                  value={formData.company?.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Adresse</label>
                <input
                  type="text"
                  name="company.address"
                  value={formData.company?.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Code postal</label>
                <input
                  type="text"
                  name="company.postalCode"
                  value={formData.company?.postalCode}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Ville</label>
                <input
                  type="text"
                  name="company.city"
                  value={formData.company?.city}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
          )}

          {formData.type === 'DEALER' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Nom</label>
                <input
                  type="text"
                  name="dealer.name"
                  value={formData.dealer?.name}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Services</label>
                <input
                  type="text"
                  name="dealer.services"
                  value={formData.dealer?.services}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="dealer.phone"
                  value={formData.dealer?.phone}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Adresse</label>
                <input
                  type="text"
                  name="dealer.address"
                  value={formData.dealer?.address}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Code postal</label>
                <input
                  type="text"
                  name="dealer.postalCode"
                  value={formData.dealer?.postalCode}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Ville</label>
                <input
                  type="text"
                  name="dealer.city"
                  value={formData.dealer?.city}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Chargement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;