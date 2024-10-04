import { Box, Button, Modal, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { addWidget, getSelectedPageId } from "../../../slices/formBuilder";
import { useDispatch } from "react-redux";
import { widgetTypes } from "../../../utils/constants";
import { v4 as uuidv4 } from 'uuid';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddWidgetModal = ({ open, handleClose }) => {
    const selectedPageId = useSelector(getSelectedPageId);
    const dispatch = useDispatch();
    const handleAddWidget = (widgetType) => {
        if (selectedPageId) {
            const widgetId = uuidv4();
            dispatch(addWidget({ pageId: selectedPageId, widgetType: widgetType, widgetId }));
        }
        handleClose();
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>

                <Button variant="contained" onClick={() => handleAddWidget(widgetTypes.SHORTANSWER)} sx={{ p: 1, border: "1px " }}>
                    <Typography>Add Question</Typography>
                </Button>
            </Box>
        </Modal>)
}

export default AddWidgetModal