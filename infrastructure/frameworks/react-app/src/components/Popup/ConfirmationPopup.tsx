import { HiX, HiExclamation } from "react-icons/hi";

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}



const ConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler"
}: ConfirmationPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-[#c3c3c3] bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-md p-6 my-8 bg-white rounded-lg shadow-xl transform transition-all relative">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#c3c3c3] hover:text-red-500"
          >
            <HiX className="h-6 w-6" />
          </button>

          {/* Content */}
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#fde7e7]">
                <HiExclamation className="h-6 w-6 text-primary" />
              </div>
            </div>

            <div className="ml-4 text-left">
              <h3 className="text-lg font-medium text-[#939292]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[#c3c3c3]">
                {message}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-row-reverse gap-3">
            <button
              onClick={onConfirm}
              className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-base font-medium text-white hover:opacity-90 focus:outline-none   sm:text-sm"
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-primary px-4 py-2 bg-white text-base  text-primary font-medium text-gray-700 hover:bg-gray focus:outline-none   sm:text-sm"
            >
              {cancelText}
            </button>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default ConfirmationPopup;