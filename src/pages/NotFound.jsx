import { useEffect, useRef } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const hasNavigatedBefore = useRef(false);

  useEffect(() => {
    hasNavigatedBefore.current = navigationType === "POP" || navigationType === "PUSH";
  }, [navigationType]);

  const handleGoBack = () => {
    if (hasNavigatedBefore.current) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xl text-center px-4 relative">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50 transition-opacity duration-500" />

      <div className="relative z-10">

        <div className="relative group mb-8 flex items-center justify-center">
          <AlertTriangle
            className="text-blue-400 group-hover:text-purple-400 transition-all duration-300 transform group-hover:scale-110"
            size={48}
          />
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 transition-all duration-300 transform hover:scale-105">
          404
        </h1>

        <p className="text-xl font-semibold text-white mb-4">
          Page Not Found
        </p>

        <p className="text-slate-400 mb-6 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={handleGoBack}
          className="group relative bg-slate-800/50 hover:bg-slate-700/50 text-white px-10 py-4 rounded-2xl text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer border border-white/10"
        >
          <span className="relative z-10">Go Back</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-300" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default NotFound;