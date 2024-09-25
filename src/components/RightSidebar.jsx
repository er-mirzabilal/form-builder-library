// RightSidebar.jsx
import React, { useEffect, useState } from "react";
import { List, Box, Typography, ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getPages,
  getCurrentPageId,
  getSelectedContent,
  getSelectedContentType,
  addPage,
} from "../slices/formSlice";
import PageItem from "./PageItem";
import { ContentType } from "../utils/constants";
import { Add } from "@mui/icons-material";
import RightDrawer from "./RightDrawer";
import { getIsSideDrawerOpen } from "../slices/otherStates";
const RightSidebar = () => {
  const pages = useSelector(getPages);
  const selectedContent = useSelector(getSelectedContent);
  const isSideDrawerOpen = useSelector(getIsSideDrawerOpen);
  const selectedContentType = useSelector(getSelectedContentType);
  const dispatch = useDispatch();

  const handleAddPage = () => {
    dispatch(addPage());
  };

  return (
    <>
      {isSideDrawerOpen ? (
        <RightDrawer />
      ) : (
        <Box
          sx={{
            width: "336px",
          }}
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
              ml: 0.2,
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
                  background: "#b5b5b5",
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
          {/* Layout selection */}

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
      )}
    </>
  );
};
export default RightSidebar;
