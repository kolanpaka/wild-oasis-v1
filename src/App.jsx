import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Account from "./pages/Account";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import ViewDetails from "./features/bookings/ViewDetails";
import Checkin from "./pages/Checkin";

export default function App() {
  const [isSessionExpired, setSessionExpired] = useState("initial");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <Login
                isSessionExpired={isSessionExpired}
                setSessionExpired={setSessionExpired}
              />
            }
          />
          <Route
            path="/"
            element={<AppLayout setSessionExpired={setSessionExpired} />}
          >
            <Route
              index
              element={<Navigate to="dashboard?duration=7" replace />}
            />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:bookingId" element={<ViewDetails />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}
