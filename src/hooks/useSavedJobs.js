import { useEffect, useState } from "react";

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem("savedJobs")) || [];
        setSavedJobs(stored);
      } catch (err) {
        console.error("Error parsing saved jobs:", err);
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const toggleSaveJob = (job) => {
    const isSaved = savedJobs.some((j) => j.job_id === job.job_id);
    const updated = isSaved
      ? savedJobs.filter((j) => j.job_id !== job.job_id)
      : [...savedJobs, job];

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  const isJobSaved = (job) => savedJobs.some((j) => j.job_id === job.job_id);

  return { savedJobs, loading, toggleSaveJob, isJobSaved };
}
