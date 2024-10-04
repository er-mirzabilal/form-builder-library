import { Box, ButtonBase, Divider, Grid2, Tooltip } from "@mui/material";
import WidgetsTemplate from "../WidgetsTemplate";
import { Add } from "@mui/icons-material";
import AddWidgetModal from "./addWidgetModal";
import { useState } from "react";

const WidgetWrapper = ({ pageData }) => {
    const [addWidgetModal, setAddWidgetModal] = useState(false)
    const handleAddWidgetClick = () => {
        setAddWidgetModal(true)
    }
    Object.keys(pageData.widgets).map(([key, widget]) => {

    })
    return <Box sx={{ padding: 2, borderRadius: 3 }}>
        <Grid2 container>
            {Object.entries(pageData.widgets).map(([key, widget]) => (
                <WidgetsTemplate key={key} data={widget} />
            ))}
            <Box
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
            </Box>

        </Grid2>
        <AddWidgetModal open={addWidgetModal} handleClose={() => setAddWidgetModal(false)} />
    </Box>
}

export default WidgetWrapper;