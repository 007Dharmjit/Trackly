import Forgraund from "./Components/TaskManager";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
const App = () => {
  return (
    <>
      <div className="py-5">
        <ToastContainer 
        />
        <h1 className="Header items-center justify-center flex text-5xl ">
          Trackly
        </h1>
        <Forgraund />
      </div>
        <Footer />
    </>
  );
};

export default App;
