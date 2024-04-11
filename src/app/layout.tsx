import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext"; // Adjust the path to where your AuthContext is

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {" "}
        <AuthContextProvider>{children} </AuthContextProvider>
      </body>
    </html>
  );
}
