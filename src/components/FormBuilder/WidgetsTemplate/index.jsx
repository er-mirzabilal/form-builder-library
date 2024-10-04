import { useMemo } from "react";
import { widgetTypes } from "../../../utils/constants"
import ShortAnswer from "./ShortAnswer";

const WidgetsTemplate = ({ data }) => {
    console.log(data,'data');
    const widget = useMemo(() => {
        switch (data?.type) {
            case widgetTypes.SHORTANSWER:
                return <ShortAnswer data={data} />
            default:
                return 'sssss';
        }
    }, [data])
    return <>
        {widget}
    </>
}

export default WidgetsTemplate;