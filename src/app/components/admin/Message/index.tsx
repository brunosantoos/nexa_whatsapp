"use client";
import DataTable from "@/app/components/admin/DataTable";
import FormMessage from "@/app/components/admin/Form/Message";
import { Messages } from "@prisma/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteButton from "./DeleteButton";

export default function Greeting({ data }: { data: Messages[] }) {
  return (
    <>
      <ToastContainer />
      <DataTable
        data={data}
        titles={["Slug", "Conteudo", "Imagem", "Editar", "Apagar"]}
        idExtractor={(row) => row.slug.toString()}
        rowGenerator={(row) => [
          row.slug,
          row.content,
          <>
            {row.haveMedia ? (
              <img src={row.mediaUrl!} className="w-48" alt="image" />
            ) : (
              "Apenas texto"
            )}
          </>,
          <FormMessage key={row.slug} messages={row} />,
          <DeleteButton id={row.id} key={row.slug} />,
        ]}
      />
    </>
  );
}
