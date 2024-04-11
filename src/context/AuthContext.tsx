"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  use,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Adjust the path as necessary
import { redirect, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !user && !loading) {
      if (!path.includes("participant")) {
        redirect("/participant");
      }
    }
  }, [user, loading]);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
