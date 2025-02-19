import { ReactNode } from "react";

type Link = {
  label: string | ReactNode | ReactNode[];
  href: string;
};

export const linksOutros: Link[] = [
  { label: "Contatos", href: "/contatos" },
  { label: "Cumprimentos", href: "/cumprimentos" },
  { label: "Mensagens", href: "/mensagens" },
  { label: "Importar", href: "/importar" },
  { label: "Instancias", href: "/instancias" },
  { label: "Segmentações", href: "/segmentacoes" },
  { label: "Historico", href: "/historico" },
  { label: "Usuários", href: "/usuarios" },
];
