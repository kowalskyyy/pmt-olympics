"use client";

import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Update this path
import { useEffect } from "react";

export default function HomePage() {
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
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Digital Scoreboard
          </Typography>
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/participant">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Digital Scoreboard
        </Typography>
        <Typography variant="body1">
          This is where the scores will be displayed.
        </Typography>
      </Container>
    </>
  );
}
