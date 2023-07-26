import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Layout from "./Layout";
import AccountPage from "./pages/AccountPage";
import AccountBookingPage from "./pages/AccountBookingPage";
import AccountPlacePage from "./pages/AccountPlacePage";
import NewPlaces from "./pages/NewPlaces";
import PlacePage from "./pages/PlacePage";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/bookings" element={<AccountBookingPage />} />
          <Route path="/account/places" element={<AccountPlacePage />} />
          <Route path="/account/places/new" element={<NewPlaces />} />
          <Route path="/account/places/:id" element={<NewPlaces />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
