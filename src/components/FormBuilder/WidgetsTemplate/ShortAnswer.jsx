import { useSelector } from "react-redux";
import { getSelectedWidgetID } from "../../../slices/formBuilder";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ShortAnswer = ({ data }) => {
    const [isHoverIconTopContainer, setIsHoverContainer] = useState(false);
    const handleLabelChange = () => {

    }
    const handleValueChange = () => {

    }
    const handleElementClick = (event) => {

    }
    const selectedWidgetId = useSelector(getSelectedWidgetID);
    return (
        <Box
            onClick={(event) => handleElementClick(event)}
            onMouseEnter={() => setIsHoverContainer(true)}
            onMouseLeave={() => setIsHoverContainer(false)}
            sx={{
                padding: "15px",
                border:
                    selectedWidgetId === data?.id
                        ? "1px solid blue"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                position: "relative",
                "&:hover": {
                    border: "1px solid blue",
                    // borderTop: isHoverIconTopContainer ? `2px solid blue` : "",
                    // borderBottom: isHoverIconBottomContainer ? `2px solid blue` : "",
                },
            }}
        >
            <Box>
                <TextField
                    // label="Label Text"
                    sx={{
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingLeft: 1,
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
                    fullWidth
                    placeholder={data.template.placeholder.value}
                    value={data.template.label.value}
                    onChange={handleLabelChange}
                />
                <TextField
                    // label="Question Text"
                    sx={{
                        backgroundColor: "white",
                        mt: 2,
                        "& .MuiOutlinedInput-root": {
                            "& input": {
                                paddingLeft: 1,
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
                    fullWidth
                    // placeholder={"Type your placeholder here"}
                    value={data.template.defaultValue.value}
                    onChange={handleValueChange}
                />
            </Box>
            {data.template.required && (
                <Typography>* This question is required.</Typography>
            )}
        </Box>
    )
}

export default ShortAnswer;