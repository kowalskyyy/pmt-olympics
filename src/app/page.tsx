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
              <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  <br />
                  <br />
                  Also, here is the link to codebreaker:{" "}
                  <a href="https://luisaescalona.github.io/codebreaker/">
                    link!
                  </a>
                </Typography>{" "}
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: "#d3e9ff" }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", padding: "0px" }}
            >
              <Container sx={{ mt: 2 }}>
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
