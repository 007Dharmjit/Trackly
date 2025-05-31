import Forgraund from "./Components/TaskManager";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      {/* Main container with padding and flexible height */}
      <div className="py-5 min-h-[82vh] flex flex-col overflow-hidden">
        {/* Toast notifications container */}
        <ToastContainer />

        {/* App header - centered and responsive text size */}
        <h1 className="Header flex items-center justify-center text-4xl sm:text-5xl font-bold mb-6">
          Trackly
        </h1>

        {/* Main Task Manager component */}
        <div className="flex-grow">
          <Forgraund />
        </div>
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </>
  );
};

export default App;
