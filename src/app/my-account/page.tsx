"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation.js";
import NavBar from "../components/navbar";

export default function AccountPage() {
  const router = useRouter();

  return (
    <>
      <NavBar navButton="Dashboard" url="/" />
      <Container maxWidth="sm">My account</Container>
    </>
  );
}
