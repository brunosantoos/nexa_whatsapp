'use client';
import { useRouter } from 'next/navigation';
import { FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationButton from './modalSend';

export type SendModalProps = { id: number; totalContacts: number };

export default function ModalSendMessageProps({
  id,
  totalContacts,
}: SendModalProps) {
  const router = useRouter();

  return (
    <ConfirmationButton
      onConfirm={async () => {
        const resp = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        toast.success('Mensagem deletado com sucesso!', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        if (resp.ok) {
          router.refresh();
        }
      }}
      title="Enviar mensagens"
      key="delete"
      totalContacts={totalContacts}
      className="text-white font-bold px-4 py-2 rounded-md flex flex-row gap-3 items-center bg-green-500 hover:scale-105"
    >
      <FaShare className="text-white " /> Disparar mensagens
    </ConfirmationButton>
  );
}
