"use client";
import { Dialog, Transition } from "@headlessui/react";
import { TokenId } from "@prisma/client";
import axios from "axios";
import { Fragment, HTMLProps, forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPencilAlt, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Values = {
  name: string;
  idToken: string;
  number: string;
};

export default function Form({ token }: { token?: TokenId }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<Values>({
    defaultValues: {
      name: token?.name || "",
      idToken: token?.idToken || "",
      number: token?.number || "",
    },
  });

  function handleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={` inset-0 flex items-center mr-5 ${
          token ? "justify-start" : "justify-end"
        } `}
      >
        {token ? (
          <button
            className="items-center text-center flex flex-col"
            onClick={handleModal}
          >
            <FaPencilAlt className="h-4 w-4 " />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleModal}
            className={[
              "px-7 py-3 bg-blue-500 rounded text-white font-semibold flex gap-3 items-center",
            ].join(" ")}
          >
            Criar nova instancia
          </button>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-5"
                  >
                    {token ? "Editar instancia" : "Criar nova instancia"}
                  </Dialog.Title>
                  <form
                    className="grid-cols-2 md:grid-cols-2 gap-3"
                    onSubmit={handleSubmit(
                      async ({ name, idToken, number }) => {
                        if (token) {
                          try {
                            await axios.put(`/api/sectors/${token.id}`, {
                              name,
                              idToken,
                              number,
                            });

                            toast.success("Token atualizado com sucesso!", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });

                            handleModal();
                            window.location.reload();
                            return;
                          } catch (error) {
                            console.log(error);
                            toast.error("Erro ao atualizar token!", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                          }
                        }
                        if (!token) {
                          try {
                            await axios.post(`/api/token`, {
                              name,
                              idToken,
                              number,
                            });

                            toast.success("Token criado com sucesso!", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });

                            handleModal();
                            window.location.reload();
                            return;
                          } catch (error) {
                            toast.error("Erro ao criar token!", {
                              position: "bottom-center",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                            return;
                          }
                        }
                      },
                    )}
                  >
                    <Input
                      label="Nome do conexão"
                      type="text"
                      defaultValue={token?.name}
                      error={errors.name?.message}
                      {...register("name", {})}
                    />
                    <Input
                      label="Token da conexão"
                      type="text"
                      defaultValue={token?.idToken}
                      error={errors.idToken?.message}
                      {...register("idToken", {})}
                    />
                    <Input
                      label="Numero de telefone"
                      type="text"
                      required
                      defaultValue={token?.number!}
                      error={errors.number?.message}
                      {...register("number", {})}
                    />

                    {isSubmitSuccessful && (
                      <p className="text-green-500">Enviado com sucesso</p>
                    )}
                    <div className="flex justify-center">
                      <button
                        className={[
                          "px-7 py-3 bg-blue-500 rounded text-white flex gap-3 items-center mt-3",
                          isSubmitting ? "opacity-50" : "",
                        ].join(" ")}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          "Salvar"
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const Input = forwardRef<
  HTMLInputElement,
  HTMLProps<HTMLInputElement> & {
    label?: string;
    containerClass?: string;
    error?: string;
  }
>(function Input({ className, label, containerClass, error, ...props }, ref) {
  return (
    <div className={containerClass}>
      <label>
        <div>{label}</div>
        <div>
          <input
            {...props}
            className={[
              "block border rounded px-4 py-1 w-full focus:ring focus:outline-none transition-shadow",
              error ? "border-red-500" : "border-gray-300",
              className,
            ].join(" ")}
            ref={ref}
          />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </label>
    </div>
  );
});
