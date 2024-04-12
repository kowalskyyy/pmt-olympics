"use client";

import { Typography, Container } from "@mui/material";
import NavBar from "../app/components/navbar";
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
