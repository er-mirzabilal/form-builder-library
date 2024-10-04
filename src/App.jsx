// src/App.jsx
import React from "react";
import { Box } from "@mui/material";
// import { useSelector } from "react-redux";
import TopBar from "./components/TopBar";
// import ToolBar from "./components/ToolBar";
// import FormPage from "./components/FormPage";
import "./App.css";
import RightSidebar from "./components/FormBuilder/Template/RightSidebar";
import FormBuilder from "./components/FormBuilder";

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
        <FormBuilder data={null} />
        <RightSidebar />
      </Box>
    </Box>
  );
};

export default App;
