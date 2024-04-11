"use client";

import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig"; // Update this path
import NavBar from "../app/components/navbar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import UserScores from "@/app/components/userscores";

export default function HomePage() {
  return (
    <>
      <NavBar navButton="My account" url="/my-account" />
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Digital Scoreboard
        </Typography>
        <UserScores />
        <Typography variant="body1">
          This is where the scores will be displayed.
        </Typography>
      </Container>
    </>
  );
}
