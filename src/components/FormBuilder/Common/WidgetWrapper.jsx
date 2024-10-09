import { Box, ButtonBase, Divider, Grid2, Tooltip, Typography } from "@mui/material";
import WidgetsTemplate from "../WidgetsTemplate";
import { Add } from "@mui/icons-material";
import AddWidgetModal from "./addWidgetModal";
import { useEffect, useState } from "react";
import "../style.css";
import { useDispatch } from "react-redux";
import { addWidget, updateWidgetPositions } from "../../../slices/formBuilder";
import { v4 as uuidv4 } from 'uuid';
import { widgetTypes } from "../../../utils/constants";

// const WidgetWrapper = ({ pageData }) => {
//     const dispatch = useDispatch();

//     const [widgets, setWidgets] = useState([]);
//     const [draggingWidget, setDraggingWidget] = useState(null);
//     const [hoveredWidgetId, setHoveredWidgetId] = useState(null);
//     const [hoverPosition, setHoverPosition] = useState(null);
//     useEffect(() => {
//         if (pageData && pageData.widgets) {
//           setWidgets(Object.values(pageData.widgets)); // Update widgets only when pageData is defined
//         }
//       }, [pageData]);
//     const handleDragStart = (widget) => {
//       setDraggingWidget(widget);
//     };

//     const handleDragEnter = (e, widgetId) => {
//       setHoveredWidgetId(widgetId);

//       const widgetRect = e.target.getBoundingClientRect();
//       const offsetY = e.clientY - widgetRect.top;

//       if (offsetY < widgetRect.height / 2) {
//         setHoverPosition('top');
//       } else {
//         setHoverPosition('bottom');
//       }
//     };

//     const handleDragLeave = () => {
//       setHoveredWidgetId(null);
//       setHoverPosition(null);
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
//         const widgetId = uuidv4();
//         // Dispatch the action to add a new widget
//         dispatch(
//           addWidget({
//             pageId: pageData.id,
//             widgetType:draggingWidget,
//             widgetId,
//           })
//         );
//       };

//       const handleDragOver = (event) => {
//         event.preventDefault(); // Required to allow dropping
//       };

//     return <Box sx={{display:'flex'}}>
//         <Box className="sidebar">
//         <Box key={'short-anwer'}
//             draggable
//             onDragStart={() => handleDragStart(widgetTypes.SHORTANSWER)}
//             className="sidebar-widget"
//              variant="contained" 
//              sx={{ p: 1, border: "1px solid gray" }}>
//             <Typography>Add Question</Typography>
//         </Box>
//       </Box>

//     <Box sx={{ padding: 2, borderRadius: 3,flexGrow:1 }}>

//         <Box className="formBuilder" onDrop={handleDrop} onDragOver={handleDragOver}>
//         {widgets.map((widget,index) => (
//           <Box
//             key={widget.id}
//             className={`form-widget ${hoveredWidgetId === widget.id ? 'hover' : ''}`}
//             onDragEnter={(e) => handleDragEnter(e, widget.id)}
//             onDragLeave={handleDragLeave}
//           >
//             {hoveredWidgetId === widget.id && hoverPosition === 'top' && (
//               <Box className="drop-indicator top" />
//             )}
//             {widget.id}
//             {/* <WidgetsTemplate key={index} data={widget} /> */}
//             {hoveredWidgetId === widget.id && hoverPosition === 'bottom' && (
//               <Box className="drop-indicator bottom" />
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//     </Box>
// }

// const WidgetWrapper = ({ pageData }) => {
//     const dispatch = useDispatch();

//     const [widgets, setWidgets] = useState([]);
//     const [draggingWidget, setDraggingWidget] = useState(null);
//     const [draggingWidgetId, setDraggingWidgetId] = useState(null); // For existing widgets
//     const [hoveredWidgetId, setHoveredWidgetId] = useState(null);
//     const [hoverPosition, setHoverPosition] = useState(null);

//     useEffect(() => {
//         if (pageData && pageData.widgets) {
//             setWidgets(Object.values(pageData.widgets)); // Update widgets only when pageData is defined
//         }
//     }, [pageData]);

//     const handleDragStart = (widget) => {
//         setDraggingWidget(widget);
//         setDraggingWidgetId(null); // Reset if dragging from sidebar
//     };

//     const handleWidgetDragStart = (widgetId) => {
//         setDraggingWidgetId(widgetId); // This is an existing widget
//         setDraggingWidget(null); // Reset sidebar dragging
//     };

