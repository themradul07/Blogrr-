import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <span className="text-sm font-medium">Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
