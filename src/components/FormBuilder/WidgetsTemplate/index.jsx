import { useMemo, useState } from "react";
import { widgetTypes } from "../../../utils/constants";
import ShortAnswer from "./ShortAnswer";
import { Box, IconButton } from "@mui/material";
import {
  ContentCopy,
  DeleteOutline,
  Settings,
  SwapVert,
} from "@mui/icons-material";

const WidgetsTemplate = ({
  data,
  handleDeleteWidget,
  handleCloneWidget,
  handleOpenDrawer,
}) => {
  const [isHoverWidget, setIsHoverWidget] = useState(false);
  console.log(data, "data");
  const widget = useMemo(() => {
    switch (data?.type) {
      case widgetTypes.SHORTANSWER:
        return <ShortAnswer data={data} />;
      default:
        return "sssss";
    }
  }, [data]);

  return (
    <>
      <Box
        sx={{ width: "100%", position: "relative", zIndex: 1 }}
        onMouseEnter={() => setIsHoverWidget(true)}
        onMouseLeave={() => setIsHoverWidget(false)}
        onClick={handleOpenDrawer}
      >
        {widget}
        {isHoverWidget && (
          <Box
            sx={{
              position: "absolute",
              right: "-3.5rem",
              top: 0,
              pl: 2,
              zIndex: 5,
            }}
            onClick={(e) => e.stopPropagation()} // Stop event propagation
          >
            <Box
              sx={{
                p: 1,
                backgroundColor: "white",
                borderRadius: "9999px",
                display: "flex",
                flexDirection: "column",
                gap: 0.4,
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <IconButton
                sx={{ borderRadius: "100%", p: 0.3 }}
                onClick={handleOpenDrawer}
              >
                <Settings sx={{ width: "22px", height: "22px" }} />{" "}
              </IconButton>{" "}
              <IconButton sx={{ borderRadius: "100%", p: 0.3 }}>
                <SwapVert
                  sx={{
                    width: "22px",
                    height: "22px",
                    transform: "rotate(90deg)",
                  }}
                />{" "}
              </IconButton>{" "}
              <IconButton
                sx={{ borderRadius: "100%", p: 0.4 }}
                onClick={() => handleCloneWidget(data.id)}
              >
                <ContentCopy sx={{ width: "20px", height: "20px" }} />{" "}
              </IconButton>{" "}
              <IconButton
                sx={{ borderRadius: "100%", p: 0.3 }}
                onClick={() => handleDeleteWidget(data.id)}
              >
                <DeleteOutline
                  sx={{ width: "22px", height: "22px", color: "red" }}
                />{" "}
              </IconButton>{" "}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default WidgetsTemplate;