//     const handleDragEnter = (e, widgetId) => {
//         setHoveredWidgetId(widgetId);

//         const widgetRect = e.target.getBoundingClientRect();
//         const offsetY = e.clientY - widgetRect.top;

//         // Adjust the threshold for more responsive behavior
//         const threshold = widgetRect.height * 0.3; // 30% of widget's height

//         if (offsetY < threshold) {
//             // Show the top indicator when near the top of the widget
//             setHoverPosition('top');
//         } else if (offsetY > widgetRect.height - threshold) {
//             // Show the bottom indicator when near the bottom of the widget
//             setHoverPosition('bottom');
//         } else {
//             // Do not show any drop indicator if in the middle section
//             setHoverPosition(null);
//         }
//     };


//     const handleDragLeave = () => {
//         setHoveredWidgetId(null);
//         setHoverPosition(null);
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();

//         // Drop a new widget from sidebar
//         if (draggingWidget) {
//             const widgetId = uuidv4(); // Generate new ID for the widget

//             // Dispatch the action to add a new widget
//             dispatch(
//                 addWidget({
//                     pageId: pageData.id,
//                     widgetType: draggingWidget,
//                     widgetId,
//                 })
//             );
//         }

//         // Move an existing widget within the form
//         if (draggingWidgetId) {
//             const updatedWidgets = [...widgets];

//             // Find the index of the dragging widget and remove it
//             const draggingIndex = updatedWidgets.findIndex(widget => widget.id === draggingWidgetId);
//             const [movedWidget] = updatedWidgets.splice(draggingIndex, 1);

//             // Find the drop position
//             const dropIndex = updatedWidgets.findIndex(widget => widget.id === hoveredWidgetId);
//             if (hoverPosition === 'top') {
//                 updatedWidgets.splice(dropIndex, 0, movedWidget); // Insert above
//             } else {
//                 updatedWidgets.splice(dropIndex + 1, 0, movedWidget); // Insert below
//             }

//             // Update state with the reordered widgets
//             setWidgets(updatedWidgets);

//             // Dispatch any necessary state update actions
//             // e.g., to update the position in your Redux store if necessary
//         }

//         // Clear dragging state
//         setDraggingWidget(null);
//         setDraggingWidgetId(null);
//         setHoveredWidgetId(null);
//         setHoverPosition(null);
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault(); // Required to allow dropping
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             {/* Sidebar for dragging new widgets */}
//             <Box className="sidebar">
//                 <Box
//                     key={'short-answer'}
//                     draggable
//                     onDragStart={() => handleDragStart(widgetTypes.SHORTANSWER)}
//                     className="sidebar-widget"
//                     variant="contained"
//                     sx={{ p: 1, border: "1px solid gray" }}
//                 >
//                     <Typography>Add Question</Typography>
//                 </Box>
//             </Box>

//             {/* Form builder area */}
//             <Box sx={{ padding: 2, borderRadius: 3, flexGrow: 1 }}>
//                 <Box
//                     className="formBuilder"
//                     onDrop={handleDrop}
//                     onDragOver={handleDragOver}
//                 >
//                     {widgets.map((widget, index) => (
//                         <Box
//                             key={widget.id}
//                             className={`form-widget ${hoveredWidgetId === widget.id ? 'hover' : ''}`}
//                             draggable
//                             onDragStart={() => handleWidgetDragStart(widget.id)} // Dragging existing widget
//                             onDragEnter={(e) => handleDragEnter(e, widget.id)}
//                             onDragLeave={handleDragLeave}
//                         >
//                             {/* Drop suggestion indicators */}
//                             {hoveredWidgetId === widget.id && hoverPosition === 'top' && (
//                                 <Box className="drop-indicator top" />
//                             )}

//                             {/* Render the widget here */}
//                             {widget.id}
//                             {/* Replace this with your actual widget rendering logic */}

//                             {hoveredWidgetId === widget.id && hoverPosition === 'bottom' && (
//                                 <Box className="drop-indicator bottom" />
//                             )}
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// const WidgetWrapper = ({ pageData }) => {
//     const dispatch = useDispatch();
//     const columns = 2;
//     const [widgets, setWidgets] = useState([]);
//     const [draggingWidget, setDraggingWidget] = useState(null);
//     const [draggingWidgetId, setDraggingWidgetId] = useState(null); // For existing widgets
//     const [hoveredWidgetId, setHoveredWidgetId] = useState(null);
//     const [hoverPosition, setHoverPosition] = useState(null);

