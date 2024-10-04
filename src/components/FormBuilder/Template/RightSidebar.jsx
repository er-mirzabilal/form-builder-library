// RightSidebar.jsx
import React from "react";
import { List, Box, Typography, ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    getPages,
    addPage,
} from "../../../slices/formBuilder";
import PageItem from "../Common/PageItem";
import { Add } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
// import RightDrawer from "./RightDrawer";
const RightSidebar = () => {
    const pages = useSelector(getPages);
    //   const isSideDrawerOpen = useSelector(getIsSideDrawerOpen);
    const isSideDrawerOpen = false;
    const dispatch = useDispatch();
    const handleAddPage = () => {
        const id = uuidv4();
        dispatch(addPage(id));
    };

    return (
        <>
            {isSideDrawerOpen ? (
                <></>
            ) : (
                <Box
                    sx={{
                        width: "336px",
                    }}
                >
                    <List>
                        {Object.entries(pages)?.map(([key, page]) => (
                            <PageItem page={page} key={key} />
                        ))}
                    </List>
                    <ButtonBase
                        onClick={handleAddPage}
                        sx={{
                            cursor: "pointer",
                            height: "50px",
                            marginBottom: "10px",
                            borderRadius: 1,
                            ml: 0.2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",

                                p: 1,
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "40px",
                                    background: "#b5b5b5",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "4px",
                                }}
                            >
                                <Add />
                            </Box>
                            <Typography sx={{ color: "#808080" }}>Add Page</Typography>
                        </Box>
                    </ButtonBase>
                </Box>
            )}
        </>
    );
};
export default RightSidebar;
