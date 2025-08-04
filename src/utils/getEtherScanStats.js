import axios from "axios";

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";

export const getEtherscanStats = async (contractAddress) => {
  const [supplyRes, holdersRes] = await Promise.all([
    axios.get(`${ETHERSCAN_BASE_URL}?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`),
    axios.get(`${ETHERSCAN_BASE_URL}?module=token&action=tokenholderchart&contractaddress=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`)
  ]);

  const supply = supplyRes.data?.result;
  const holders = holdersRes.data?.result?.holdersCount;

  return { supply, holders };
};
