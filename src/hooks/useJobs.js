import { useEffect, useState } from "react";
import axios from "axios";

export function useJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPages = 3; // Fetch only first 3 pages to avoid hitting rate limits
  const delay = 1500; // 1.5 seconds between requests

  useEffect(() => {
    const fetchAllPages = async () => {
      setLoading(true);
      const jobs = [];

      for (let page = 1; page <= totalPages; page++) {
        try {
          const options = {
            method: "GET",
            url: "https://jsearch.p.rapidapi.com/search",
            params: {
              query: "developer jobs",
              page: page.toString(),
              num_pages: "1",
              country: "us",
              date_posted: "all",
            },
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_JOB_API_KEY,
              "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
          };

          const response = await axios.request(options);

          if (response.data && response.data.data) {
            jobs.push(...response.data.data);
          }

          // Wait before next request to avoid hitting rate limit
          if (page < totalPages) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        } catch (error) {
          console.error("Error fetching page", page, error);
        }
      }

      setAllJobs(jobs);
      setLoading(false);
    };

    fetchAllPages();
  }, []);

  return { allJobs, loading };
}
