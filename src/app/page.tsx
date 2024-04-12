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
      <NavBar navButton="My scores" url="/my-account" />
      <span style={{ display: "block", height: "15px" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Card sx={{ backgroundColor: "#d3e9ff", mb: 2 }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", padding: "0px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={10} sm={5}>
                  <img
                    src="/olympics.png"
                    alt="hero"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Pinmeto Olympics 2024!{" "}
                  </Typography>{" "}
                  <Typography variant="subtitle1" component="h1" gutterBottom>
                    We are so excited to have you here! On this page you will
                    find everything you need to compete, have fun, and win!{" "}
                    <br />
                    <br />
                    Follow the map to compete in the different challenges and
                    input your score under the `My scores` tab. <br />
                    <br />
                    Remember to take funny pictures and upload them to our
                    digital gallery! <br />
                  </Typography>{" "}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#d3e9ff" }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", padding: "0px" }}
            >
              <Container maxWidth="sm" sx={{ mt: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                  Digital Scoreboard
                </Typography>
                <UserScores />
              </Container>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card sx={{ backgroundColor: "#d3e9ff" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <div style={{ overflow: "auto", width: "100%" }}>
                <PhotoFeed />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
