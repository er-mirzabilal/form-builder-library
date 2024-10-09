import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  Grid2,
  Tooltip,
  Typography,
} from "@mui/material";
import WidgetsTemplate from "../WidgetsTemplate";
import { Add } from "@mui/icons-material";
import AddWidgetModal from "./addWidgetModal";
import { useState } from "react";

const WidgetWrapper = ({ pageData, handleOpenDrawer }) => {
  const [addWidgetModal, setAddWidgetModal] = useState(false);
  const handleAddWidgetClick = () => {
    setAddWidgetModal(true);
  };
  Object.keys(pageData.widgets).map(([key, widget]) => {});
  console.log(pageData.widgets, "pageData.widgets");
  return (
    <Box sx={{ padding: 2, borderRadius: 3, px: 10 }}>
      {Object.entries(pageData.widgets).length ? (
        <Grid container sx={{ background: "red", p: 1, gap: 1 }}>
          {Object.entries(pageData.widgets).map(([key, widget]) => (
            <Grid
              item
              xs={12}
              sx={{ background: "yellow" }}
              onClick={handleOpenDrawer}
            >
              <WidgetsTemplate key={key} data={widget} />
            </Grid>
          ))}
          {/* <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    my: 7,
                    width: "100%"
                }}
            >
                <Divider
                    variant="fullWidth"
                    flexItem
                    sx={{
                        //   borderColor: isHoverOnAdd ? "rgb(127, 127, 230)" : "rgba(0, 0, 0, 0.12)",
                        width: "50%",
                        height: "1px",
                        my: "auto",
                    }}
                />
                <Tooltip title={"Add Widget"} placement="top" arrow>
                    <ButtonBase
                        //   onMouseEnter={() => setIsHoverOnAdd(true)}
                        //   onMouseLeave={() => setIsHoverOnAdd(false)}
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
                        <Add />
                    </ButtonBase>
                </Tooltip>
                <Divider
                    variant="fullWidth"
                    flexItem
                    sx={{
                        //   borderColor: isHoverOnAdd ? "rgb(127, 127, 230)" : "rgba(0, 0, 0, 0.12)",
                        width: "50%",
                        height: "1px",
                        my: "auto",
                    }}
                />
            </Box> */}
        </Grid>
      ) : (
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          No Data Found
        </Typography>
      )}
      <AddWidgetModal
        open={addWidgetModal}
        handleClose={() => setAddWidgetModal(false)}
      />
    </Box>
  );
};

export default WidgetWrapper;
