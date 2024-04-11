"use client";

import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Update this path
import { useEffect } from "react";
import NavBar from "../app/components/navbar";

export default function HomePage() {
  return (
    <>
      <NavBar navButton="My account" url="/my-account" />
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
