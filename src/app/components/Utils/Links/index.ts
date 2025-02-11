import { ReactNode } from 'react';

type Link = {
  label: string | ReactNode | ReactNode[];
  href: string;
};

export const linksOutros: Link[] = [
  { label: 'Contatos', href: '/contatos' },
  { label: 'Cumprimentos', href: '/cumprimentos' },
  { label: 'Mensagens', href: '/mensagens' },
  { label: 'Importar', href: '/importar' },
  { label: 'Segmentações', href: '/segmentacoes' },
  { label: 'Setores', href: '/setores' },
  { label: 'Historico', href: '/historico' },
  { label: 'Usuários', href: '/usuarios' },
  { label: 'Status', href: '/status' },
  { label: 'Token', href: '/token' },
];
