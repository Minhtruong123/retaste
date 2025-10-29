import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Client/Pages/HomePage";
import MenuPage from "./components/Client/Pages/MenuPage";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
