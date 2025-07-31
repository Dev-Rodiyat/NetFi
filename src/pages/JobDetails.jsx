import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { useSavedJobs } from "../hooks/useSavedJobs";
import { Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";

const JobDetails = () => {
    const { id } = useParams();
    const { allJobs, loading } = useJobs();
    const { toggleSaveJob, isJobSaved } = useSavedJobs();
    const navigate = useNavigate();

    const job = allJobs.find((job) => job.job_id === id);

    const hasNavigatedBefore = useRef(false);
    useEffect(() => {
        hasNavigatedBefore.current = window.history.length > 1;
    }, []);

    const handleBack = () => {
        if (hasNavigatedBefore.current) {
            navigate(-1);
        } else {
            navigate("/jobs");
        }
    };

    console.log(job)

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader />
            </div>
        );

    if (!job)
        return (
            <div className="p-6 text-red-600 bg-orange-50 min-h-screen">
                Job not found.
            </div>
        );

    return (
        <div className="px-4 py-10 bg-orange-50 pt-20 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-10 bg-white dark:bg-gray-900 rounded-lg shadow relative">
                <button
                    onClick={handleBack}
                    className="absolute -top-4 left-0 flex items-center gap-1 text-orange-600 hover:text-orange-800 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="text-sm font-medium">Back</span>
                </button>

                <div className="flex justify-between items-start mb-6 mt-6">
                    <h1 className="text-2xl font-bold text-orange-600">{job.job_title}</h1>
                    <button
                        onClick={() => toggleSaveJob(job)}
                        className="text-orange-500 hover:scale-110 transition-transform"
                        aria-label="Save Job"
                    >
                        {isJobSaved(job) ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
                    </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Company:</strong> {job.employer_name}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Location:</strong> {job.job_city || job.job_country || "Not specified"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Job Type:</strong> {job.job_employment_type || "N/A"}
                </p>

                {job.job_description && (
                    <div className="prose dark:prose-invert mt-6 whitespace-pre-line text-gray-800 dark:text-gray-300">
                        {job.job_description}
                    </div>
                )}

                <div className="mt-8">
                    <a
                        href={job.job_apply_link || job.job_google_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
