"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Messages } from "@prisma/client";
import axios from "axios";
import { Fragment, HTMLProps, ReactElement, forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPencilAlt, FaSpinner, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Values = {
  slug: string;
  content: string;
  image?: string;
};

export default function FormMessage({ messages }: { messages?: Messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    handleSubmit,
  } = useForm<Values>({
    defaultValues: {
      content: messages?.content || "",
      slug: messages?.slug || "",
      image: "",
    },
  });

  function handleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={` inset-0 flex items-center mr-5 ${
          messages ? "justify-start" : "justify-end"
        } `}
      >
        {messages ? (
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
            Adicionar novo
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
                    {messages ? "Editar" : "Cadastrar nova"}
                  </Dialog.Title>
                  <form
                    className="grid-cols-2 md:grid-cols-2 gap-3"
                    onSubmit={handleSubmit(async ({ content, slug, image }) => {
                      if (messages) {
                        try {
                          await axios.put(`/api/messages/${messages.id}`, {
                            content,
                            slug,
                          });

                          toast.success("Mensagem atualizada com sucesso!", {
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
                          toast.error("Erro ao atualizar mensagem!", {
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
                      if (!messages) {
                        console.log(image);
                        try {
                          await axios.post(`/api/messages`, {
                            content,
                            slug,
                            image,
                          });

                          toast.success("Mensagem criada com sucesso!", {
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
                          toast.error("Erro ao criar Mensagem!", {
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
                    })}
                  >
                    <Input
                      label="Slug"
                      type="text"
                      defaultValue={messages?.slug}
                      error={errors.slug?.message}
                      {...register("slug", {
                        onChange: (e) => {
                          const newValue = e.target.value.replace(/\s+/g, "-");
                          e.target.value = newValue;
                          return newValue;
                        },
                      })}
                    />
                    <TextArea
                      label="Conteudo"
                      type="text"
                      defaultValue={messages?.slug}
                      error={errors.content?.message}
                      {...register("content", {})}
                    />

                    <Controller
                      control={control}
                      name="image"
                      render={({
                        field: { name, onBlur, onChange, ref, value },
                      }) => (
                        <>
                          <FileField
                            name={name}
                            onBlur={onBlur}
                            preview={value}
                            onImageUploaded={(filePath: string) =>
                              onChange(filePath)
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-white px-1 py-1 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                            ref={ref}
                            label={"Imagens"}
                            accept="image/png, image/gif, image/jpeg"
                          />
                          {value && (
                            <div
                              className="flex items-center gap-3"
                              key={value}
                            >
                              <img src={value} key={value} className="w-24" />
                              <a
                                className="text-red-500"
                                onClick={() => onChange(null)}
                              >
                                Remover
                              </a>
                            </div>
                          )}
                        </>
                      )}
                    />
                    <div className="flex justify-center font-bold">
                      {isSubmitSuccessful ? (
                        <p className="text-green-500">Enviado com sucesso</p>
                      ) : (
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
                      )}
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

const TextArea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement> & {
    label?: string;
    containerClass?: string;
    error?: string;
  }
>(function TextArea(
  { className, containerClass, label, error, ...props },
  ref,
) {
  return (
    <div className={containerClass}>
      <label>
        <div>{label}</div>
        <div>
          <textarea
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

type CommonFieldProps = {
  label?: string;
  error?: string;
};
export type FileFieldProps = HTMLProps<HTMLInputElement> & {
  onImageUploaded: (filePath: string, imageId: number) => void;
  preview?: string;
  helper?: string | ReactElement;
} & CommonFieldProps;
export const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
  function FileField(
    { label, name, helper, onImageUploaded, preview, ...props },
    ref,
  ) {
    const [isLoading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<null | string>(null);

    return (
      <label className="block mb-2">
        <div className="text-gray-500">{label}</div>
        <div className="p-2 rounded mb-1 mt-1 border border-gray-200 w-full flex items-center gap-3 hover:cursor-pointer">
          {isLoading ? <FaSpinner className="animate-spin" /> : <FaUpload />}{" "}
          Enviar arquivo
          <input
            {...props}
            type="file"
            disabled={isLoading}
            onChange={async (e) => {
              try {
                setLoading(true);
                const file = e.target.files?.[0];
                if (file == null) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/files", {
                  method: "POST",
                  body: formData,
                });
                const body = await res.json();

                onImageUploaded(body.filePath, body.imageId);
                setPreviewImage(body.filePath);
              } finally {
                setLoading(false);
              }
            }}
            className="hidden"
            ref={ref}
          />
        </div>
        {helper && <p className="text-sm">{helper}</p>}
      </label>
    );
  },
);
