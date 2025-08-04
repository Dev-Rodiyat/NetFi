import { useState } from "react";
import TokenSearchBar from "../components/TokenSearchBar";
import { useTokenData } from "../hooks/useTokenData";
import { useDexStats } from "../hooks/useDexStats";
import { ClipLoader } from "react-spinners";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
    Filler,
    TimeScale,
    ArcElement,
} from "chart.js";

ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
    Filler,
    ArcElement,
    TimeScale
);

const Dashboard = () => {
    const { data, chart, holders, loading, error, fetchTokenData } = useTokenData();
    const { dexStats, loadingDex, errorDex, fetchDexStats } = useDexStats();
    const [tokenInput, setTokenInput] = useState("");
    const [contractInfo, setContractInfo] = useState(null);

    const handleSearch = async (input) => {
        setTokenInput(input);
        setContractInfo(null);

        await fetchTokenData(input).then((result) => {
            if (result) {
                const existing = JSON.parse(localStorage.getItem("tokenHistory")) || [];
                const exists = existing.find((item) => item.id === result.id || item.address === result.address);
                if (!exists) {
                    const updated = [result, ...existing].slice(0, 20);
                    localStorage.setItem("tokenHistory", JSON.stringify(updated));
                }
            }

            if (input.startsWith("0x") && input.length === 42) {
                fetchDexStats(input);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl text-white px-4 py-10 relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50 transition-opacity duration-500 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto text-center pt-12">
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 transition-all duration-300 transform hover:scale-105">
                    DeFi Token Analyzer
                </h1>
                <TokenSearchBar onSearch={handleSearch} loading={loading}/>
            </div>

            <div className="relative max-w-4xl mx-auto mt-10 space-y-6">
                {loading && <ClipLoader size={35} color="#60a5fa" className="mx-auto" />}
                {error && (
                    <div className="group p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <p className="text-blue-400">{error}</p>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}

                {data && (
                    <div className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <h2 className="text-xl font-semibold text-white mb-4">📊 Token Overview</h2>
                        <div className="space-y-2 text-slate-300">
                            <p><strong>Name:</strong> {data.name}</p>
                            <p><strong>Symbol:</strong> {data.symbol}</p>
                            <p><strong>Price:</strong> ${data.price.toLocaleString()}</p>
                            <p><strong>Market Cap:</strong> ${data.marketCap.toLocaleString()}</p>
                            <p><strong>Volume 24h:</strong> ${data.volume.toLocaleString()}</p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}

                {chart && (
                    <div className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <h2 className="text-xl font-semibold text-white mb-4">📈 Price Chart (7d)</h2>
                        <Line
                            data={{
                                labels: chart.map(([ts]) => new Date(ts).toLocaleDateString()),
                                datasets: [{
                                    label: data.symbol + " Price",
                                    data: chart.map(([, price]) => price),
                                    borderColor: "rgb(59, 130, 246)",
                                    backgroundColor: (context) => {
                                        const ctx = context.chart.ctx;
                                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                                        gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
                                        gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)");
                                        return gradient;
                                    },
                                    pointBackgroundColor: "rgb(139, 92, 246)",
                                    pointBorderColor: "rgb(139, 92, 246)",
                                    tension: 0.2,
                                    fill: true,
                                }],
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: false,
                                        grid: { color: "rgba(255, 255, 255, 0.1)" },
                                        ticks: { color: "rgb(203, 213, 225)" },
                                    },
                                    x: {
                                        grid: { color: "rgba(255, 255, 255, 0.1)" },
                                        ticks: { color: "rgb(203, 213, 225)" },
                                    },
                                },
                                plugins: {
                                    legend: { labels: { color: "rgb(203, 213, 225)" } },
                                    tooltip: {
                                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                                        titleColor: "rgb(203, 213, 225)",
                                        bodyColor: "rgb(203, 213, 225)",
                                    },
                                },
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}

                {holders?.count !== undefined && !isNaN(holders.count) && (
                    <div className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <h2 className="text-xl font-semibold text-white mb-4">👥 Holders</h2>
                        <p className="text-slate-300">
                            <strong>Total Holders:</strong> {Number(holders.count).toLocaleString()}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}

                {loadingDex && <ClipLoader size={30} color="#60a5fa" className="mx-auto" />}
                {errorDex && (
                    <div className="group p-4 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <p className="text-blue-400">{errorDex}</p>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}
                {dexStats && dexStats.length > 0 && (
                    <div className="group p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                        <h2 className="text-xl font-semibold text-white mb-4">🔁 DEX Liquidity Pools</h2>
                        <div className="space-y-4">
                            {dexStats.slice(0, 5).map((pair, i) => (
                                <a
                                    key={pair.pairAddress || i}
                                    href={pair.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/item block p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-2xl border border-white/10 text-slate-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                                >
                                    <p><strong>Pair:</strong> {pair.baseToken?.symbol}/{pair.quoteToken?.symbol}</p>
                                    <p><strong>Liquidity:</strong> ${Number(pair.liquidity?.usd || 0).toLocaleString()}</p>
                                    <p><strong>Volume (24h):</strong> ${Number(pair.volume?.h24 || 0).toLocaleString()}</p>
                                    <p className="text-blue-400 mt-1 group-hover/item:underline">View on Dexscreener →</p>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </a>
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
        </div>
    );
};

export default Dashboard;