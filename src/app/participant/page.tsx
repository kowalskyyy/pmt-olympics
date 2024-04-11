"use client";

import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebaseConfig.js"; // Update this path
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation.js";
export default function ParticipantPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between sign-in and registration
  const router = useRouter();
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered");

      // Extract user
      const user = userCredential.user;

      // Create a user profile document in Firestore
      await setDoc(doc(db, "UserScore", user.uid), {
        email: user.email,
        name: name,
        lastName: lastname,
        createdAt: new Date(),
        scores: {
          score1: 0,
          score2: 0,
          score3: 0,
        },
      });
      console.log("created user profile document");

      await signInWithEmailAndPassword(auth, email, password);

      console.log("signed in!");

      router.push("/");
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
      {isRegistering && (
        <>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Last name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </>
      )}
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
        <>
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            fullWidth
          >
            Register
          </Button>
        </>
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
