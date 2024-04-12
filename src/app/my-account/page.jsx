"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation.js";
import NavBar from "../components/navbar";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // assuming you have a firebase.js file where you initialize Firestore
import GameScoreInput from "../components/gamescoreinput";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";

export default function AccountPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [games, setGames] = useState([]);
  const [gameName, setGameName] = useState("");


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Games"), (querySnapshot) => {
      const gamesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesData);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleAddGame = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "Games"), {
        name: gameName,
        participants: 0,
        userScores: {},
      });

      setGameName(""); // Clear the input
    } catch (error) {
      console.error("Error adding game: ", error);
    }
  };

  return (
    <>
      <NavBar navButton="Dashboard" url="/" />
      {games.map((game) => (
        <GameScoreInput game={game} key={game.id}/>
      ))}
      {user?.email == "bartosz.kowalski@pinmeto.com" && <>
      <form onSubmit={handleAddGame}>
        <label>
          Game Name:
          <input type="text" value={gameName} onChange={handleGameNameChange} required />
        </label>
        <button type="submit">Add Game</button>
      </form>
      </>}
    </>
  );
}
