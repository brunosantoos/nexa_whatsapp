import { Dialog } from '@headlessui/react';
import { ReactNode, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

export type ConfirmationButtonProps = {
  className?: string;
  title?: string;
  children?: ReactNode | ReactNode[];
  totalContacts?: number;
  onConfirm: () => void | Promise<void>;
};

export default function ConfirmationButton({
  className,
  children,
  title,
  totalContacts,
  onConfirm,
}: ConfirmationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-xl mx-auto rounded-2xl p-5 z-10">
            <Dialog.Title className="mb-3 text-2xl font-semibold">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mb-3">
              Deseja realmente enviar mensagem para {totalContacts} contatos
              desta segmentação?
            </Dialog.Description>

            <div className="flex gap-3">
              <button
                className={`bg-green-500 text-white px-5 py-2 rounded font-semibold hover:bg-opacity-90 ${
                  isLoading ? 'bg-opacity-30' : ''
                }`}
                disabled={isLoading}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    await onConfirm();
                  } finally {
                    setIsLoading(false);
                    setIsOpen(false);
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex flex-row gap-2 items-center font-semibold">
                    <FaSpinner className="animate-spin" /> Enviando...
                  </div>
                ) : (
                  'Disparar mensagens'
                )}
              </button>
              <button
                className="bg-gray-200 px-5 py-2 rounded font-semibold hover:bg-opacity-80"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </Dialog.Panel>
        </div>
        <div className="fixed inset-0 bg-black bg-opacity-25 -z-10" />
      </Dialog>
    </>
  );
}
