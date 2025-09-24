import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div clas sName="flex min-h-screen items-center justify-center bg-gray-100">
      <div clas sName="text-center">
        <h1 clas sName="mb-4 text-4xl font-bold">404</h1>
        <p clas sName="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" clas sName=" text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;