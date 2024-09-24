// src/components/FormPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ElementWrapper from "./ElementWrapper";
import ElementSelector from "./ElementSelector";
import AddIcon from "@mui/icons-material/Add";
import {
  addElement,
  getSelectedContent,
  getSelectedContentType,
  setPageContent,
  setSelectedContent,
  setSelectedContentType,
} from "../slices/formSlice";
import { ContentType } from "../utils/constants";
// import { Draggable } from 'react-drag-reorder';
import NoContentImage from "../assets/no-content.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ArrowBack } from "@mui/icons-material";
import QuestionIcon from "../assets/questionIcon.png";
import TextIcon from "../assets/textIcon.png";

const FormPage = () => {
  const selectedContent = useSelector(getSelectedContent);
  const selectedContentType = useSelector(getSelectedContentType);
  const [isHoverOnAdd, setIsHoverOnAdd] = useState(false);
  const currentPageId = useSelector((state) => state.form.currentPageId);
  const pages = useSelector((state) => state.form.pages);
  const dispatch = useDispatch();
  const [openElementSelector, setOpenElementSelector] = useState(false);

  const currentPage = pages.find((page) => page.id === currentPageId);

  if (!currentPage) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
        }}
        className="box-shadow"
      >
        <img width={100} height={100} src={NoContentImage} alt="no content" />
        <Typography sx={{ color: "#4c4c4c", fontSize: "32px" }}>
          No Page Selected
        </Typography>
      </Box>
    );
  }

  const handleAddWidgetClick = () => {
    setOpenElementSelector(true);
  };

  const handleCloseElementSelector = () => {
    setOpenElementSelector(false);
  };
  const handleElementSelect = (type) => {
    const newElement = {
      id: Date.now().toString() + "question",
      type: type,
      columns: 1,
      properties: {
        label: "Type your question here",
        placeholder: "Type your placeholder here",
        isRequired: false,
        type: "short-text",
      },
    };

    dispatch(addElement({ pageId: currentPageId, element: newElement }));
  };

  // const handleOnDragEnd = (result) => {
  //   const { destination, source } = result;
  //   console.log(destination, "sdsds");
  //   // If there's no destination, return (dropped outside the list)
  //   if (!destination) return;

  //   // // If the item is dropped at the same place, do nothing
  //   // if (source.index === destination.index) return;

  //   // // Create a new layouts array with reordered items
  //   // const updatedLayouts = Array.from(currentPage.layouts);
  //   // const [reorderedItem] = updatedLayouts.splice(source.index, 1); // Remove dragged item
  //   // updatedLayouts.splice(destination.index, 0, reorderedItem); // Insert it in the new position

  //   // // Update state with new layouts order
  //   // dispatch(setPageContent({
  //   //   ...currentPage,
  //   //   layouts: updatedLayouts,
  //   // }));
  // };

  // const handlePageClick = (page) => {
  //   dispatch(setSelectedContent(page));
  //   dispatch(setSelectedContentType(ContentType.PAGE));
  // }

  //  console.log(currentPage,'page');
  console.log(currentPage.layouts, "content selected");
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 0,
        overflowY: "auto",
        scrollbarWidth: "thin",
        backgroundColor: "white",
        py: 4
      }}
      className="box-shadow"
    >
      {/* <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              flexGrow: 1,
              padding: 0,
              border: '2px solid #ccc',
              overflowY: 'scroll',
            }}
          >
            {currentPage.layouts.map((layout, index) => (
              <Draggable key={layout.id} draggableId={layout.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ElementWrapper index={index} layout={layout} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext> */}
      {currentPage.layouts.map((layout, index) => (
        <ElementWrapper
          // key={layout.id}
          key={index}
          index={index}
          layout={layout}
          border={"#388bff"}
        />
      ))}
      {openElementSelector ? (
        <Box
          sx={{
            height: "400px",
            my: 4,
            position: "relative",
            border: "1px solid #ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":hover": {
              border: "1px solid blue",
            },
            mx: 2,
          }}
        >
          <ButtonBase
            onClick={handleCloseElementSelector}
            sx={{
              border: "1px solid gray",
              borderRadius: "100%",
              position: "absolute",
              top: 10,
              left: 10,
              width: 32,
              height: 32,
            }}
          >
            <ArrowBack sx={{ width: 20, height: 20 }} />
          </ButtonBase>

          <Grid container gap={2} width={"fit-content"}>
            {[
              { text: "text", Icon: TextIcon },
              { text: "question", Icon: QuestionIcon },
            ].map((item, index) => (
              <Box key={index} textAlign={"center"}>
                <ButtonBase
                  onClick={() => {
                    handleElementSelect(item.text);
                    handleCloseElementSelector();
                  }}
                  sx={{
                    border: "2px solid transparent",
                    width: "80px",
                    height: "54px",
                    boxShadow:
                      "rgba(0, 18, 71, 0.15) 0px 0px 1px 0px, rgba(0, 0, 33, 0.08) 0px 0px 2px 1px",
                    ":hover": {
                      border: "2px solid rgb(89, 126, 255)",
                    },
                    mb: 0.6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img width={30} height={30} src={item.Icon} alt="images" />
                </ButtonBase>
                <Typography
                  sx={{ fontSize: "14px", textTransform: "capitalize" }}
                >
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            my: 7,
          }}
        >
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              borderColor: isHoverOnAdd ? "rgb(127, 127, 230)": "rgba(0, 0, 0, 0.12)",
              width: "50%",
              height: "1px",
              my: "auto",
            }}
          />
          <Tooltip title={"Add Widget"} placement="top" arrow>
            <ButtonBase
              onMouseEnter={() => setIsHoverOnAdd(true)}
              onMouseLeave={() => setIsHoverOnAdd(false)}
              // onClick={() => handleElementSelect("question")}
              onClick={handleAddWidgetClick}
              sx={{
                margin: "20px auto",
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderRadius: "100%",
                color: "rgb(127, 127, 230)",
                border: "1px solid rgb(127, 127, 230)",
                ":hover": {
                  background: "rgb(127, 127, 230)",
                  color: "white",
                },
                position: "absolute",
                left: "49%",
              }}
            >
              <AddIcon />
            </ButtonBase>
          </Tooltip>
          <Divider
            variant="fullWidth"
            flexItem
            sx={{
              borderColor: isHoverOnAdd ? "rgb(127, 127, 230)": "rgba(0, 0, 0, 0.12)",
              width: "50%",
              height: "1px",
              my: "auto",
            }}
          />
        </Box>
      )}

      {/* <Dialog open={openElementSelector} onClose={handleCloseElementSelector}>
        <ElementSelector
          pageId={currentPageId}
          onClose={handleCloseElementSelector}
        />
      </Dialog> */}
    </Box>
  );
};

export default FormPage;
