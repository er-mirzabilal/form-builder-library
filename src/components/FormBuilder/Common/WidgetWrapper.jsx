import { Box, Grid, Typography } from "@mui/material";
import WidgetsTemplate from "../WidgetsTemplate";
import AddWidgetModal from "./addWidgetModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  cloneWidgetWithId,
  deleteWidgetWithId,
  setSelectedWidgetId,
} from "../../../slices/formBuilder";
import { v4 as uuidv4 } from "uuid";
import RightDrawer from "../Template/RightDrawer";

const WidgetWrapper = ({
  widgets,
  handleDragOver,
  handleDrop,
  handleDragLeave,
  handleDragEnter,
  handleWidgetDragStart,
  hoveredWidgetId,
  hoverPosition,
  pageData,
}) => {
  const [OpenDrawer, setOpenDrawer] = useState(false);

  const [addWidgetModal, setAddWidgetModal] = useState(false);
  const dispatch = useDispatch();
  const handleDeleteWidget = (id) => {
    dispatch(deleteWidgetWithId({ pageId: pageData.id, widgetId: id }));
  };
  const handleCloneWidget = (widgetId) => {
    console.log("called");
    const newWedgitId = uuidv4();
    dispatch(
      cloneWidgetWithId({
        pageId: pageData.id,
        widgetId: widgetId,
        cloneWidgetId: newWedgitId,
      })
    );
  };
  const handleSelectWidget = (widget) => {
    console.log(widget, "widget");
    dispatch(setSelectedWidgetId({ widgetId: widget.id }));
    setOpenDrawer(true);
  };
  // Object.keys(pageData.widgets).map(([key, widget]) => {});
  // console.log(pageData.widgets, "pageData.widgets");
  return (
    <Box
      className="formBuilder"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{ padding: 2, borderRadius: 3, px: 10 }}
    >
      {widgets.length ? (
        <Grid container sx={{ p: 1, gap: 1 }}>
          {widgets
            .sort(
              (a, b) =>
                a.position.row - b.position.row ||
                a.position.column - b.position.column
            )
            .map((widget, index) => (
              <Grid
                item
                xs={12}
                key={widget.id}
                className={`form-widget ${
                  hoveredWidgetId === widget.id ? "hover" : ""
                }`}
                draggable
                onDragStart={() => handleWidgetDragStart(widget.id)} // Dragging existing widget
                onDragEnter={(e) => handleDragEnter(e, widget.id)}
                onDragLeave={handleDragLeave}
              >
                {hoveredWidgetId === widget.id && hoverPosition === "top" && (
                  <Box className="drop-indicator top" />
                )}
                {widget.id}
                <WidgetsTemplate
                  key={index}
                  data={widget}
                  handleOpenDrawer={() => handleSelectWidget(widget)}
                  handleDeleteWidget={handleDeleteWidget}
                  handleCloneWidget={handleCloneWidget}
                />
                {hoveredWidgetId === widget.id &&
                  hoverPosition === "bottom" && (
                    <Box className="drop-indicator bottom" />
                  )}
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
      <RightDrawer open={OpenDrawer} handleClose={() => setOpenDrawer(false)} />
      <AddWidgetModal
        open={addWidgetModal}
        handleClose={() => setAddWidgetModal(false)}
      />
    </Box>
  );
};

export default WidgetWrapper;