//     useEffect(() => {
//         if (pageData && pageData.widgets) {
//             setWidgets(Object.values(pageData.widgets)); // Update widgets only when pageData is defined
//         }
//     }, [pageData]);

//     const handleDragStart = (widget) => {
//         setDraggingWidget(widget);
//         setDraggingWidgetId(null); // Reset if dragging from sidebar
//     };

//     const handleWidgetDragStart = (widgetId) => {
//         setDraggingWidgetId(widgetId); // This is an existing widget
//         setDraggingWidget(null); // Reset sidebar dragging
//     };

//     const handleDragEnter = (e, widgetId) => {
//         setHoveredWidgetId(widgetId);

//         const widgetRect = e.target.getBoundingClientRect();
//         const offsetY = e.clientY - widgetRect.top;

//         // Adjust the threshold for more responsive behavior
//         const threshold = widgetRect.height * 0.3; // 30% of widget's height

//         if (offsetY < threshold) {
//             setHoverPosition('top');
//         } else if (offsetY > widgetRect.height - threshold) {
//             setHoverPosition('bottom');
//         } else {
//             setHoverPosition(null);
//         }
//     };
//     console.log(hoveredWidgetId,'hovered',hoverPosition)
//     const handleDragLeave = () => {
//         setHoveredWidgetId(null);
//         setHoverPosition(null);
//     };

//     const handleDrop = (event) => {
//         event.preventDefault();
    
//         // Drop a new widget from sidebar
//         if (draggingWidget) {
//             const widgetId = uuidv4(); // Generate new ID for the widget
//             // Dispatch the action to add a new widget
//             dispatch(
//                 addWidget({
//                     pageId: pageData.id,
//                     widgetType: draggingWidget,
//                     widgetId,
//                     targetWidgetId:hoveredWidgetId,
//                     position:hoverPosition
//                 })
//             );
//         }
    
//         // Move an existing widget within the form
//         if (draggingWidgetId) {
//             const updatedWidgets = [...widgets];
    
//             // Find the index of the dragging widget and remove it
//             const draggingIndex = updatedWidgets.findIndex(widget => widget.id === draggingWidgetId);
//             const [movedWidget] = updatedWidgets.splice(draggingIndex, 1);
    
//             // Find the drop position
//             const dropIndex = updatedWidgets.findIndex(widget => widget.id === hoveredWidgetId);
//             if (hoverPosition === 'top') {
//                 updatedWidgets.splice(dropIndex, 0, movedWidget); // Insert above
//             } else {
//                 updatedWidgets.splice(dropIndex + 1, 0, movedWidget); // Insert below
//             }
    
//             // Update state with the reordered widgets
//             setWidgets(updatedWidgets);
    
//             // Dispatch update widget positions action for each widget
//             updatedWidgets.forEach((widget, index) => {
//                 const newPosition = {
//                     row: Math.floor(index / columns), // Assuming 'columns' is the number of columns in your layout
//                     column: index % columns,
//                 };
    
//                 // Dispatch action with a new position object
//                 dispatch(updateWidgetPositions({
//                     pageId: pageData.id,
//                     widgetId: widget.id,
//                     newPosition: { ...newPosition }, // Create a new object to avoid mutating
//                 }));
//             });
//         }
    
//         // Clear dragging state
//         setDraggingWidget(null);
//         setDraggingWidgetId(null);
//         setHoveredWidgetId(null);
//         setHoverPosition(null);
//     };
    
    

//     const handleDragOver = (event) => {
//         event.preventDefault(); // Required to allow dropping
//     };

//     return (
//         <Box sx={{ display: 'flex' }}>
//             {/* Sidebar for dragging new widgets */}
//             <Box className="sidebar">
//                 <Box
//                     key={'short-answer'}
//                     draggable
//                     onDragStart={() => handleDragStart(widgetTypes.SHORTANSWER)}
//                     className="sidebar-widget"
//                     variant="contained"
//                     sx={{ p: 1, border: "1px solid gray" }}
//                 >
//                     <Typography>Add Question</Typography>
//                 </Box>
//             </Box>

