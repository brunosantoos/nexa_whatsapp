import { FaExclamation } from 'react-icons/fa';

export default function NoDataFound() {
  return (
    <div className="grid max-h-full place-items-center px-6 py-2 sm:py-32  overflow-hidden">
      <div className="text-center items-center flex flex-col">
        <FaExclamation className="my-3 text-6xl font-bold tracking-tight text-gray-900 sm:text-5xl border-collapse rounded-full border-[2px] p-2 border-gray-900" />
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Nenhum dado encontrado
        </h1>
      </div>
    </div>
  );
}
