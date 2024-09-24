// src/components/ElementWrapper.jsx
import React, { useMemo, useState } from "react";
import { Box, ButtonBase, Grid, Tooltip } from "@mui/material";
import QuestionElement from "./QuestionElement";
import EmailElement from "./EmailElement";
import TextFieldElement from "./TextFieldElement";
import { useDispatch, useSelector } from "react-redux";
import {
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
  const [isHoverContainer, setIsHoverContainer] = useState(false);
  const [isHoverIconTopContainer, setIsHoverIconTopContainer] = useState(false);
  const [isHoverIconBottomContainer, setIsHoverIconBottomContainer] =
    useState(false);
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
              "&:hover": { border: `1px solid blue` },
              width: "100%",
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
      onMouseEnter={() => setIsHoverContainer(true)}
      onMouseLeave={() => setIsHoverContainer(false)}
      sx={{
        mt: index > 0 ? 2 : 0,
        padding: 2,
        background: background,
        border:
          selectedContent?.id === layout?.id
            ? `1px solid ${border}`
            : "1px solid transparent",
        display: "flex",

        flexDirection: "column",
        gap: "10px",
        "&:hover": {
          border: `1px solid ${border}`,
          borderTop: isHoverIconTopContainer ? `3px solid ${border}` : "",
          borderBottom: isHoverIconBottomContainer ? `3px solid ${border}` : "",
        },
        position: "relative",
      }}
    >
      {isHoverContainer && (
        <Tooltip title="Add a block" arrow placement="top">
          <ButtonBase
            onMouseEnter={() => setIsHoverIconTopContainer(true)}
            onMouseLeave={() => setIsHoverIconTopContainer(false)}
            sx={{
              position: "absolute",
              width: "40px",
              height: "40px",
              borderRadius: "100%",
              backgroundColor: border,
              transform: "scale(0.5)",
              transition: "0.5s ease",
              color: "white",
              ":hover": {
                transform: "scale(1)",
              },
              left: "49.3%",
              top: -20,
            }}
          >
            <Add />
          </ButtonBase>
        </Tooltip>
      )}

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
      {isHoverContainer && (
        <Tooltip title="Add a block" arrow placement="bottom">
          <ButtonBase
            onMouseEnter={() => setIsHoverIconBottomContainer(true)}
            onMouseLeave={() => setIsHoverIconBottomContainer(false)}
            sx={{
              position: "absolute",
              width: "40px",
              height: "40px",
              borderRadius: "100%",
              backgroundColor: border,
              transform: "scale(0.5)",
              transition: "0.5s ease",
              color: "white",
              ":hover": {
                transform: "scale(1)",
              },
              left: "49.3%",
              bottom: -20,
            }}
          >
            <Add />
          </ButtonBase>
        </Tooltip>
      )}
    </Box>
  );
};

export default ElementWrapper;
