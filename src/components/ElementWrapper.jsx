// src/components/ElementWrapper.jsx
import React, { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import QuestionElement from "./QuestionElement";
import LayoutSelector from "./LayoutSelector";
import EmailElement from "./EmailElement";
import TextFieldElement from "./TextFieldElement";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPageId,
  getSelectedContent,
  setSelectedContent,
  setSelectedContentType,
} from "../slices/formSlice";
import { ContentType } from "../utils/constants";
import { Add } from "@mui/icons-material";

const ElementWrapper = ({ layout, index, border }) => {
  const background = layout.backgroundColor;
  const columns = layout.columns;
  const dispatch = useDispatch();
  const selectedContent = useSelector(getSelectedContent);
  // const remainingColumns = 3-columns;
  console.log(layout, "layout", "ss");
  const handleLayoutClick = () => {
    dispatch(setSelectedContent(layout));
    dispatch(setSelectedContentType(ContentType.LAYOUT));
  };

  const elements = useMemo(() => {
    let array = [];
    if (layout.elements?.length < columns) {
      console.log("inside", layout.element < columns);
      for (let i = 0; i < (layout.elements?.length < columns); i++) {
        array.push(
          <Grid
            item
            xs={3}
            sx={{
              marginBottom: 2,
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "4px",
              "&:hover": { border: `1px solid blue` },
            }}
          >
            <Add />
          </Grid>
        );
      }
    }
    return array;
  }, [columns]);

  return (
    <Box
      key={index}
      onClick={handleLayoutClick}
      sx={{
        mt: index > 0 ? 2 : 0,
        padding: 2,
        background: background,
        border:
          selectedContent?.id === layout?.id
            ? `2px solid ${border}`
            : "2px solid transparent",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "&:hover": { border: `2px solid ${border}` },
        borderRadius: 4,
      }}
    >
      <Grid container gap={1}>
        {layout.elements?.map((element) => (
          <Grid item xs={11.9 / columns}>
            {element.type === "question" && (
              <QuestionElement
                element={element}
                key={element.id}
                layoutId={layout.id}
              />
            )}
            {element.type === "email" && (
              <EmailElement
                element={element}
                key={element.id}
                layoutId={layout.id}
              />
            )}
            {element.type === "text" && (
              <TextFieldElement
                element={element}
                key={element.id}
                layoutId={layout.id}
              />
            )}
            {/* Other element types can be added here */}
          </Grid>
        ))}
        {elements}
      </Grid>
    </Box>
  );
};

export default ElementWrapper;
