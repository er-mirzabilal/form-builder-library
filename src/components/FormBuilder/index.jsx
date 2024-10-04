import { useSelector } from "react-redux";
import { getPages, getSelectedPageId } from "../../slices/formBuilder";
import { useMemo } from "react";
import { Box } from "@mui/material";
import WidgetWrapper from "./Common/WidgetWrapper";

const FormBuilder = ({ data }) => {
    const pages = useSelector(getPages);
    const selectedPageId = useSelector(getSelectedPageId);
    console.log(pages, 'pages')
    const pageData = useMemo(() => {
        if (Object.keys(pages).length) {
            return pages[selectedPageId] ? pages[selectedPageId] : null;
        } else {
            return null;
        }
    }, [selectedPageId, pages])
    return (<Box
        sx={{
            flexGrow: 1,
            padding: 0,
            overflowY: "auto",
            scrollbarWidth: "thin",
            backgroundColor: "#cccc",
            py: 4
        }}
        className="box-shadow"
    >
        <Box sx={{ border: '2px sloid red', borderRadius: '20px', background: 'white' }}>
            {pageData ? <WidgetWrapper pageData={pageData} /> : <>No Data Found</>}
        </Box>
    </Box>);

}

export default FormBuilder;

