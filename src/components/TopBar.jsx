// src/components/TopBar.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormName } from "../slices/formSlice";
import { AppBar, Toolbar, TextField, Button } from "@mui/material";

const TopBar = () => {
  const formName = useSelector((state) => state.form.formName);
  const dispatch = useDispatch();

  const handleFormNameChange = (e) => {
    dispatch(updateFormName(e.target.value));
  };
  const formState = useSelector((state) => state.form);

  const saveForm = () => {
    const jsonData = JSON.stringify(formState, null, 2);
    console.log(jsonData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "layout.json";
    link.click();
    // Handle the JSON data as needed
  };
  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: "white" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          placeholder="Form Name"
          variant="outlined"
          value={formName}
          size="small"
          onChange={handleFormNameChange}
          sx={{
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "& input": {
                padding: 0,
              },
              "& fieldset": {
                border: "none",
                borderRadius: 0,
              },
              "&:hover fieldset": {
                borderBottom: "1px solid black",
              },
              "&.Mui-focused fieldset": {
                border: "none", // focused effect
                borderBottom: "1px solid black",
              },
            },
          }}
        />
        <Button
          variant="contained"
          className="contained"
          onClick={saveForm}
          sx={{ margin: 2 }}
        >
          Save Form
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
