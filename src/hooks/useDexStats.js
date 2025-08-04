import { useState } from "react";
import axios from "axios";

export const useDexStats = () => {
  const [dexStats, setDexStats] = useState(null);
  const [loadingDex, setLoadingDex] = useState(false);
  const [errorDex, setErrorDex] = useState("");

  const fetchDexStats = async (contractAddress) => {
    setLoadingDex(true);
    setErrorDex("");
    setDexStats(null);

    try {
      const { data } = await axios.get(`https://api.dexscreener.com/latest/dex/search?q=${contractAddress}`);
      
      if (!data?.pairs || data.pairs.length === 0) {
        throw new Error("No DEX trading pairs found for this token.");
      }

      const topPairs = data.pairs.slice(0, 5);
      setDexStats(topPairs);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.message ||
        "Failed to fetch DEX stats.";
      setErrorDex(message);
    } finally {
      setLoadingDex(false);
    }
  };

  return { dexStats, loadingDex, errorDex, fetchDexStats };
};
