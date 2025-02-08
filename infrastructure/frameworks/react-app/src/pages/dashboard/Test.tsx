import { useState } from 'react';
import { useTestMotosByCompany } from '../../features/TestMoto/hooks/useTestMotosByCompany';
import { useTestMotosByDealer } from '../../features/TestMoto/hooks/useTestMotosByDealer';
import { GetTestMotosByCompanyData, GetTestMotosByDealerData, TestMoto } from '../../features/TestMoto/types';
import TestMotoList from '../../features/TestMoto/components/TestMotoList';
import TestMotoForm from '../../features/TestMoto/components/TestMotoForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { testMotoApi } from '../../features/TestMoto/api/rest';
import { toast } from 'react-toastify';
import { getDecodedToken } from '../../utils';

interface EndMileagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (endingMileage: number) => void;
  startingMileage: number;
}

const EndMileagePopup: React.FC<EndMileagePopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  startingMileage
}) => {
  const [endingMileage, setEndingMileage] = useState<number>(startingMileage);
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    if (endingMileage < startingMileage) {
      setError('Le kilométrage final doit être supérieur au kilométrage initial');
      return;
    }
    onConfirm(endingMileage);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Terminer le test</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kilométrage final
            </label>
            <input
              type="number"
              value={endingMileage}
              onChange={(e) => {
                setEndingMileage(Number(e.target.value));
                setError('');
              }}
              className="w-full p-2 border rounded-md"
              min={startingMileage}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Kilométrage initial: {startingMileage} km
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Test = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedTest, setSelectedTest] = useState<TestMoto | null>(null);
  const [isEndMileagePopupOpen, setIsEndMileagePopupOpen] = useState(false);

  const user = getDecodedToken();
  const queryClient = useQueryClient();

  const companyTestsQuery = useTestMotosByCompany(user.id);
  const dealerTestsQuery = useTestMotosByDealer(user.id);
  const testsQuery = user.type.value === 'COMPANY' ? companyTestsQuery : dealerTestsQuery;

  const deleteMutation = useMutation({
    mutationFn: (testId: string) => testMotoApi.deleteTestMoto(testId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testMotos'] });
      toast.success('Test supprimé avec succès');
    }
  });

  const startTestMutation = useMutation({
    mutationFn: (testId: string) => testMotoApi.startTestMoto(testId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testMotos'] });
      toast.success('Test démarré avec succès');
    }
  });

  const completeTestMutation = useMutation({
    mutationFn: ({ id, ending_mileage }: { id: string; ending_mileage: number }) => 
      testMotoApi.completeTestMoto(id, ending_mileage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testMotos'] });
      toast.success('Test terminé avec succès');
      setIsEndMileagePopupOpen(false);
    }
  });

  const handleEdit = (test: TestMoto) => {
    setSelectedTest(test);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleDelete = (test: TestMoto) => {
    deleteMutation.mutate(test.id);
  };

  const handleComplete = (test: TestMoto) => {
    setSelectedTest(test);
    setIsEndMileagePopupOpen(true);
  };

  const handleStart = (test: TestMoto) => {
    startTestMutation.mutate(test.id);
  };

  const handleEndMileageConfirm = (endingMileage: number) => {
    if (selectedTest) {
      completeTestMutation.mutate({
        id: selectedTest.id,
        ending_mileage: endingMileage
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <TestMotoList
        data={testsQuery.data as GetTestMotosByCompanyData | GetTestMotosByDealerData | undefined}
        isLoading={testsQuery.isLoading}
        isError={testsQuery.isError}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onComplete={handleComplete}
        onStart={handleStart}
        userType={user.type.value as 'COMPANY' | 'DEALER'}
        onAdd={() => {
          setFormMode('add');
          setSelectedTest(null);
          setIsFormOpen(true);
        }}
      />

      {isFormOpen && (
        <TestMotoForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          testMoto={selectedTest || undefined}
          mode={formMode}
        />
      )}

      {isEndMileagePopupOpen && selectedTest && (
        <EndMileagePopup
          isOpen={isEndMileagePopupOpen}
          onClose={() => setIsEndMileagePopupOpen(false)}
          onConfirm={handleEndMileageConfirm}
          startingMileage={selectedTest.startingMileage}
        />
      )}
    </div>
  );
};

export default Test;