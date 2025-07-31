import { useState } from "react";
import JobCard from "../components/JobCard";
import { useJobs } from "../hooks/useJobs";
import { Search, XCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";

const JobList = () => {
  const { allJobs, loading } = useJobs();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredJobs = allJobs.filter((job) => {
    const term = search.toLowerCase();

    const matchSearch =
      job.job_title?.toLowerCase().includes(term) ||
      job.employer_name?.toLowerCase().includes(term) ||
      job.job_city?.toLowerCase().includes(term);

    const matchFilter =
      filter === "All" ||
      (filter === "Remote" && job.job_is_remote) ||
      (filter === "On-site" && !job.job_is_remote);

    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-orange-50 dark:bg-gray-900 min-h-screen px-4 py-6 pt-28">
      <div className="max-w-7xl mx-auto">

        <div className="sticky top-14 bg-orange-50 dark:bg-gray-900 z-30 pb-4">
          <h1 className="text-3xl font-bold mb-1 text-center text-orange-600">
            Explore Jobs
          </h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Showing {filteredJobs.length} jobs
          </p>
        </div>

        <div className="sticky top-28 bg-orange-50 dark:bg-gray-900 z-20 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full sm:w-1/2">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search job title, location or company..."
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

            <select
              className="w-full sm:w-40 px-4 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-orange-600 flex flex-col items-center justify-center mt-10">
            <ClipLoader />
            <p className="mt-2">Loading jobs...</p>
            <p className="mt-2">Please wait for a while...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No jobs match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;
