import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getEtherscanStats } from "../utils/getEtherScanStats";

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

const saveToHistory = (tokenData) => {
    const existing = JSON.parse(localStorage.getItem("tokenHistory")) || [];

    const exists = existing.some(
        (item) =>
            item.address?.toLowerCase() === tokenData.address?.toLowerCase() ||
            item.id === tokenData.id
    );

    if (!exists) {
        const updated = [tokenData, ...existing].slice(0, 25);
        localStorage.setItem("tokenHistory", JSON.stringify(updated));
    }
};

export const useTokenData = () => {
    const [data, setData] = useState(null);
    const [chart, setChart] = useState(null);
    const [holders, setHolders] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchTokenData = async (input) => {
        setLoading(true);
        setError("");
        setData(null);
        setChart(null);
        setHolders(null);

        try {
            let marketData;
            const isAddr = input.startsWith("0x") && input.length === 42;

            if (isAddr) {
                const cg = await axios.get(`${COINGECKO_BASE}/coins/ethereum/contract/${input}`);
                marketData = cg.data;
                const { supply, holders: hcount } = await getEtherscanStats(input);
                setHolders({ count: hcount });
                setData({
                    id: marketData.id,
                    name: marketData.name,
                    symbol: marketData.symbol.toUpperCase(),
                    price: marketData.market_data.current_price.usd,
                    marketCap: marketData.market_data.market_cap.usd,
                    volume: marketData.market_data.total_volume.usd,
                    supply,
                    address: input
                });
                saveToHistory({
                    id: marketData.id,
                    name: marketData.name,
                    symbol: marketData.symbol.toUpperCase(),
                    price: marketData.market_data.current_price.usd,
                    marketCap: marketData.market_data.market_cap.usd,
                    volume: marketData.market_data.total_volume.usd,
                    supply,
                    address: input,
                });
            } else {
                const list = await axios.get(`${COINGECKO_BASE}/coins/list`);
                const match = list.data.find(
                    (t) => t.symbol.toLowerCase() === input.toLowerCase() ||
                        t.id.toLowerCase() === input.toLowerCase()
                );
                if (!match) throw new Error("Token not found.");
                const cg = await axios.get(`${COINGECKO_BASE}/coins/${match.id}`, {
                    params: { localization: false, tickers: false, market_data: true }
                });
                marketData = cg.data;
                setData({
                    id: marketData.id,
                    name: marketData.name,
                    symbol: marketData.symbol.toUpperCase(),
                    price: marketData.market_data.current_price.usd,
                    marketCap: marketData.market_data.market_cap.usd,
                    volume: marketData.market_data.total_volume.usd,
                });
                saveToHistory({
                    id: marketData.id,
                    name: marketData.name,
                    symbol: marketData.symbol.toUpperCase(),
                    price: marketData.market_data.current_price.usd,
                    marketCap: marketData.market_data.market_cap.usd,
                    volume: marketData.market_data.total_volume.usd,
                });
            }

            const chartRes = await axios.get(
                `${COINGECKO_BASE}/coins/${marketData.id}/market_chart`,
                { params: { vs_currency: "usd", days: 7 } }
            );
            setChart(chartRes.data.prices);

            toast.success(`Fetched data for ${marketData.symbol.toUpperCase()}`);
        } catch (err) {
            const msg = err.response?.data?.error || err.message || "Failed to fetch token data";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return { data, chart, holders, loading, error, fetchTokenData };
};