//             {/* Form builder area */}
//             <Box sx={{ padding: 2, borderRadius: 3, flexGrow: 1 }}>
//                 <Box
//                     className="formBuilder"
//                     onDrop={handleDrop}
//                     onDragOver={handleDragOver}
//                 >
//                     {widgets
//                         .sort((a, b) => a.position.row - b.position.row) // Ensure correct order before rendering
//                         .map((widget, index) => (
//                             <Box
//                                 key={widget.id}
//                                 className={`form-widget ${hoveredWidgetId === widget.id ? 'hover' : ''}`}
//                                 draggable
//                                 onDragStart={() => handleWidgetDragStart(widget.id)} // Dragging existing widget
//                                 onDragEnter={(e) => handleDragEnter(e, widget.id)}
//                                 onDragLeave={handleDragLeave}
//                             >
//                                 {/* Drop suggestion indicators */}
//                                 {hoveredWidgetId === widget.id && hoverPosition === 'top' && (
//                                     <Box className="drop-indicator top" />
//                                 )}

//                                 {/* Render the widget here */}
//                                 {widget.id}
//                                 {/* Replace this with your actual widget rendering logic */}

//                                 {hoveredWidgetId === widget.id && hoverPosition === 'bottom' && (
//                                     <Box className="drop-indicator bottom" />
//                                 )}
//                             </Box>
//                         ))}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };

const WidgetWrapper = ({ pageData }) => {
    const dispatch = useDispatch();
    const columns = 2;
    const [widgets, setWidgets] = useState([]);
    const [draggingWidget, setDraggingWidget] = useState(null);
    const [draggingWidgetId, setDraggingWidgetId] = useState(null); // For existing widgets
    const [hoveredWidgetId, setHoveredWidgetId] = useState(null);
    const [hoverPosition, setHoverPosition] = useState(null);

    useEffect(() => {
        if (pageData && pageData.widgets) {
            setWidgets(Object.values(pageData.widgets)); // Update widgets only when pageData is defined
        }
    }, [pageData]);

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
            setHoverPosition('top');
        } else if (offsetY > widgetRect.height - threshold) {
            setHoverPosition('bottom');
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
                    position: hoverPosition
                })
            );
        }

        // Move an existing widget within the form
        if (draggingWidgetId) {
            const updatedWidgets = [...widgets];

            // Find the index of the dragging widget and remove it
            const draggingIndex = updatedWidgets.findIndex(widget => widget.id === draggingWidgetId);
            const [movedWidget] = updatedWidgets.splice(draggingIndex, 1);

            // Find the drop position
            const dropIndex = updatedWidgets.findIndex(widget => widget.id === hoveredWidgetId);
            if (hoverPosition === 'top') {
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
                dispatch(updateWidgetPositions({
                    pageId: pageData.id,
                    widgetId: widget.id,
                    newPosition: { ...newPosition }, // Create a new object to avoid mutating
                }));
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

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar for dragging new widgets */}
            <Box className="sidebar">
                <Box
                    key={'short-answer'}
                    draggable
                    onDragStart={() => handleDragStart(widgetTypes.SHORTANSWER)}
                    className="sidebar-widget"
                    variant="contained"
                    sx={{ p: 1, border: "1px solid gray" }}
                >
                    <Typography>Add Question</Typography>
                </Box>
            </Box>

            {/* Form builder area */}
            <Box sx={{ padding: 2, borderRadius: 3, flexGrow: 1 }}>
                <Box
                    className="formBuilder"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {widgets
                        .sort((a, b) => a.position.row - b.position.row || a.position.column - b.position.column) // Ensure correct order before rendering
                        .map((widget, index) => (
                            <Box
                                key={widget.id}
                                className={`form-widget ${hoveredWidgetId === widget.id ? 'hover' : ''}`}
                                draggable
                                onDragStart={() => handleWidgetDragStart(widget.id)} // Dragging existing widget
                                onDragEnter={(e) => handleDragEnter(e, widget.id)}
                                onDragLeave={handleDragLeave}
                            >
                                {/* Drop suggestion indicators */}
                                {hoveredWidgetId === widget.id && hoverPosition === 'top' && (
                                    <Box className="drop-indicator top" />
                                )}

                                {/* Render the widget here */}
                                {widget.id} {/* Replace this with your actual widget rendering logic */}

                                {hoveredWidgetId === widget.id && hoverPosition === 'bottom' && (
                                    <Box className="drop-indicator bottom" />
                                )}
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    );
};


export default WidgetWrapper;