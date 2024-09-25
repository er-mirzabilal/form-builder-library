// src/components/QuestionElement.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPageId,
  getSelectedContent,
  setSelectedContent,
  setSelectedContentType,
  setSelectedLayoutId,
  updateElementProperties,
} from "../slices/formSlice";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  ButtonBase,
} from "@mui/material";
import { ContentType } from "../utils/constants";
import { Add, DeleteOutlined, MoreVert } from "@mui/icons-material";
import { setSideDrawerOpen } from "../slices/otherStates";

const QuestionElement = ({ element, layoutId }) => {
  const dispatch = useDispatch();
  const currentPageId = useSelector(getCurrentPageId);
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
    dispatch(setSideDrawerOpen(true));
  };

  const handleQuestionLabelChange = (e) => {
    dispatch(
      updateElementProperties({
        pageId: currentPageId,
        elementId: element.id,
        properties: { label: e.target.value },
      })
    );
  };

  const handleQuestionPlaceholderChange = (e) => {
    dispatch(
      updateElementProperties({
        pageId: currentPageId,
        elementId: element.id,
        properties: { placeholder: e.target.value },
      })
    );
  };

  return (
    <Box
      onClick={(event) => handleElementClick(event)}
      onMouseEnter={() => setIsHoverContainer(true)}
      onMouseLeave={() => setIsHoverContainer(false)}
      sx={{
        padding: "15px",
        border:
          selectedContent?.id === element?.id
            ? "1px solid blue"
            : "1px solid rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
        "&:hover": {
          border: "1px solid blue",
          borderTop: isHoverIconTopContainer ? `2px solid blue` : "",
          borderBottom: isHoverIconBottomContainer ? `2px solid blue` : "",
        },
      }}
    >
      {/* {isHoverContainer && selectedContent?.id === element?.id && (
        <Box
          sx={{
            position: "absolute",
            right: 5,
            top: -28,
            display: "flex",
            gap: 1,
            pb: 2,
          }}
        >
          <ButtonBase
            sx={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 18, 71, 0.1) 0px 6px 16px 0px, rgba(0, 0, 33, 0.05) 0px 0px 2px 1px",
            }}
          >
            <DeleteOutlined sx={{ width: "15px", height: "15px" }} />{" "}
          </ButtonBase>
        </Box>
      )} */}

      {/* {isHoverContainer && (
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
      )} */}
      {/* <Typography sx={{}}>{element.properties.label}</Typography> */}
      {element.properties.type === "short-text" ? (
        <Box>
          <TextField
            // label="Label Text"
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
            fullWidth
            placeholder={"Type your question here"}
            value={element.properties.label}
            onChange={handleQuestionLabelChange}
          />
          <TextField
            // label="Question Text"
            sx={{
              backgroundColor: "white",
              mt: 2,
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
            fullWidth
            placeholder={"Type your placeholder here"}
            value={element.properties.placeholder}
            onChange={handleQuestionPlaceholderChange}
          />
        </Box>
      ) : element.properties.type === "long-text" ? (
        <Box>
          <TextField
            sx={{ background: "none !important" }}
            placeholder="Type your label here"
            variant="filled"
            fullWidth
            value={element.properties.label}
            onChange={handleQuestionLabelChange}
          />
          <textarea
            id="w3review"
            name="w3review"
            placeholder="Type your placeholder here"
            rows="4"
            style={{ padding: 10, marginTop: 20, width: "97%" }}
            onChange={handleQuestionPlaceholderChange}
          >
            {element.properties.placeholder}
          </textarea>
        </Box>
      ) : (
        <Box>
          <TextField
            sx={{ background: "none !important" }}
             placeholder="Type your label here"
            variant="filled"
            fullWidth
            value={element.properties.label}
            onChange={handleQuestionLabelChange}
          />
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      )}
      {element.properties.isRequired && (
        <Typography>* This question is required.</Typography>
      )}
      {/* {isHoverContainer && (
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
      )} */}
    </Box>
  );
};

export default QuestionElement;
