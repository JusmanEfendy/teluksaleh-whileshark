import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import LandingPage from "./pages/LandingPage";

// routes / guards
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== PUBLIC ROUTE ===== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<Login />} />

        {/* ===== PROTECTED ADMIN ROUTE ===== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
