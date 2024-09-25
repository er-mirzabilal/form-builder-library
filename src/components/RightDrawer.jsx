// RightSidebar.jsx
import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Divider,
  Box,
  Typography,
  Switch,
  ButtonBase,
  Grid,
  IconButton,
  Popover,
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
  updateSelectedContentBackground,
} from "../slices/formSlice";
import { ContentType } from "../utils/constants";
import { backgroundColors } from "../utils/data";
import ShortTextImage from "../assets/image-shortText.png";
import LargeTextImage from "../assets/image-largeText.png";
import SelectBoxImage from "../assets/image-selectBox.png";
import { ArrowBack } from "@mui/icons-material";
import { setSideDrawerOpen } from "../slices/otherStates";
import { HexColorPicker } from "react-colorful";

const RightDrawer = () => {
  const pages = useSelector(getPages);
  const selectedContent = useSelector(getSelectedContent);
  const selectedContentType = useSelector(getSelectedContentType);
  const currentPageId = useSelector(getCurrentPageId);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    dispatch(updateSelectedContentBackground(color));
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
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 1}}>
        <IconButton
          onClick={() => dispatch(setSideDrawerOpen(false))}
          sx={{ borderRadius: "100%", border: "1px solid", p: 0.5 }}
        >
          <ArrowBack sx={{width: "20px", height: "20px"}} />
        </IconButton>
        <Typography>Content Detail</Typography>
      </Box>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Background Color</Typography>
            <Box sx={{ border: "2px solid", borderRadius: "100%", p: "1px" }}>
              <ButtonBase
                onClick={(event) => setAnchorEl(event.currentTarget)}
                sx={{
                  width: "22px",
                  height: "22px",
                  background: selectedContent?.backgroundColor,
                  borderRadius: "100%",
                }}
              ></ButtonBase>
            </Box>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Box sx={{ backgroundColor: "white", padding: 2 }}>
                <HexColorPicker
                  color={selectedContent?.backgroundColor}
                  onChange={(value) => {
                    handleLayoutBackgroundChange(value);
                  }}
                />
              </Box>
            </Popover>
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
    </Box>
  );
};
export default RightDrawer;
