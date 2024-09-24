// EmailElement.jsx
import React, { useState } from "react";
import { Box, ButtonBase, TextField, Typography } from "@mui/material";
import {
  getSelectedContent,
  setSelectedContent,
  setSelectedContentType,
  setSelectedLayoutId,
} from "../slices/formSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContentType } from "../utils/constants";
import { Add } from "@mui/icons-material";
const EmailElement = ({ element, layoutId }) => {
  const dispatch = useDispatch();
  const selectedContent = useSelector(getSelectedContent);
  const [isHoverContainer, setIsHoverContainer] = useState(false);
  const [isHoverIconTopContainer, setIsHoverIconTopContainer] = useState(false);
  const [isHoverIconBottomContainer, setIsHoverIconBottomContainer] =
    useState(false);
  const handleElementClick = (event) => {
    event.stopPropagation();
    dispatch(setSelectedContent(element));
    dispatch(setSelectedContentType(ContentType.ELEMENT));
    dispatch(setSelectedLayoutId(layoutId));
  };
  return (
    <Box
      onClick={(event) => handleElementClick(event)}
      onMouseEnter={() => setIsHoverContainer(true)}
      onMouseLeave={() => setIsHoverContainer(false)}
      sx={{
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
        "&:hover": {
          border: "1px solid blue",
          borderTop: isHoverIconTopContainer ? `2px solid blue` : "",
          borderBottom: isHoverIconBottomContainer ? `2px solid blue` : "",
        },
        position: "relative",
      }}
    >
      {isHoverContainer && (
        <ButtonBase
          onMouseEnter={() => setIsHoverIconTopContainer(true)}
          onMouseLeave={() => setIsHoverIconTopContainer(false)}
          sx={{
            position: "absolute",
            width: "24px",
            height: "24px",
            borderRadius: "2px",
            transform: "scale(0.6)",
            transition: "0.5s ease",
            color: "blue",
            border: "1px solid blue",
            backgroundColor: "white",
            ":hover": {
              backgroundColor: "blue",
              color: "white",
              transform: "scale(1)",
            },
            left: "8%",
            top: -13,
          }}
        >
          <Add />
        </ButtonBase>
      )}

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
      {isHoverContainer && (
        <ButtonBase
          onMouseEnter={() => setIsHoverIconBottomContainer(true)}
          onMouseLeave={() => setIsHoverIconBottomContainer(false)}
          sx={{
            position: "absolute",
            width: "24px",
            height: "24px",
            borderRadius: "2px",
            transform: "scale(0.6)",
            transition: "0.5s ease",
            backgroundColor: "white",
            color: "blue",
            ":hover": {
              backgroundColor: "blue",
              color: "white",
              transform: "scale(1)",
            },
            left: "8%",
            bottom: -13,

            border: "1px solid blue",
          }}
        >
          <Add />
        </ButtonBase>
      )}
    </Box>
  );
};
export default EmailElement;
