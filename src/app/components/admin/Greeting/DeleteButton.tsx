'use client';
import ConfirmationButton from '@/app/components/Utils/ConfirmationButton';
import { useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

export type DeleteButtonProps = { id: number };

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();

  return (
    <ConfirmationButton
      onConfirm={async () => {
        const resp = await fetch(`/api/greeting/${id}`, { method: 'DELETE' });
        toast.success('Cumprimento deletado com sucesso!', {
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
      title="Excluir Cumprimento"
      key="delete"
      className="text-white p-3 rounded"
    >
      <FaTrashAlt className="text-red-500" />
    </ConfirmationButton>
  );
}
