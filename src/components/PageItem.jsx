import {
  ListItem,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setPageName } from "../slices/formSlice";
import Pageicon from "../assets/Vector.png";
import { useState } from "react";

const PageItem = ({ page }) => {
  const dispatch = useDispatch();
  const [pageName, setPageNameLocal] = useState(page?.name);
  const currentPageId = useSelector((state) => state.form.currentPageId);
 

  const handlePageSelect = (pageId) => {
    dispatch(setCurrentPage(pageId));
  };
  
  const handleChange = (event) => {
    setPageNameLocal(event.target.value);
    dispatch(setPageName({ pageId: currentPageId, name: event.target.value }));
    console.log(event.target.value, "sss;", page);
  };

  return (
    <ListItem
      key={page.id}
      disablePadding
      sx={{ display: "flex", gap: "10px", margin: "10px" }}
    >
      <img
        style={{
          width: "45px",
          height: "40px",
          borderRadius: "4px",
          border:
            currentPageId === page.id
              ? "1px solid blue"
              : "1px solid transparent",
        }}
        src={Pageicon}
        onClick={() => handlePageSelect(page.id)}
      />

      <TextField
        variant="outlined"
        value={pageName}
        onChange={handleChange}
        size="medium"
        sx={{

          "& .MuiOutlinedInput-root": {
            "& input": {
              padding: 0,
            },
            "& fieldset": {
              border: "none",
              borderRadius: 0,
            },
            "&:hover fieldset": {
              borderBottom: "1px solid black",
            },
            "&.Mui-focused fieldset": {
              border: "none", // focused effect
              borderBottom: "1px solid black",
            },
          },
        }}
      />
    </ListItem>
  );
};

export default PageItem;
