import { useState } from "react";
import { Search } from "lucide-react";
import { ClipLoader } from "react-spinners";

const TokenSearchBar = ({ onSearch, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) onSearch(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-xl mx-auto relative"
    >

      <div className="group relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
            loading ? "text-slate-500" : "text-slate-400 group-hover:text-blue-400 group-focus-within:text-blue-400"
          }`}
          size={20}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter token symbol or contract address"
          disabled={loading}
          className={`w-full pl-10 pr-4 py-3 rounded-2xl border border-white/10 text-white placeholder-slate-400 transition-all duration-300 relative z-10 ${
            loading
              ? "bg-slate-900/50 cursor-not-allowed"
              : "bg-slate-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-slate-700/50"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-20 group-hover:opacity-50 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`group relative px-6 py-3 rounded-2xl text-base font-semibold transition-all duration-300 transform ${
          loading
            ? "bg-slate-900/50 text-slate-400 opacity-50 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer"
        }`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <>
              <ClipLoader size={16} color="#94a3b8" />
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </span>
        {!loading && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />
          </>
        )}
      </button>
    </form>
  );
};

export default TokenSearchBar;