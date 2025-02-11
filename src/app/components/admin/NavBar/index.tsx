'use client';

import { linksOutros } from '@/app/components/Utils/Links';
import logo from '@/assets/logo.png';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white p-4 flex flex-col gap-3 shadow w-64 left-0 top-0 bottom-0 fixed overflow-auto">
      <Link href="/" className="w-36 mb-5">
        <Image src={logo} alt="logo" priority />
      </Link>
      <Link
        href={'/'}
        className={[
          'block font-semibold uppercase tracking-tight border-b p-3 hover:text-secondary',
          pathname === '/' ? 'text-secondary' : 'text-black',
        ].join(' ')}
      >
        INICIO
      </Link>
      {linksOutros.map(({ label, href }, index) => (
        <Link
          href={href}
          key={index}
          className={[
            'block font-semibold uppercase tracking-tight border-b p-3 hover:text-secondary',
            pathname === href ? 'text-secondary' : 'text-black',
          ].join(' ')}
        >
          {typeof label === 'string' ? label.toUpperCase() : label}
        </Link>
      ))}

      <div className="flex-grow" />
      <button
        className="font-semibold tracking-tight text-black flex gap-1 items-center hover:text-secondary uppercase my-2"
        onClick={() => signOut({ redirect: true })}
      >
        <FaSignOutAlt className="text-red-500 w-4 h-4" /> Sair
      </button>
    </header>
  );
}
