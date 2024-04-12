import { useAuthContext } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { db } from "../../../firebaseConfig";

export default function GameScoreInput({ game }) {
  const { user, loading } = useAuthContext();
  const [score, setScore] = useState("");
  const [userScores, setUserScores] = useState({});

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  useEffect(() => {
    const userScoreRef = doc(db, "UserScore", user.uid);
    const unsubscribe = onSnapshot(userScoreRef, (doc) => {
      if (doc.exists()) {
        setUserScores(doc.data().scores);
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [user.uui]);

  const handleSubmitScore = async (event) => {
    event.preventDefault();

    const gameRef = doc(db, "Games", game.id);
    const userScoreRef = doc(db, "UserScore", user.uid);

    try {
      // Update the game document in the 'Games' collection
      await updateDoc(gameRef, {
        [`userScores.${user.uid}`]: score,
      });

      // Update the user document in the 'UserScore' collection
      await updateDoc(userScoreRef, {
        [`scores.${game.name}`]: score,
      });

      setScore(""); // Clear the input
    } catch (error) {
      console.error("Error submitting score: ", error);
    }
  };

  const handleDeleteScore = async (event) => {
    event.preventDefault();

    const gameRef = doc(db, "Games", game.id);
    const userScoreRef = doc(db, "UserScore", user.uid);

    try {
      // Update the game document in the 'Games' collection
      await updateDoc(gameRef, {
        [`userScores.${user.uid}`]: null,
      });

      // Update the user document in the 'UserScore' collection
      await updateDoc(userScoreRef, {
        [`scores.${game.name}`]: null,
      });

      setScore(""); // Clear the input
    } catch (error) {
      console.error("Error deleting score: ", error);
    }
  }

  return (
    <>
      <Card
        variant="outlined"
        key={game.id}
        sx={{ backgroundColor: "#d3e9ff", margin: "1rem" }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {game.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Number of participants: {Object.keys(game.userScores).length}
          </Typography>
          {!userScores?.[game.name] &&(<Box
            component="form"
            onSubmit={handleSubmitScore}
            noValidate
            sx={{ mt: 1, display: "flex" }}
          >
            <TextField
              label="Score"
              type="number"
              value={score}
              onChange={handleScoreChange}
              required
              sx={{ backgroundColor: "#ffffff" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Submit Score
            </Button>
          </Box>)
          }
          {userScores?.[game.name] && (
            <span style={{display: "flex"}}>
            <Typography variant="h5" color="text.secondary">
              Your score: {userScores[game.name]}
            </Typography>
              <Button
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
              onClick={handleDeleteScore}
            >
              Delete Score
            </Button>
            </span>
          )}
        </CardContent>
      </Card>
    </>
  );
}
