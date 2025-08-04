# 🚀 NetFi — DeFi Token Analyzer

**NetFi** is a sleek, user-friendly DeFi token analyzer that empowers users to search and view real-time token insights on Ethereum. Get everything from token stats to price charts and DEX liquidity pools - instantly, without connecting your wallet.

> 🧠 **Learn DeFi smarter.** No wallet needed. Just search, analyze, and explore.

---

## ✨ Features

### 🔍 Smart Token Search

* Lookup tokens by **contract address**, **name**, or **symbol**
* Intelligent auto-detection and validation
* Tracks search history with easy revisit and management
* Up to **20 recent searches** stored in `localStorage`

### 📊 Token Overview

* Real-time token data from [CoinGecko API](https://coingecko.com)
* View **name**, **symbol**, **price**, **market cap**, **volume**, and more
* Ensures accuracy using verified contract metadata

### 👥 Holder Statistics

* On-chain data via [Etherscan API](https://etherscan.io)
* Shows **current number of holders** per token

### 🔁 DEX Liquidity Insights

* Real-time trading pairs via [Dexscreener API](https://dexscreener.com)
* Top liquidity pools, trading volumes, and pair links
* Direct navigation to DEX pair pages

### 📈 7-Day Price Chart

* Smooth interactive chart using `Chart.js` and `react-chartjs-2`
* Historical price data with tooltips and dynamic timestamps
* Visually compelling overview of token movement

### 🕘 Search History

* Access recent token lookups with timestamps
* **Delete individual** tokens or **clear all** at once
* Useful for returning users or frequent researchers

---

## 🛠️ Tech Stack

| Category         | Technologies                             |
| ---------------- | ---------------------------------------- |
| Frontend         | React, Vite, Tailwind CSS                |
| Charting         | Chart.js, react-chartjs-2                |
| API Integrations | CoinGecko, Dexscreener, Etherscan        |
| State/Data       | React Hooks, Custom Hooks                |
| UX Enhancements  | React Spinners, Icons, Responsive Layout |

---

## 📦 Getting Started

```bash
git clone https://github.com/Dev-Rodiyat/NetFi.git
cd NetFi
npm install
npm run dev
```

> ⚠️ Create a `.env` file if you're using any private API keys or want to configure rate limits.

---

## 🧪 How to Use

1. **Launch** the app locally or deploy it.
2. In the search bar, enter:

   * A token symbol (e.g., `ETH`)
   * A full token name (e.g., `Tether`)
   * A valid contract address (e.g., `0x...`)
3. Explore live data:

   * Token overview
   * Holder count
   * Price chart
   * DEX trading pairs
4. Visit the **History** page to revisit or manage your past searches.

---

## 📁 Project Structure

```
src/
├── components/        // Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── TokenSearchBar.jsx
│   └── ...
├── hooks/             // Custom hooks for APIs
│   ├── useTokenData.js
│   └── useDexStats.js
├── pages/             // Page-level components
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── History.jsx
│   └── NotFound.jsx
├── utils/             // Utility functions
│   └── getEtherscanStats.js
└── App.jsx
```

---

## 🧭 Roadmap & To-Dos

| Feature                      | Status      | Notes                                        |
| ---------------------------- | ----------- | -------------------------------------------- |
| 🟡 Token Holder Pie Chart    | In Progress | Visualize distribution of top token holders  |
| ✅ Dark/Light Mode           | Planned     | Toggle based on system or user preference    |
| 🟡 Wallet Connection         | Planned     | Allow connected users to check balances      |
| 🟡 Multi-Chain Support       | Planned     | Add support for BSC, Arbitrum, Polygon, etc. |
| 🔲 Token Logo Integration    | Not Started | Fetch logos from CoinGecko/TrustWallet       |
| 🔲 Export to CSV/JSON        | Not Started | Useful for external analysis                 |
| 🔲 Token Comparison Tool     | Not Started | Side-by-side comparison for selected tokens  |
| 🟡 Mobile UX                 | In Progress | Better layout for smaller screens            |
| 🔲 Social/Community Insights | Not Started | Pull Reddit, Twitter, or Telegram sentiment  |
| 🔲 Scam Token Detector       | Not Started | Flag potentially malicious contracts         |
| 🔲 PWA Support               | Not Started | Offline capabilities and home screen install |

---

## 💡 Suggestions for Improvement

* **User Profiles**: Save favorite tokens or pin tokens to dashboard
* **Real-Time Alerts**: Trigger notifications for big price movements
* **Historical Comparison Tools**: Compare token charts over time
* **Token Audits Integration**: Add info from CertiK or RugDoc
* **Search Auto-Suggestions**: Smarter search bar powered by autocomplete
* **Modular Backend API**: Introduce backend caching layer to improve rate limits

---

## 📸 Screenshots

| Dashboard            | Token Chart           | Search History          |
| -------------------- | --------------------- | ----------------------- |
| ![Home](image.png)   | ![Chart](image-2.png) | ![History](image-3.png) |

---

## 🙋‍♀️ About the Author

Built with 💙 by **Rodiyat Olajide**, a passionate fullstack web developer exploring the power of DeFi data.

> Always building tools that make blockchain data more accessible, transparent, and user-friendly.

---

## 📬 Contributions

Want to contribute or suggest a feature?
Open an issue, create a pull request, or just star ⭐ the project to show support!
