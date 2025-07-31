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
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 dark:bg-gray-900 text-center px-4">
      <AlertTriangle className="text-orange-500 mb-4" size={48} />
      <h1 className="text-5xl font-bold text-orange-600 mb-2">404</h1>
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Page not found
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleGoBack}
        className="inline-block px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
