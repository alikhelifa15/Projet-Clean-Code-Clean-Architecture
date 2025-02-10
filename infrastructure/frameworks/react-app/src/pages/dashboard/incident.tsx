import { useState } from 'react';
import { useIncidentsByCompany } from '../../features/incidents/hooks/useIncidentsByCompany';
import { useIncidentsByDealer } from '../../features/incidents/hooks/useIncidentsByDealer';
import { GetIncidentsByCompanyData, GetIncidentsByDealerData, Incident } from '../../features/incidents/types/index';
import IncidentList from '../../features/incidents/components/IncidentList';
import IncidentForm from '../../features/incidents/components/incidentForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentApi } from '../../features/incidents/api/rest';
import { toast } from 'react-toastify';
import { getDecodedToken } from '../../utils';

const Incidents = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const user = getDecodedToken();
  const queryClient = useQueryClient();

  const companyIncidentsQuery = useIncidentsByCompany(user.id);
  const dealerIncidentsQuery = useIncidentsByDealer(user.id);
  const incidentsQuery = user.type.value === 'COMPANY' ? companyIncidentsQuery : dealerIncidentsQuery;

  const deleteMutation = useMutation({
    mutationFn: (incidentId: string) => incidentApi.deleteIncident(incidentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('Incident supprimé avec succès');
    }
  });

  const handleEdit = (incident: Incident) => {
    setSelectedIncident(incident);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (incident: Incident) => {
    deleteMutation.mutate(incident.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <IncidentList
        data={incidentsQuery.data as GetIncidentsByCompanyData | GetIncidentsByDealerData | undefined}
        isLoading={incidentsQuery.isLoading}
        isError={incidentsQuery.isError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        userType={user.type.value as 'COMPANY' | 'DEALER'}
        onAdd={() => {
          setFormMode('add');
          setSelectedIncident(null);
          setIsFormOpen(true);
        }}
      />

      {isFormOpen && (
        <IncidentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          incident={selectedIncident}
          mode={formMode}
        />
      )}
    </div>
  );
};

export default Incidents;