import { HelpOutlineOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Grid,
  Grid2,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addWidget, getSelectedPageId } from "../../../slices/formBuilder";
import { v4 as uuidv4 } from "uuid";
import { widgetTypes } from "../../../utils/constants";

const LeftSideBar = ({ handleDragStart }) => {
  const selectedPageId = useSelector(getSelectedPageId);
  const dispatch = useDispatch();
  const handleAddWidget = (widgetType) => {
    if (selectedPageId) {
      const widgetId = uuidv4();
      dispatch(
        addWidget({ pageId: selectedPageId, widgetType: widgetType, widgetId })
      );
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "320px",
          height: "100%",
          backgroundColor: "#f8f8f8",
          borderRadius: 1,
          flexGrow: 1,
        }}
        className="box-shadow"
      >
        <Box sx={{ display: "flex", gap: 1, p: 1 }}>
          <TextField
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Search here"
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                "& input": {
                  paddingLeft: 1,
                },
                "& fieldset": {
                  border: "1px solid #6b7280",
                  borderRadius: 1,
                },
                "&:hover fieldset": {
                  border: "1px solid black",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid black",
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            maxHeight: "100%",
            width: "100%",
            overflowY: "auto",
            scrollbarWidth: "thin",
            pl: 1,
          }}
        >
          <Box my={2}>
            <Typography sx={{ color: "rgb(156 163 175)" }}>
              Frequently Used
            </Typography>
            <Grid container sx={{ py: 2, gap: 1 }}>
              <Grid
                item
                xs={3.6}
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  p: "5px",
                  pt: 1,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
                className="sidebar-widget"
                key={"short-answer"}
                draggable
                onDragStart={() => handleDragStart(widgetTypes.SHORTANSWER)}
              >
                <Box
                  sx={{
                    background: "#cfd2fc",
                    borderRadius: 1,
                    p: 1,
                    width: "fit-content",
                    height: "25px",
                  }}
                >
                  <HelpOutlineOutlined sx={{ color: "#3d4aff" }} />
                </Box>
                <Typography
                  sx={{ color: "rgb(156 163 175)", fontSize: "12px" }}
                >
                  Question
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LeftSideBar;
