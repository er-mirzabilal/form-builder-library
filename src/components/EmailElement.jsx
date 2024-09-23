// EmailElement.jsx
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import {
  getSelectedContent,
  setSelectedContent,
  setSelectedContentType,
  setSelectedLayoutId,
} from "../slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContentType } from "../utils/constants";
const EmailElement = ({ element, layoutId }) => {
  const dispatch = useDispatch();
  const selectedContent = useSelector(getSelectedContent);
  const handleElementClick = (event) => {
    event.stopPropagation();
    dispatch(setSelectedContent(element));
    dispatch(setSelectedContentType(ContentType.ELEMENT));
    dispatch(setSelectedLayoutId(layoutId));
  };
  return (
    <Box
      onClick={(event) => handleElementClick(event)}
      sx={{
        borderRadius: "4px",
        marginBottom: 2,
        padding: "15px",
        opacity: selectedContent?.id === element?.id ? 1 : 0.5,
        border:
          selectedContent?.id === element?.id
            ? "1px solid blue"
            : "1px solid transparent",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "&:hover": { border: "1px solid blue" },
      }}
    >
      <Typography sx={{}}>{element.properties.label}</Typography>
      <TextField
        placeholder={element.properties.placeholder || "Enter your email"}
        type="email"
        fullWidth
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& input": {
              paddingLeft: 1,
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
      {element.properties.isRequired && (
        <Typography>* This question is required.</Typography>
      )}
    </Box>
  );
};
export default EmailElement;
