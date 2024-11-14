import { useSelector } from "react-redux";
import {
  addWidget,
  getPages,
  getSelectedPageId,
  updateWidgetPositions,
} from "../../slices/formBuilder";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import WidgetWrapper from "./Common/WidgetWrapper";
import "./style.css";
import LeftSideBar from "./Template/LeftSidebar";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const FormBuilder = ({ data }) => {
  const pages = useSelector(getPages);
  const dispatch = useDispatch();
  const selectedPageId = useSelector(getSelectedPageId);
  const columns = 2;
  const [widgets, setWidgets] = useState([]);
  const [draggingWidget, setDraggingWidget] = useState(null);
  const [draggingWidgetId, setDraggingWidgetId] = useState(null); // For existing widgets
  const [hoveredWidgetId, setHoveredWidgetId] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  console.log(pages, "pages");

  const pageData = useMemo(() => {
    if (Object.keys(pages).length) {
      return pages[selectedPageId] ? pages[selectedPageId] : null;
    } else {
      return null;
    }
  }, [selectedPageId, pages]);

  const handleDragStart = (widget) => {
    setDraggingWidget(widget);
    setDraggingWidgetId(null); // Reset if dragging from sidebar
  };

  const handleWidgetDragStart = (widgetId) => {
    setDraggingWidgetId(widgetId); // This is an existing widget
    setDraggingWidget(null); // Reset sidebar dragging
  };

  const handleDragEnter = (e, widgetId) => {
    setHoveredWidgetId(widgetId);

    const widgetRect = e.target.getBoundingClientRect();
    const offsetY = e.clientY - widgetRect.top;

    // Adjust the threshold for more responsive behavior
    const threshold = widgetRect.height * 0.3; // 30% of widget's height

    if (offsetY < threshold) {
      setHoverPosition("top");
    } else if (offsetY > widgetRect.height - threshold) {
      setHoverPosition("bottom");
    } else {
      setHoverPosition(null);
    }
  };

  const handleDragLeave = () => {
    setHoveredWidgetId(null);
    setHoverPosition(null);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    // Drop a new widget from sidebar
    if (draggingWidget) {
      const widgetId = uuidv4(); // Generate new ID for the widget
      dispatch(
        addWidget({
          pageId: pageData.id,
          widgetType: draggingWidget,
          widgetId,
          targetWidgetId: hoveredWidgetId,
          position: hoverPosition,
        })
      );
    }

    // Move an existing widget within the form
    if (draggingWidgetId) {
      const updatedWidgets = [...widgets];

      // Find the index of the dragging widget and remove it
      const draggingIndex = updatedWidgets.findIndex(
        (widget) => widget.id === draggingWidgetId
      );
      const [movedWidget] = updatedWidgets.splice(draggingIndex, 1);

      // Find the drop position
      const dropIndex = updatedWidgets.findIndex(
        (widget) => widget.id === hoveredWidgetId
      );
      if (hoverPosition === "top") {
        updatedWidgets.splice(dropIndex, 0, movedWidget); // Insert above
      } else {
        updatedWidgets.splice(dropIndex + 1, 0, movedWidget); // Insert below
      }

      // Update state with the reordered widgets
      setWidgets(updatedWidgets);

      // Dispatch update widget positions action for each widget
      updatedWidgets.forEach((widget, index) => {
        const newPosition = {
          row: Math.floor(index / columns), // Assuming 'columns' is the number of columns in your layout
          column: index % columns,
        };

        // Dispatch action with a new position object
        dispatch(
          updateWidgetPositions({
            pageId: pageData.id,
            widgetId: widget.id,
            newPosition: { ...newPosition }, // Create a new object to avoid mutating
          })
        );
      });
    }

    // Clear dragging state
    setDraggingWidget(null);
    setDraggingWidgetId(null);
    setHoveredWidgetId(null);
    setHoverPosition(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Required to allow dropping
  };

  useEffect(() => {
    if (pageData && pageData.widgets) {
      setWidgets(Object.values(pageData.widgets)); // Update widgets only when pageData is defined
    }
  }, [pageData]);
  return (
    <>
      <LeftSideBar handleDragStart={handleDragStart} />
      <Box sx={{ flexGrow: 1, maxWidth: "1200px", width: "100%" }}>
        <Box
          sx={{
            overflowY: "auto",
            scrollbarWidth: "thin",
            py: 4,
            width: "100%",
            border: "2px sloid red",
            borderRadius: "20px",
            background: "white",
            height: "83vh",
          }}
          className="box-shadow"
        >
          {pageData ? (
            <WidgetWrapper
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              hoveredWidgetId={hoveredWidgetId}
              hoverPosition={hoverPosition}
              pageData={pageData}
              handleWidgetDragStart={handleWidgetDragStart}
              handleDragEnter={handleDragEnter}
              widgets={widgets}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              Add a page for Get Started
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default FormBuilder;
