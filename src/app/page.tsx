"use client";

import { Grid, Typography, Container } from "@mui/material";
import NavBar from "../app/components/navbar";
import PhotoFeed from "@/app/components/photofeed";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import UserScores from "@/app/components/userscores";

export default function HomePage() {
  return (
    <>
      <NavBar navButton="My account" url="/my-account" />
      <span style={{ display: "block", height: "15px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#d3e9ff" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Container maxWidth="sm" sx={{ mt: 2 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Digital Scoreboard
                </Typography>
                <UserScores />
              </Container>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: "#d3e9ff" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <div style={{ overflow: "auto", maxWidth: "600px" }}>
                <PhotoFeed />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
