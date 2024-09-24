// src/components/ElementWrapper.jsx
import React, { useMemo, useState } from "react";
import { Box, ButtonBase, Grid, Popover, Tooltip } from "@mui/material";
import QuestionElement from "./QuestionElement";
import EmailElement from "./EmailElement";
import TextFieldElement from "./TextFieldElement";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  addLayout,
  getCurrentPageId,
  getSelectedContent,
  setSelectedContent,
  setSelectedContentType,
} from "../slices/formSlice";
import { ContentType } from "../utils/constants";
import { Add } from "@mui/icons-material";
import ElementSelectorOptions from "./ElementSelectorOptions";

const ElementWrapper = ({ layout, index, border }) => {
  const background = layout.backgroundColor;
  const columns = layout.columns;
  const dispatch = useDispatch();
  const selectedContent = useSelector(getSelectedContent);
  const [isHoverContainer, setIsHoverContainer] = useState(false);
  const [isHoverIconTopContainer, setIsHoverIconTopContainer] = useState(false);
  const [isHoverIconBottomContainer, setIsHoverIconBottomContainer] =
    useState(false);
  const currentPageId = useSelector(getCurrentPageId);
  // const remainingColumns = 3-columns;
  const [addLayoutPosition, setAddLayoutPosition] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? 'simple-popover-2' : undefined;
  console.log(layout, "layout", "ss");
  const handleLayoutClick = () => {
    dispatch(setSelectedContent(layout));
    dispatch(setSelectedContentType(ContentType.LAYOUT));
  };

  const handleAddLayout = (event, type) => {
    setAnchorEl(event.currentTarget);
    setAddLayoutPosition(type);
    console.log(type, ' click');
  }

  const handleElementSelectFromPopover = (element) => {
    console.log('element', element);
    dispatch(addLayout({ pageId: currentPageId, element, index, position: addLayoutPosition }));
    handleClose();
  }

  const handleAddElement = (element) => {
    dispatch(addElement({pageId:currentPageId, layoutId:layout?.id, element}))
    handleClose2();
  }

  // const handleAddLayoutBelow = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log('below click');
  // }

  const elements = useMemo(() => {
    let array = [];
    if (layout.elements?.length < columns) {
      console.log("inside", layout.elements?.length < columns);
      for (let i = 0; i < (layout.elements?.length < columns); i++) {
        array.push(
          <Grid
            onClick={(event)=>{event.stopPropagation();setAnchorEl2(event.currentTarget)}}
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
              cursor:"pointer"
            }}
          >
            <Add />
          </Grid>
        );
      }
    }
    return array;
  }, [columns,layout.elements]);
  console.log(elements,'eleddd')
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
            onClick={(event) => handleAddLayout(event, 'top')}
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
            onClick={(event) => handleAddLayout(event, 'bottom')}
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ElementSelectorOptions handleElementSelect={handleElementSelectFromPopover} />
      </Popover>
      <Popover
        id={id2}
        open={open2}
        anchorEl={anchorEl2}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ElementSelectorOptions handleElementSelect={handleAddElement} />
      </Popover>
    </Box>
  );
};

export default ElementWrapper;
