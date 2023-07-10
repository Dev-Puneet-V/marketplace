import './App.css';
import { AuthContextProvider } from "./contexts/AuthContext";
import { ToastContainer, toast } from 'c';
import 'react-toastify/dist/ReactToastify.css';
import eventBus from "./helpers/Eventbus";
import Navigation from './Navigation';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const toastSuccess = eventBus.subscribe("toast:success", (message) => {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    });

    return () => {
      toastSuccess.unsubscribe();
    }
  }, []);

  useEffect(() => {
    const toastError = eventBus.subscribe("toast:error", (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });

    return () => {
      toastError.unsubscribe();
    }
  }, []);


  return (
    <div className="App">
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
