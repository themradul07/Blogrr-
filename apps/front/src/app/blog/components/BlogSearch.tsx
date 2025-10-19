import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function BlogSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  return (
    <div className="flex items-center bg-white rounded-md px-3 py-2">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search blogs..."
        className="ml-2 bg-transparent outline-none w-full text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
