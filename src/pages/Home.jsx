import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-ping"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (2 + Math.random() * 2) + 's'
            }}
          />
        ))}
      </div>

      <section className={`max-w-7xl mx-auto py-16 pb-4 flex flex-col items-center text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Welcome to NetFi
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl animate-pulse" />
        </div>

        <p className={`text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Analyze DeFi tokens in real-time with cutting-edge analytics. Track liquidity, volume, holders, and performance across the entire Ethereum ecosystem.
        </p>

        <div className="flex gap-4 sm:flex-row flex-col">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer"
          >
            <span className="relative z-10">Launch Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
          </button>

          <button
            // onClick={() => navigate('/about')}
            className="group relative bg-slate-800/50 hover:bg-slate-700/50 text-white px-10 py-4 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer border border-white/10"
          >
            <span className="relative z-10">View Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-300" />
          </button>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-transparent" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {[
            {
              title: "Token Insights",
              desc: "Get instant access to token prices, liquidity, volume and market cap with real-time updates.",
              icon: "📊",
              gradient: "from-blue-500/20 to-cyan-500/20"
            },
            {
              title: "DeFi Analytics",
              desc: "Dive deep into on-chain DeFi data including TVL, DEX activity, and comprehensive swap volumes.",
              icon: "🔍",
              gradient: "from-purple-500/20 to-pink-500/20"
            },
            {
              title: "Wallet Lookup",
              desc: "Instantly check any wallet's complete token portfolio and total value with detailed breakdowns.",
              icon: "💼",
              gradient: "from-emerald-500/20 to-teal-500/20"
            },
          ].map(({ title, desc, icon, gradient }, index) => (
            <div
              key={title}
              className={`group relative bg-gradient-to-br ${gradient} backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
                <p className="text-slate-300 text-base leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-slate-300 text-xl max-w-2xl mx-auto">
              Get started with NetFi in 3 simple steps — no wallet connection required, just pure analytics power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search a Token",
                desc: "Enter any token symbol or contract address to instantly retrieve comprehensive DeFi data from the Ethereum blockchain.",
                color: "blue"
              },
              {
                step: "2",
                title: "Analyze Key Metrics",
                desc: "View real-time analytics including price movements, liquidity pools, trading volume, holder distribution, and transaction history.",
                color: "purple"
              },
              {
                step: "3",
                title: "Make Informed Moves",
                desc: "Leverage deep insights and advanced analytics to guide your next DeFi strategy with confidence and precision.",
                color: "cyan"
              },
            ].map(({ step, title, desc, color }, index) => (
              <div
                key={step}
                className={`relative group transition-all duration-500 hover:transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
                    <p className="text-slate-300 text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm p-12 rounded-3xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ready to explore the DeFi landscape?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of DeFi enthusiasts using NetFi for advanced token analytics and market insights.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative inline-block bg-gradient-to-r from-white to-slate-100 text-slate-900 font-bold px-10 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/25 cursor-pointer"
              >
                <span className="relative z-10">Launch Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-white to-slate-200 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;