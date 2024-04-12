"use client";

import { Grid, Typography, Container } from "@mui/material";
import NavBar from "../app/components/navbar";
import PhotoFeed from "@/app/components/photofeed";
import UserScores from "@/app/components/userscores";

export default function HomePage() {
  return (
    <>
      <NavBar navButton="My account" url="/my-account" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Container maxWidth="sm" sx={{ mt: 2 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Digital Scoreboard
            </Typography>
            <UserScores />
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{ height: "100vh", overflow: "auto", maxWidth: "400px" }}>
            <PhotoFeed />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
