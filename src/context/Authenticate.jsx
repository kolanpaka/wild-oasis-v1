import { createContext, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSession, getUser, signOut } from "../services/authenticateAPI";
// import toast from "react-hot-toast";
import Spinner from "../UI/Spinner";

const AuthenticateContext = createContext();

export function Authenticate({ children, setSessionExpired }) {
  const moveTo = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async function fetchUser() {
      const userData = await getUser();
      const session = await getSession();
      const id = setTimeout(async () => {
        await signOut();
        setSessionExpired("expired");
        clearTimeout(id);
        moveTo("login");
      }, session.expires_in * 1000);
      return userData;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex-center h-screen bg-[#F9FAFB]">
        <Spinner />
      </div>
    );
  }

  if (!data?.id) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthenticateContext.Provider value={data}>
      {children}
    </AuthenticateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthenticatedUser() {
  return useContext(AuthenticateContext);
}
