"use client";

import { Select } from "@/app/components/Utils/Select";
import { Dialog } from "@headlessui/react";
import { Messages, TokenId } from "@prisma/client";
import { ReactNode, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export type ConfirmationButtonProps = {
  id: number;
  className?: string;
  title?: string;
  children?: ReactNode | ReactNode[];
  totalContacts?: number;
  instances: TokenId[];
  messages: Messages[];
  emailAdmin: string;
};

export default function ConfirmationButton({
  id,
  emailAdmin,
  className,
  children,
  title,
  instances,
  messages,
  totalContacts,
}: ConfirmationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);

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
            <Dialog.Description className="mb-4">
              Deseja realmente enviar mensagem para {totalContacts} contatos
              desta segmentação?
            </Dialog.Description>
            <div className="gap-2 mb-4 flex flex-col">
              <Select
                defaultValue={instances[0].idToken}
                label="Selecione a instancia"
                onBlur={(e) => {
                  setSelectedInstance(e.target.value);
                }}
              >
                {instances.map((instance) => (
                  <option key={instance.id} value={instance.idToken}>
                    {instance.name} - {instance.number}
                  </option>
                ))}
              </Select>
              <Select
                defaultValue={messages[0].slug}
                label="Escolha a mensagem"
                onBlur={(e) => {
                  setSelectedMessage(e.target.value);
                }}
              >
                {messages.map((message) => (
                  <option
                    key={message.id}
                    value={message.slug}
                    title={message.content}
                  >
                    <span className="text-gray-400">
                      {message.content.length > 50
                        ? message.content.substring(0, 50) + "..."
                        : message.content}
                    </span>
                  </option>
                ))}
              </Select>
              <Select
                label="Selecione o intervalo"
                onBlur={(e) => {
                  setSelectedInterval(e.target.value);
                }}
              >
                <option value={"0"}>
                  <span className="text-gray-400">
                    Sem intervalo (Não recomendado)
                  </span>
                </option>
                <option value={"10000"}>
                  <span className="text-gray-400">10 Segundos</span>
                </option>
                <option value={"20000"}>
                  <span className="text-gray-400">20 Segundos</span>
                </option>
                <option value={"30000"}>
                  <span className="text-gray-400">30 Segundos</span>
                </option>
                <option value={"40000"}>
                  <span className="text-gray-400">40 Segundos</span>
                </option>
                <option value={"60000"}>
                  <span className="text-gray-400">1 Minuto</span>
                </option>
              </Select>
            </div>

            <div className="flex gap-3">
              <button
                className={`bg-green-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-opacity-90 ${
                  isLoading ? "bg-opacity-30" : ""
                }`}
                disabled={isLoading}
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    await fetch(`/api/direct/${selectedMessage}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        instance: selectedInstance,
                        emailAdmin,
                        idSegmentation: id,
                        selectedInterval,
                      }),
                    });
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
                  "Disparar mensagens"
                )}
              </button>
              <button
                className="bg-gray-200 px-5 py-2 rounded-full font-semibold hover:bg-opacity-80"
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
