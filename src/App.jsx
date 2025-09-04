import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "./UI/Spinner";
import AppLayout from "./AppLayout";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));
const ViewDetails = lazy(() => import("./features/bookings/ViewDetails"));
const Checkin = lazy(() => import("./pages/Checkin"));

export default function App() {
  const [isSessionExpired, setSessionExpired] = useState("initial");

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </>
  );
}
