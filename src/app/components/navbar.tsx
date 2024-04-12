"use client";

import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Dialog } from "@mui/material";
import { CardMedia } from "@mui/material";
import { useState } from "react";

export default function NavBar({ navButton, url }) {
  const { user, loading } = useAuthContext();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#3399ff", color: "#ffffff" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PMT Olympics
        </Typography>
        <>
          {" "}
          <Button color="inherit" onClick={handleClickOpen}>
            Map
          </Button>
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <CardMedia component="img" image={`/map.png`} loading="lazy" />
          </Dialog>
          <Button color="inherit" component={Link} href={url}>
            {navButton}
          </Button>
          {user ? (
            <Button color="inherit" onClick={handleSignOut}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              Login
            </Button>
          )}
        </>
      </Toolbar>
    </AppBar>
  );
}
