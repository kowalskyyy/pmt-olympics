import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function GameScoreInput({ game }) {
  const { user, loading } = useAuthContext();
  const [score, setScore] = useState("");

  if (!user || !user.uid) {
    console.error("User is not logged in");
    return;
  }

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

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

  return (
    <>
      <Card
        variant="outlined"
        key={game.id}
        sx={{ backgroundColor: "#d3e9ff", margin: "1rem" }}
      >
        <CardContent>
          <h2>{game.name}</h2>
          <p>Number of participants: {game.participants}</p>
          <form onSubmit={handleSubmitScore}>
            <label>
              Score:
              <input
                type="number"
                value={score}
                onChange={handleScoreChange}
                required
              />
            </label>
            <button type="submit">Submit Score</button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
