import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig"; 
import { collection, onSnapshot } from "firebase/firestore";

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
    <div>
      {userScores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              {gameNames.map((gameName) => (
                <th key={gameName}>{gameName}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {userScores.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                {gameNames.map((gameName) => (
                  <td key={gameName}>{user.scores[gameName] || "-"}</td>
                ))}
                <td>{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user scores available.</p>
      )}
    </div>
  );
}