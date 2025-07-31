import { Link } from "react-router-dom";
import { Briefcase, Globe, Search, UserPlus } from "lucide-react";

const Home = () => {
  return (
    <div className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 pt-14">
      <section className="py-20 px-4 text-center bg-orange-400 text-white rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Tech Jobs That Fit You
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Whether remote or on-site, find your next opportunity with StackJobs.
          </p>
          <Link
            to="/jobs"
            className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Browse Jobs
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Why StackJobs?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              {
                icon: <Briefcase size={32} className="text-orange-500" />,
                title: "Tech-Focused",
                desc: "We curate jobs tailored for developers, designers, and tech pros.",
              },
              {
                icon: <Globe size={32} className="text-orange-500" />,
                title: "Global Reach",
                desc: "Find remote and local jobs from around the world.",
              },
              {
                icon: <Search size={32} className="text-orange-500" />,
                title: "Simple Search",
                desc: "Clean interface with powerful filtering and job discovery.",
              },
              {
                icon: <UserPlus size={32} className="text-orange-500" />,
                title: "No Sign-up Needed",
                desc: "Jump straight in and start browsing jobs immediately.",
              },
            ].map((f, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="space-y-8 text-left">
            {[
              { step: "1. Browse Jobs", desc: "Use our filters to explore tech jobs by location, remote type, or role." },
              { step: "2. View Details", desc: "Get direct access to job descriptions and company information." },
              { step: "3. Apply Instantly", desc: "Click through and apply on the employer’s site - no login required." },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow">
                <h4 className="text-lg font-semibold text-orange-500 mb-2">{item.step}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-orange-500 text-white rounded-t-3xl">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to find your next opportunity?</h2>
          <p className="mb-6">Browse hundreds of tech jobs from top companies and startups.</p>
          <Link
            to="/jobs"
            className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
