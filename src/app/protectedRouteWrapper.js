// app/protectedRoute.js
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return currentUser ? (
    children
  ) : (
    <p>You need to be logged in to view this page.</p>
  );
};

export default ProtectedRoute;
