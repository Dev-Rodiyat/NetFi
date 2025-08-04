import { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";

const History = () => {
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("tokenHistory")) || [];
        setHistory(data);
    }, []);

    const handleDelete = (address) => {
        const updated = history.filter((item) => item.address !== address);
        setHistory(updated);
        localStorage.setItem("tokenHistory", JSON.stringify(updated));
        toast.success('History deleted successfully!')
    };

    const clearAll = () => {
        setHistory([]);
        localStorage.removeItem("tokenHistory");
        toast.success('History cleared successfully!')
    };

    const filteredHistory = history.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl text-white px-4 py-10 relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50 transition-opacity duration-500 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto pt-16">
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 transition-all duration-300 transform hover:scale-105">
                    🔍 Search History
                </h2>

                <form className="flex gap-2 w-full max-w-xl mb-6 relative">
                    <div className="group relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-400 group-focus-within:text-blue-400 transition-colors duration-300"
                            size={20}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by token name"
                            className="w-full pl-10 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:bg-slate-700/50 transition-all duration-300 relative z-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-20 group-hover:opacity-50 group-focus-within:opacity-50 transition-opacity duration-300 pointer-events-none" />
                    </div>
                </form>

                {filteredHistory.length === 0 ? (
                    <p className="text-slate-400 text-lg">
                        {searchQuery ? "No tokens match your search." : "No token history found."}
                    </p>
                ) : (
                    <div className="space-y-4">
                        {filteredHistory.map((token, index) => (
                            <div
                                key={index}
                                className="group p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-white">{token.name} ({token.symbol})</p>
                                    <p className="text-sm text-slate-400 truncate max-w-[300px]">{token.address}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(token.address)}
                                    className="group/button relative z-10 bg-slate-800/50 hover:bg-slate-700/50 text-blue-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 border border-white/10 cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center gap-1">
                                        <Trash2 size={16} />
                                        Remove
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </button>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        ))}
                        <button
                            onClick={clearAll}
                            className="group mt-4 relative bg-slate-800/50 hover:bg-slate-700/50 text-blue-400 px-6 py-3 rounded-2xl text-base font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 border border-white/10 cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center gap-1">
                                <Trash2 size={18} />
                                Clear All
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
        </div>
    );
};

export default History;