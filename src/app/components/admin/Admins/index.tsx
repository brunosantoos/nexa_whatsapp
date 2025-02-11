'use client';
import DataTable from '@/app/components/admin/DataTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormUser from '../Form/CreateUser';
import DeleteButton from './DeleteButton';

export default function Admins({
  admins,
}: {
  admins: { id: number; email: string }[];
}) {
  return (
    <>
      <ToastContainer />
      <DataTable
        data={admins}
        titles={['#', 'Email', 'Editar', 'Deletar']}
        idExtractor={(row: { id: { toString: () => any } }) =>
          row.id.toString()
        }
        rowGenerator={(row: any) => [
          row.id,
          row.email,
          <FormUser key={row.id} admin={row} />,
          <DeleteButton id={row.id} key={row.id} />,
        ]}
      />
    </>
  );
}
