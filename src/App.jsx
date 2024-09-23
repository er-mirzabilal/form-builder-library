// src/App.jsx
import React from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import TopBar from "./components/TopBar";
import ToolBar from "./components/ToolBar";
import FormPage from "./components/FormPage";
import "./App.css";
import RightSidebar from "./components/RightSidebar";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#ebebeb" }}>
      <TopBar />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 90px)",
          gap: "10px",
          margin: "10px",
        }}
      >
        {/* <ToolBar /> */}
        <FormPage />
        <RightSidebar />
      </Box>
    </Box>
  );
};

export default App;
