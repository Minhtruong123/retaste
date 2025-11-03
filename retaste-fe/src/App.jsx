import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Client/Pages/HomePage";
import MenuPage from "./components/Client/Pages/MenuPage";
import ComboPage from "./components/Client/Pages/ComboPage";
import PromotionPage from "./components/Client/Pages/PromotionPage";
import SuggestedDishesPage from "./components/Client/Pages/SuggestedDishesPage";
import AboutUsPage from "./components/Client/Pages/AboutUsPage";
import ContactPage from "./components/Client/Pages/ContactPage";
import AuthForm from "./components/Auth/AuthForm";
import Layout from "./components/Client/Pages/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/combo" element={<ComboPage />} />
            <Route path="/suggest" element={<SuggestedDishesPage />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
