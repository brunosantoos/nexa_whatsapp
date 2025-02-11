'use client';
import DataTable from '@/app/components/admin/DataTable';
import { Greeting } from '@prisma/client';
import 'react-toastify/dist/ReactToastify.css';
import FormGreeting from '../Form/Greeting';
import DeleteButton from './DeleteButton';

export default function Greeting({ data }: { data: Greeting[] }) {
  return (
    <>
      <DataTable
        data={data}
        titles={['#', 'Conteudo', 'Editar', 'Apagar']}
        idExtractor={(row) => row.id.toString()}
        rowGenerator={(row) => [
          row.id,
          row.text,
          <FormGreeting key={row.id} greeting={row} />,
          <DeleteButton id={row.id} key={row.id} />,
        ]}
      />
    </>
  );
}
