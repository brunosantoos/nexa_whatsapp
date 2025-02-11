import send from '@/assets/send.png';
import { ReportSend } from '@prisma/client';
import Image from 'next/image';

export default function HomeAdmin({ data }: { data: ReportSend[] }) {
  return (
    <div className="grid max-h-full place-items-center px-6 py-2 sm:py-32  overflow-hidden">
      <div className="text-center ">
        <Image src={send} alt="lock" className="max-w-lg max-h-lg" />
        <h1 className="mt-3 text-2xl tracking-tight text-gray-900 sm:text-5xl font-semibold">
          {data.length}{' '}
          {data.length === 0
            ? 'Nenhuma mensagem enviada'
            : data.length === 1
            ? 'Mensagem enviada'
            : `mensagens enviadas`}
          .
        </h1>
      </div>
    </div>
  );
}
