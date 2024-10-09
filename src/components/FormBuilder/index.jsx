import { useSelector } from "react-redux";
import { getPages, getSelectedPageId } from "../../slices/formBuilder";
import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import WidgetWrapper from "./Common/WidgetWrapper";
import RightDrawer from "./Template/RightDrawer";

const FormBuilder = ({ data }) => {
  const pages = useSelector(getPages);
  const [OpenDrawer, setOpenDrawer] = useState(false);
  const selectedPageId = useSelector(getSelectedPageId);
  console.log(pages, "pages");
  const pageData = useMemo(() => {
    if (Object.keys(pages).length) {
      return pages[selectedPageId] ? pages[selectedPageId] : null;
    } else {
      return null;
    }
  }, [selectedPageId, pages]);
  return (
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
            handleOpenDrawer={() => setOpenDrawer(true)}
            pageData={pageData}
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
      <RightDrawer open={OpenDrawer} handleClose={() => setOpenDrawer(false)} />
    </Box>
  );
};

export default FormBuilder;
