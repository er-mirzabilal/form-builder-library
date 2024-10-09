import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

const RightDrawer = ({ open, handleClose }) => {
  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "360px",
            boxSizing: "border-box",
            mt: 10,
            mb: 4,
            p: 2,
            borderRadius: 2,
          },
          backgroundColor: "white",
          // height: "10px"
        }}
        className="box-shadow"
        variant="persistent"
        anchor="right"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", gap: 2, textAlign: "center" }}>
          <IconButton onClick={handleClose} sx={{padding: 0.4}}>
            <Close />
          </IconButton>
          <Typography variant="h6">Title</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default RightDrawer;
