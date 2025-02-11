import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="flex flex-1 m-auto min-h-full min-w-full">
      <FaSpinner className="m-auto animate-spin text-[32px] text-gray-800" />
    </div>
  );
}
