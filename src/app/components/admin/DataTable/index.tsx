import { ReactNode } from "react";
import NoDataFound from "../NoDataFound";

export type DataTableProps<T> = {
  titles: ReactNode[];
  data: T[];
  idExtractor: (row: T) => string;
  rowGenerator: (row: T) => ReactNode[];
};

export default function DataTable<T>({
  titles,
  rowGenerator,
  idExtractor,
  data,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div className="mt-3 border rounded-t-md overflow-x-auto  max-h-[80%]">
      <div className="relative">
        <table className="w-full text-sm text-left">
          <thead className="text-white uppercase bg-[#0e344c] sticky top-0">
            <tr>
              {titles.map((title, index) => (
                <th key={index} className="p-3">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-h-[calc(80% - 2rem)] overflow-y-auto">
            {data.map((row) => (
              <tr
                key={idExtractor(row)}
                className="bg-white border-b text-black text-sm"
              >
                {rowGenerator(row).map((data, index) => (
                  <td key={index} className="p-3">
                    {data}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
