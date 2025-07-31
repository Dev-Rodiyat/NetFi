import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Do I need to create an account to apply for jobs?",
    answer: "No, StackJobs lets you browse and apply without creating an account.",
  },
  {
    question: "Are the job listings verified?",
    answer: "We source jobs from reliable platforms and regularly review listings for quality.",
  },
  {
    question: "Can I filter jobs by remote or location?",
    answer: "Yes, you can filter jobs by remote, hybrid, or specific cities.",
  },
  {
    question: "Is StackJobs only for developers?",
    answer: "While developer roles are our focus, we also feature roles in design, data, and DevOps.",
  },
];

const About = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 pt-12">
      {/* About Us */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About StackJobs</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          StackJobs is a modern platform dedicated to helping tech professionals connect with quality job opportunities - remote or on-site - across the globe.
        </p>
      </section>

      {/* Our Mission */}
      <section className="py-12 px-4 bg-orange-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-orange-600">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To make job hunting for tech roles easier, faster, and more transparent - without unnecessary signups or distractions.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose StackJobs?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Tech-Only Listings",
              desc: "We focus purely on tech roles - no spam, no unrelated jobs.",
            },
            {
              title: "Remote & On-site",
              desc: "Find roles that match your preferred work style - from fully remote to in-office.",
            },
            {
              title: "No Login Required",
              desc: "Apply instantly without creating yet another account.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="font-semibold text-xl mb-2 text-orange-500">{item.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 hover:bg-orange-50 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between font-medium text-left"
              >
                <span>{faq.question}</span>
                {openFAQ === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFAQ === i && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
