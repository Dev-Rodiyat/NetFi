import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "Do I need a wallet to use NetFi?",
    answer: "No, NetFi is fully public and does not require wallet connection to browse token data. We believe in making DeFi analytics accessible to everyone.",
    icon: "🔓"
  },
  {
    question: "Which chains are supported?",
    answer: "NetFi currently focuses on Ethereum mainnet tokens but plans to expand to multichain data including Polygon, BSC, and Arbitrum in future updates.",
    icon: "⛓️"
  },
  {
    question: "How real-time is the data?",
    answer: "We fetch data through reliable APIs every few seconds or on demand for accuracy. Our system ensures you always have the most current market information.",
    icon: "⚡"
  },
  {
    question: "Can I track my own wallet?",
    answer: "Yes, you can look up any wallet address and analyze its token holdings with detailed portfolio breakdowns and performance metrics.",
    icon: "👛"
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);
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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = [
    {
      title: "About Us",
      content: "NetFi is a frontend Web3 analytics platform built for everyday users and DeFi enthusiasts. We simplify on-chain data into clear insights so you can better understand the DeFi space and tokens you're tracking.",
      icon: "🏢",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Our Mission",
      content: "Our mission is to make decentralized finance more transparent, accessible, and informative by providing users with actionable token analytics — without requiring technical knowledge or wallet connections.",
      icon: "🎯",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "What We Do",
      items: [
        "Fetch and display real-time token metrics like price, liquidity, and volume",
        "Show DeFi token performance across various DEXs and liquidity pools",
        "Offer wallet-based lookup for viewing comprehensive token portfolios",
        "Aggregate reliable on-chain data into user-friendly, actionable views"
      ],
      icon: "⚙️",
      gradient: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  const dataSources = [
    { name: "CoinGecko API", purpose: "Token market data & pricing", icon: "📊" },
    { name: "Dexscreener API", purpose: "Liquidity pools & trading volume", icon: "🔄" },
    { name: "EtherScan API", purpose: "On-chain transactions & verification", icon: "🔍" },
    { name: "Alchemy / Infura", purpose: "Web3 providers for smart contract reads", icon: "🌐" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.01 + 'px',
            top: mousePosition.y * 0.01 + 'px',
          }}
        />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>


      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-ping"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 4 + 's',
              animationDuration: (3 + Math.random() * 2) + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 space-y-20">

        <section className={`text-center pt-12 pb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About NetFi
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover the story behind your favorite DeFi analytics platform and learn how we're making Web3 data accessible to everyone.
          </p>
        </section>

        <div className="flex flex-col gap-12">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`group relative bg-gradient-to-br ${section.gradient} backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-4xl mb-6 transform transition-transform duration-300">{section.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300">
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-slate-300 text-base leading-relaxed">{section.content}</p>
                )}
                {section.items && (
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300 text-base leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Data Sources Section */}
        <section className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Data Sources
            </h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto">
              NetFi uses trusted, public Web3 APIs to source its data, ensuring reliability and accuracy across all our analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataSources.map((source, index) => (
              <div
                key={source.name}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{source.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {source.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{source.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-xl">
              Got questions? We've got answers. Here are the most common questions about NetFi.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className="relative z-10 p-6 cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{faq.icon}</span>
                      <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {faq.question}
                      </h4>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl font-bold transition-all duration-300 ${openIndex === index ? 'rotate-45 bg-blue-500/30' : 'hover:bg-blue-500/30'}`}>
                      +
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-4 pl-12">
                      <p className="text-slate-300 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={`text-center py-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-sm p-12 rounded-3xl border border-white/20 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ready to dive into DeFi analytics?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Start exploring token data, tracking wallets, and analyzing DeFi trends with NetFi's powerful analytics platform.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="relative z-10">Explore Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;