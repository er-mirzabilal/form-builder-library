// RightSidebar.jsx
import React from "react";
import {
  TextField,
  ButtonGroup,
  Button,
  List,
  Divider,
  Box,
  Typography,
  Switch,
  ButtonBase,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateElementProperties,
  updateLayoutColumns,
  updateLayoutBackground,
  getPages,
  getCurrentPageId,
  getSelectedContent,
  getSelectedContentType,
  addPage,
} from "../slices/formSlice";
import PageItem from "./PageItem";
import { ContentType } from "../utils/constants";
import Pageicon from "../assets/Vector.png";
import { Add } from "@mui/icons-material";
import { backgroundColors } from "../utils/data";
import ShortTextImage from "../assets/image-shortText.png";
import LargeTextImage from "../assets/image-largeText.png";
import SelectBoxImage from "../assets/image-selectBox.png";
const RightSidebar = () => {
  const pages = useSelector(getPages);
  const selectedContent = useSelector(getSelectedContent);
  const selectedContentType = useSelector(getSelectedContentType);
  const currentPageId = useSelector(getCurrentPageId);
  const dispatch = useDispatch();
  const handlePropertyChange = (e) => {
    dispatch(
      updateElementProperties({
        currentPageId,
        elementId: selectedContent.id,
        properties: { [e.target.name]: e.target.value },
      })
    );
  };
  const handleLayoutColumnChange = (columns) => {
    dispatch(
      updateLayoutColumns({
        pageId: currentPageId,
        layoutId: selectedContent.id,
        columns,
      })
    );
  };
  const handleLayoutBackgroundChange = (color) => {
    dispatch(
      updateLayoutBackground({
        pageId: currentPageId,
        layoutId: selectedContent.id,
        color,
      })
    );
  };
  const handleAddPage = () => {
    dispatch(addPage());
  };
  const handleElementTypeChange = (val) => {
    console.log("val", val);
    dispatch(
      updateElementProperties({
        pageId: currentPageId,
        elementId: selectedContent.id,
        properties: { type: val },
      })
    );
  };
  const handleToggleChange = (e) => {
    dispatch(
      updateElementProperties({
        pageId: currentPageId,
        elementId: selectedContent.id,
        properties: { [e.target.name]: e.target.checked },
      })
    );
  };
  console.log(selectedContent, "selected", pages);
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "320px",
        borderRadius: 4,
        padding: 1,
      }}
      className="box-shadow"
    >
      <List>
        {pages.map((page, index) => (
          <PageItem page={page} />
        ))}
      </List>
      <ButtonBase
        onClick={handleAddPage}
        sx={{
          cursor: "pointer",
          height: "50px",
          marginBottom: "10px",
          borderRadius: 1,
          ml: 0.2
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            p: 1,
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "50px",
              height: "40px",
              background: "#e8e8e8",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "4px",
            }}
          >
            <Add />
          </Box>
          <Typography sx={{ color: "#808080" }}>Add Page</Typography>
        </Box>
      </ButtonBase>

      <Divider />
      {/* Layout selection */}
      {selectedContentType === ContentType.LAYOUT && (
        <Box sx={{ my: 2, px: 1 }}>
          <Box>
            <Typography>Columns</Typography>
            <ButtonGroup sx={{ py: 2 }}>
              <Button
                onClick={() => handleLayoutColumnChange(1)}
                sx={{
                  backgroundColor:
                    selectedContent.columns === 1
                      ? "rgba(127, 127, 230, 0.1)"
                      : "",
                  borderColor:
                    selectedContent.columns === 1
                      ? "rgb(127, 127, 230)"
                      : "#ccc",
                }}
              >
                <Box
                  sx={{ background: "#ccc", width: "28px", height: "38px" }}
                ></Box>{" "}
              </Button>
              <Button
                sx={{
                  backgroundColor:
                    selectedContent.columns === 2
                      ? "rgba(127, 127, 230, 0.1)"
                      : "",
                  borderColor:
                    selectedContent.columns === 2
                      ? "rgb(127, 127, 230)"
                      : "#ccc",
                }}
                onClick={() => handleLayoutColumnChange(2)}
              >
                <Box
                  sx={{ background: "#ccc", width: "22px", height: "38px" }}
                ></Box>{" "}
                <Box
                  sx={{
                    background: "#ccc",
                    width: "22px",
                    height: "38px",
                    ml: 0.5,
                  }}
                ></Box>{" "}
              </Button>
              <Button
                sx={{
                  backgroundColor:
                    selectedContent.columns === 3
                      ? "rgba(127, 127, 230, 0.1)"
                      : "",
                  borderColor:
                    selectedContent.columns === 3
                      ? "rgb(127, 127, 230)"
                      : "#ccc",
                }}
                onClick={() => handleLayoutColumnChange(3)}
              >
                <Box
                  sx={{ background: "#ccc", width: "22px", height: "38px" }}
                ></Box>{" "}
                <Box
                  sx={{
                    background: "#ccc",
                    width: "22px",
                    height: "38px",
                    ml: 0.5,
                  }}
                ></Box>{" "}
                <Box
                  sx={{
                    background: "#ccc",
                    width: "22px",
                    height: "38px",
                    ml: 0.5,
                  }}
                ></Box>{" "}
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Typography>Background Color</Typography>
            <Grid container gap={1} mt={1}>
              {backgroundColors.map((item, index) => (
                <ButtonBase
                  key={index}
                  onClick={() => handleLayoutBackgroundChange(item)}
                  sx={{
                    width: "30px",
                    height: "30px",
                    background: item,
                    borderRadius: "100%",
                    border: "2px solid",
                  }}
                ></ButtonBase>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      {selectedContentType === ContentType.ELEMENT && (
        <Box>
          {["email", "text", "question"].includes(selectedContent?.type) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography>Question Required</Typography>
              <Switch
                checked={selectedContent?.properties?.isRequired}
                name="isRequired"
                onChange={handleToggleChange}
              />
            </Box>
          )}
          {["question"].includes(selectedContent?.type) && (
            <Box sx={{ padding: "10px" }}>
              <Typography sx={{ marginBottom: "10px" }}>
                Question Type
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Box width={80}>
                    <Box
                      onClick={() => handleElementTypeChange("short-text")}
                      sx={{
                        border:
                          selectedContent?.properties?.type === "short-text"
                            ? "2px solid blue"
                            : "2px solid transparent",
                      }}
                    >
                      <img
                        src={ShortTextImage}
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </Box>
                    <Typography>Short Text</Typography>
                  </Box>
                  <Box width={80}>
                    <Box
                      onClick={() => handleElementTypeChange("long-text")}
                      sx={{
                        background: "#eef2ff",
                        border:
                          selectedContent?.properties?.type === "long-text"
                            ? "2px solid blue"
                            : "2px solid transparent",
                      }}
                    >
                      <img
                        src={LargeTextImage}
                        style={{
                          width: "60px",
                          height: "60px",
                          paddingLeft: 4,
                        }}
                      />
                    </Box>
                    <Typography>Long Text</Typography>
                  </Box>
                  <Box width={80}>
                    <Box
                      sx={{
                        border:
                          selectedContent?.properties?.type ===
                          "multiple-choice"
                            ? "2px solid blue"
                            : "2px solid transparent",
                      }}
                    >
                      <img
                        src={SelectBoxImage}
                        onClick={() =>
                          handleElementTypeChange("multiple-choice")
                        }
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </Box>
                    <Typography>Multiple Choice</Typography>
                  </Box>
                  <Box></Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}

      <Divider />

      {/* {['email', 'text', 'question'].includes(selectedContent?.type) && (
        <>
          <TextField
            label="Label"
            name="label"
            value={selectedElement.properties.label || ''}
            onChange={handlePropertyChange}
            fullWidth
          />
          <TextField
            label="Placeholder"
            name="placeholder"
            value={selectedElement.properties.placeholder || ''}
            onChange={handlePropertyChange}
            fullWidth
          />
        </>
      )} */}
    </Box>
  );
};
export default RightSidebar;
