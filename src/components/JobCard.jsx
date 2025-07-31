import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedJobs } from "../hooks/useSavedJobs";

const JobCard = ({ job }) => {
    const { toggleSaveJob, isJobSaved } = useSavedJobs();

    const formatDate = (dateStr) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const location = [
        job.job_city,
        job.job_state,
        job.job_country
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 relative">
            <button
                onClick={() => toggleSaveJob(job)}
                className="absolute top-3 right-3 text-orange-500 hover:scale-110 transition-transform"
                aria-label="Save Job"
            >
                {isJobSaved(job) ? (
                    <BookmarkCheck size={20} title="Unsave" />
                ) : (
                    <Bookmark size={20} title="Save" />
                )}
            </button>

            <Link to={`/job/${job.job_id}`}>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-orange-500 hover:underline mb-3">
                    {job.job_title}
                </h2>
            </Link>

            <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Company:</strong> {job.employer_name || "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Location:</strong> {location || "N/A"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Posted: {formatDate(job.job_posted_at_datetime_utc)}
                </p>
                <p className="text-sm px-3 py-1 mt-2 bg-orange-100 text-orange-600 rounded-full font-medium max-w-[80px] text-center">
                    {job.job_is_remote ? "Remote" : "On-site"}
                </p>
            </div>
        </div>
    );
};

export default JobCard;
