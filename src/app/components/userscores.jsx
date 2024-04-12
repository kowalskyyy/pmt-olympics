import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig"; 
import { collection, onSnapshot } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function UserScores() {
  const [userScores, setUserScores] = useState([]);
  const [gameNames, setGameNames] = useState([]);

  useEffect(() => {
    const unsubscribeUserScores = onSnapshot(collection(db, "UserScore"), (querySnapshot) => {
      const scoresData = querySnapshot.docs.map((doc) => {
        const scores = doc.data().scores;
        const totalScore = Object.values(scores).reduce((a, b) => Number(a) + Number(b), 0);
        return {
          id: doc.id,
          totalScore,
          ...doc.data(),
        };
      });
      scoresData.sort((a, b) => b.totalScore - a.totalScore);
      setUserScores(scoresData);
    });

    const unsubscribeGames = onSnapshot(collection(db, "Games"), (querySnapshot) => {
      const gameNamesData = querySnapshot.docs.map((doc) => doc.data().name);
      setGameNames(gameNamesData);
    });

    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeUserScores();
      unsubscribeGames();
    };
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            {gameNames.map((gameName) => (
              <TableCell key={gameName}>{gameName}</TableCell>
            ))}
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userScores.length > 0 ? (
            userScores.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                {gameNames.map((gameName) => (
                  <TableCell key={gameName}>{user.scores[gameName] || "-"}</TableCell>
                ))}
                <TableCell>{user.totalScore}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={gameNames.length + 3}>No user scores available.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}