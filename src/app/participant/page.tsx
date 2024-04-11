"use client";

import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig.js"; // Update this path

export default function ParticipantPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between sign-in and registration

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in");
      // Redirect or update UI
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Error signing in. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered");
      // Redirect or update UI, possibly sign the user in automatically
    } catch (error) {
      console.error("Error registering: ", error);
      alert("Error registering. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {isRegistering ? "Register" : "Sign In"}
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistering ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          fullWidth
        >
          Sign In
        </Button>
      )}
      <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
        <Grid item>
          <Button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering
              ? "Already have an account? Sign in"
              : "Don't have an account? Register"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
