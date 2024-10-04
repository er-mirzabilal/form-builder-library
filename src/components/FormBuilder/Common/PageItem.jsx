import {
    ListItem,
    TextField,
  } from "@mui/material";
  import { useDispatch, useSelector } from "react-redux";
  import { setSelectedPage, setPageName } from "../../../slices/formBuilder";
  import Pageicon from "../../../assets/Vector.png";
  import { useState } from "react";
import { getSelectedPageId } from "../../../slices/formBuilder";
  
  const PageItem = ({ page }) => {
    console.log(page,'page');
    const dispatch = useDispatch();
    const [pageName, setPageNameLocal] = useState(page?.name);
    const selectedPageId = useSelector(getSelectedPageId);
   
    const handlePageSelect = (pageId) => {
      dispatch(setSelectedPage(pageId));
    };
    
    const handleChange = (event) => {
      setPageNameLocal(event.target.value);
      dispatch(setPageName({ pageId: selectedPageId, name: event.target.value }));
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
            selectedPageId === page.id
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
  