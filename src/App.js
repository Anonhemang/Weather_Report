import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Index from "./components/Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Nav" element={<Navbar/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
