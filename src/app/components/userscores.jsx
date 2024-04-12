import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig"; 
import { collection, onSnapshot } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';


export default function UserScores() {
  const [userScores, setUserScores] = useState([]);
  const [gameNames, setGameNames] = useState([]);

  useEffect(() => {
    const unsubscribeUserScores = onSnapshot(collection(db, "UserScore"), (querySnapshot) => {
      const scoresData = querySnapshot.docs.map((doc) => {

        const scores = doc.data().scores;
        console.log('this', scores.Codebreaker)
        let totalScore = Object.values(scores).reduce((a, b) => Number(a) + Number(b), 0);
        if (scores.Codebreaker) {
          const codebreakerScore = Number(scores.Codebreaker);
          totalScore = totalScore - codebreakerScore + parseFloat((codebreakerScore * 0.2).toFixed(2));
        }
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

  const StickyTableCell = styled(TableCell)(({ theme }) => ({
    position: 'sticky',
    right: 0,
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.2)',
  }));

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead sx={{backgroundColor: '#f5f5f5'}}>
          <TableRow>
            <StickyTableCell>Name</StickyTableCell>
            {gameNames.map((gameName) => (
              <TableCell key={gameName}>{gameName}</TableCell>
            ))}
            <StickyTableCell>Total</StickyTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userScores.length > 0 ? (
            userScores.map((user) => (
              <TableRow key={user.id}>
                <StickyTableCell>{user.name + " " + user.lastName}</StickyTableCell>
                {gameNames.map((gameName) => (
                  <TableCell key={gameName}>{user.scores[gameName] || "-"}</TableCell>
                ))}
                <StickyTableCell>{user.totalScore}</StickyTableCell>
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