"use client";

import DataTable from "@/app/components/admin/DataTable";
import Link from "next/link";
import { useState } from "react";
import {
  FaDownload,
  FaSave,
  FaSpinner,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { z } from "zod";

export default function Import() {
  const csvSchema = z
    .string()
    .array()
    .transform((tuple) => ({
      nome: tuple[0],
      numero: tuple[1],
      email: tuple[2],
      segmentacao: tuple[3],
    }))
    .array()
    .transform(([_headers, ...data]) => data);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [importedData, setImportedData] = useState<z.infer<
    typeof csvSchema
  > | null>(null);

  return (
    <>
      <div className="justify-between flex">
        {importedData ? null : (
          <>
            <label
              className={`hover:cursor-pointer font-semibold px-7 py-3 bg-blue-500 rounded text-white flex gap-3 items-center mt-3 ${
                isLoading ? "bg-opacity-20" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <FaUpload /> Importar
                </>
              )}

              <input
                type="file"
                style={{ display: "none" }}
                accept=".csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file == null) return;
                  const reader = new FileReader();
                  setIsLoading(true);
                  setError(null);
                  setSuccess(null);

                  reader.onload = function () {
                    setIsLoading(false);
                    const text = reader.result as string;
                    const rows = text.split("\n").map((row) => row.split(","));

                    const parsed = csvSchema.safeParse(rows);
                    if (parsed.success) {
                      setImportedData(
                        parsed.data.filter((row) => !!row.numero),
                      );
                    } else {
                      setError("Invalid data format");
                    }
                  };

                  reader.readAsText(file);
                }}
              />
            </label>
            <Link
              href={"/csv-template.csv"}
              className="font-semibold px-7 py-3 bg-blue-500 rounded text-white flex gap-3 items-center mt-3"
            >
              <FaDownload /> Download Template
            </Link>
          </>
        )}
      </div>
      {!importedData && !success && (
        <div className="text-lg mt-4">
          Faça upload de um arquivo csv usando o modelo oferecido.
        </div>
      )}

      <div className="mb-8 pb-4 ">
        {success && <div className="font-semibold text-lg mt-8">{success}</div>}

        {importedData && (
          <>
            <div className="">
              <div className="flex justify-between">
                <button
                  disabled={isLoading || importedData.length === 0}
                  className={`mb-5 font-semibold px-7 py-3 bg-green-500 rounded text-white flex gap-3 items-center mt-3 hover:cursor-pointer ${
                    isLoading || importedData.length === 0
                      ? "bg-opacity-25"
                      : ""
                  } `}
                  onClick={async () => {
                    setIsLoading(true);

                    const resp = await fetch(`/api/contacts`, {
                      method: "POST",
                      body: JSON.stringify(importedData),
                    });

                    if (resp.ok) {
                      setSuccess("Importados com sucesso");

                      setImportedData(null);
                      setIsLoading(false);
                      return;
                    }
                    if (!resp.ok) {
                      setError(
                        "Erro ao importar, algum campo esta com dados incorreto, por favor, valide o dados e tente novamente.",
                      );
                      setIsLoading(false);
                      return;
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Importando...
                    </>
                  ) : (
                    <>
                      <FaSave /> Salvar contatos
                    </>
                  )}
                </button>
                <button
                  className={`mb-5 font-semibold px-7 py-3 bg-red-500 rounded text-white flex gap-3 items-center mt-3 ${
                    isLoading ? "bg-opacity-25" : ""
                  }`}
                  disabled={isLoading}
                  onClick={() => {
                    setImportedData(null);
                    setSuccess(null);
                  }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Importando...
                    </>
                  ) : (
                    <>
                      <FaTrash /> Cancelar importação
                    </>
                  )}
                </button>
              </div>
              {importedData.length === 0 ? (
                <div className="text-3xl font-semibold text-center">
                  Nenhum dado importado
                </div>
              ) : (
                <>
                  {error && (
                    <div className="text-red-500 text-lg font-semibold my-3">
                      {error}
                    </div>
                  )}
                  <DataTable
                    data={importedData}
                    titles={["Nome", "Número", "E-mail", "Segmentação"]}
                    idExtractor={(row) => row.nome.toString()}
                    rowGenerator={(row) => [
                      row.nome,
                      row.numero,
                      row.email,
                      row.segmentacao,
                    ]}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
