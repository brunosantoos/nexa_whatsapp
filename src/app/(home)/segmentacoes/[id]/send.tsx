import { Messages, TokenId } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaShare } from "react-icons/fa";
import ConfirmationButton from "./modalSend";

export type SendModalProps = {
  id: number;
  totalContacts: number;
  instances: TokenId[];
  messages: Messages[];
};

export default async function ModalSendMessageProps({
  id,
  totalContacts,
  instances,
  messages,
}: SendModalProps) {
  const session = await getServerSession();

  if (!session) return redirect("/login");

  return (
    <ConfirmationButton
      id={id}
      emailAdmin={session.user!.email!}
      instances={instances}
      title="Enviar mensagens"
      key="delete"
      totalContacts={totalContacts}
      messages={messages}
      className="text-white font-bold px-4 py-2 rounded-md flex flex-row gap-3 items-center bg-green-500 hover:scale-105"
    >
      <FaShare className="text-white " /> Disparar mensagens
    </ConfirmationButton>
  );
}
