import { useState, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import debounce from "lodash.debounce";
import { suggestedUsers } from "@/lib/actions/userActions";
import { User } from "@/lib/types/modelTypes";
import Link from "next/link";

type Props = {
  users: User[];
  setSearch: (val: string) => void;
};

export default function BlogSearch({ setSearch, users }: Props) {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setsearch] = useState("");

  // Initialize filtered state from props (first render or prop change)
  useEffect(() => {
    if (users && users.length > 0) {
      setFiltered(users);
    } else {
      setFiltered([]);
    }
  }, [users]);

  // Fetch suggestions from backend API
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await suggestedUsers(query); // Your backend call
      setSuggestions(res || []); // ensure fallback to []
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetchSuggestions function (run only after 400ms of inactivity)
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 400), []);

  // Handle user typing
  const handleInputChange = (value: string) => {
    setsearch(value);
    
    debouncedFetch(value);
  };

  // Handle "Enter" press to finalize filter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(search);
      e.preventDefault();
      setFiltered(suggestions);
      setSuggestions([]);
    }
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return (
    <>
      {/* Search Input */}
      <div className="flex items-center bg-white rounded-md px-3 py-2 relative">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="ml-2 bg-transparent outline-none w-full text-sm"
          value={search}
          
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Suggestion Dropdown */}
        {loading && (
          <p className="absolute top-full left-0 mt-1 w-full text-sm text-gray-400 bg-white text-center py-2">
            Loading...
          </p>
        )}
        {!loading && suggestions.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md z-10">
            {suggestions.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSearch(s.name);
                  setFiltered([s]);
                  setSuggestions([]);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm text-gray-700"
              >
                {s.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filtered Results */}
      <div className="bg-white shadow-sm rounded-lg p-4 w-full max-w-sm mt-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Suggested Users
        </h2>
        {filtered.length === 0 ? (
          <p className="w-full text-center text-gray-500 text-sm mt-8">
            No Recommended User Found.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((user) => (
              <Link 
                key={user.id}
              href={`/user/profile/${user.id}`}>
              <div
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:shadow transition"
                >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {user.bio}
                    </p>
                  </div>
                </div>
                {/* <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition">
                  Follow
                </button> */}
              </div>
                </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
