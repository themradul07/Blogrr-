import { Tag } from "@/lib/types/modelTypes";
import { TagIcon } from "@heroicons/react/24/outline";

// const tagsList = ["AI", "Next.js", "React", "DevOps", "Finance", "Design"];

export default function BlogFilter({
  selectedTags,
  setSelectedTags,
  tagsList
}: {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  tagsList : Tag[]
}) {
  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };
  

  return (
    <div className="p-3 bg-white rounded-md ">
      <div className="flex items-center mb-2">
        <TagIcon className="h-5 w-5 text-gray-600 mr-2" />
        <h3 className="font-semibold text-gray-700">Filter by Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tagsList.map((tag) => (
          <button
            key={tag.id}
            onClick={() => toggleTag(tag.name)}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              selectedTags.includes(tag.name)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
