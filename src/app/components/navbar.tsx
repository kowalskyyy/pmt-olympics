"use client";

import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // Update this path

export default function NavBar({ navButton, url }) {
  const { user, loading } = useAuthContext();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Digital Scoreboard
        </Typography>
        <>
          <Button color="inherit" component={Link} href={url}>
            {navButton}
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}
