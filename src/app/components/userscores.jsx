import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig"; // Update this path if necessary
import { collection, getDocs } from "firebase/firestore";

export default function UserScores() {
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    const fetchUserScores = async () => {
      const querySnapshot = await getDocs(collection(db, "UserScore"));
      const scoresData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserScores(scoresData);
    };

    fetchUserScores();
  }, []);

  return (
    <div>
      {userScores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Score 1</th>
              <th>Score 2</th>
              <th>Score 3</th>
            </tr>
          </thead>
          <tbody>
            {userScores.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.lastName}</td>
                <td>{user.scores.score1}</td>
                <td>{user.scores.score2}</td>
                <td>{user.scores.score3}</td>
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