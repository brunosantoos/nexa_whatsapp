"use client";
import DataTable from "@/app/components/admin/DataTable";
import { Admin } from "@prisma/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormUser from "../Form/CreateUser";
import DeleteButton from "./DeleteButton";

export default function Admins({ admins }: { admins: Admin[] }) {
  return (
    <>
      <ToastContainer />
      <DataTable
        data={admins}
        titles={["#", "Email", "Enviados", "Restantes", "Editar", "Deletar"]}
        idExtractor={(row: Admin) => row.id.toString()}
        rowGenerator={(row: Admin) => [
          row.id,
          row.email,
          row.messageSend,
          row.messageRemaining,
          <FormUser key={row.id} admin={row} />,
          <DeleteButton id={row.id} key={row.id} />,
        ]}
      />
    </>
  );
}
