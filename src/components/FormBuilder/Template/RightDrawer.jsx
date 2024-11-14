import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, InfoOutlined } from "@mui/icons-material";
import {
  getPages,
  getSelectedPageId,
  getSelectedWidgetId,
  handleChangeDefaultValueInput,
  handleChangeHalfWidth,
  handleChangePlaceHolderInput,
  handleChangeRequiredValue,
} from "../../../slices/formBuilder";
import { useDispatch } from "react-redux";
import { getSelectedWidget } from "../../../utils/common";
import { useSelector } from "react-redux";

const RightDrawer = ({ open, handleClose }) => {
  const pages = useSelector(getPages);
  const selectedWidgetId = useSelector(getSelectedWidgetId);
  const selectedPageId = useSelector(getSelectedPageId);
  const dispatch = useDispatch();

  const selectedWidget = useMemo(() => {
    return getSelectedWidget(pages, selectedPageId, selectedWidgetId);
  }, [selectedPageId, selectedWidgetId]);

  const [questionValue, setQuestionValue] = useState(
    selectedWidget?.template?.placeholder?.value ?? ""
  );
  const [defaultValueInput, setDefaultValueInput] = useState(
    selectedWidget?.template?.defaultValue?.value ?? ""
  );
  const [required, setRequired] = useState(false);
  const [halfWidth, setHalfWidth] = useState(false);

  const handleChangeQuestion = (e) => {
    setQuestionValue(e.target?.value);
    setTimeout(() => {
      dispatch(handleChangePlaceHolderInput({ value: e.target?.value }));
    }, 800);
  };

  const handleChangeDefaultValue = (e) => {
    setDefaultValueInput(e.target?.value);
    setTimeout(() => {
      dispatch(handleChangeDefaultValueInput({ value: e.target?.value }));
    }, 800);
  };
  const handleChangeRequired = () => {
    const newRequiredValue = !required;
    setRequired(newRequiredValue);
    dispatch(handleChangeRequiredValue({ value: newRequiredValue }));
  };

  const handleChangeHalfWidthValue = () => {
    const newHaldWidthValue = !halfWidth;
    setHalfWidth(newHaldWidthValue);
    dispatch(handleChangeHalfWidth({ value: newHaldWidthValue }));
  };

  useEffect(() => {
    if (selectedWidget?.template?.placeholder?.value) {
      setQuestionValue(selectedWidget?.template?.placeholder?.value);
    }
    if (selectedWidget?.template?.defaultValue?.value !== undefined) {
      console.log(defaultValueInput, selectedWidget);
      setDefaultValueInput(selectedWidget?.template?.defaultValue?.value);
    }
    if (selectedWidget?.template?.required !== undefined) {
      setRequired(selectedWidget?.template?.required);
    }
    if (selectedWidget?.template?.halfWidth !== undefined) {
      setHalfWidth(selectedWidget?.template?.halfWidth);
    }
  }, [selectedWidgetId, selectedWidget]);

  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "360px",
            boxSizing: "border-box",
            mt: 10,
            mb: 4,
            p: 2,
            borderRadius: 2,
          },
          backgroundColor: "white",
          // height: "10px"
        }}
        className="box-shadow"
        variant="persistent"
        anchor="right"
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", gap: 2, textAlign: "center" }}>
          <IconButton onClick={handleClose} sx={{ padding: 0.4 }}>
            <Close />
          </IconButton>
          <Typography variant="h6">Title</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "14px" }}>PlaceHolder</Typography>
            <TextField
              fullWidth
              value={questionValue}
              placeholder={"Enter placeholder"}
              onChange={handleChangeQuestion}
            />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontSize: "14px" }}>Default Value</Typography>
            <TextField
              fullWidth
              value={defaultValueInput}
              placeholder={"Enter default value"}
              onChange={handleChangeDefaultValue}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Required</Typography>

            <Switch checked={required} onChange={handleChangeRequired} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              Half Width{" "}
              <Tooltip
                title={
                  <span style={{ display: "block", width: "200px", fontSize: "14px" }}>
                    Make this field take up half the width of the form. Only
                    applies when the field is on its own row.
                  </span>
                }
                placement="top"
                arrow
              >
                <InfoOutlined sx={{ width: "14px", height: "12px" }} />
              </Tooltip>
            </Typography>

            <Switch checked={halfWidth} onChange={handleChangeHalfWidthValue} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default RightDrawer;
