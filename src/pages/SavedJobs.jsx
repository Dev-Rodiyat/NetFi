import { useState } from "react";
import { useSavedJobs } from "../hooks/useSavedJobs";
import JobCard from "../components/JobCard";
import { Search, XCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";

const SavedJobs = () => {
  const { savedJobs, loading } = useSavedJobs();
  const [search, setSearch] = useState("");
  const reversedJobs = [...savedJobs].reverse();

  const filteredJobs = reversedJobs.filter((job) => {
    const term = search.toLowerCase();
    return (
      job.job_title?.toLowerCase().includes(term) ||
      job.employer_name?.toLowerCase().includes(term) ||
      job.job_city?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="pt-16 bg-orange-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Saved Jobs</h1>

        <div className="relative w-full sm:w-1/2 mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search saved jobs..."
            className="w-full pl-10 pr-10 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
              aria-label="Clear search"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center text-orange-600">
            <ClipLoader />
            <p className="mt-2">Loading saved jobs...</p>
          </div>
        ) : filteredJobs.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {search
              ? "No saved jobs match your search."
              : "You haven’t saved any jobs yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
