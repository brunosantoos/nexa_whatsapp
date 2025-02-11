'use client';
import DataTable from '@/app/components/admin/DataTable';
import { Switch } from '@headlessui/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Status({
  status,
}: {
  status: {
    id: number;
    name: string;
    status: boolean;
  }[];
}) {
  return (
    <>
      <DataTable
        data={status}
        titles={['#', 'Nome', 'Status']}
        idExtractor={(row) => row.id.toString()}
        rowGenerator={(row) => [
          row.id,
          row.name,
          <Switch
            defaultChecked={row.status}
            key={row.id.toString()}
            onChange={async (v) => {
              try {
                await axios.put(`/api/status/${row.id.toString()}`, {
                  status: v,
                });
                toast.success('Status alterado com sucesso!', {
                  position: 'bottom-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
                window.location.reload();
              } catch (error) {
                toast.error('Erro ao alterar status!', {
                  position: 'bottom-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
              }
            }}
            className={`${row.status ? 'bg-blue-500' : 'bg-gray-500'}
          relative flex items-center h-6 w-10 shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${row.status ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>,
        ]}
      />
    </>
  );
}
