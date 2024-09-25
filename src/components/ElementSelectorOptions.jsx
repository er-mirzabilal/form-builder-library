import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import QuestionIcon from "../assets/questionIcon.png";
import TextIcon from "../assets/textIcon.png";
const ElementSelectorOptions = ({ handleElementSelect }) => {
  const handleAddElement = (type) => {
    let newElement = null;
    switch (type) {
      case 'text':
        newElement = {
          id: Date.now().toString() + "-text",
          type: "text",
          columns: 1,
          properties: {
            label: "Full Name",
            placeholder: "Enter your name",
            isRequired: true,
          },
        }
        break;
      case 'question':
        newElement = {
          id: Date.now().toString() + "question",
          type: type,
          columns: 1,
          properties: {
            label: "Type your question here",
            placeholder: "Type your placeholder here",
            isRequired: false,
            type: "short-text",
          },
        };
        break;
      default:
        break;
    }
    handleElementSelect(newElement);
  }
  return (<Grid container gap={2} width={"fit-content"}>
    {[
      { text: "text", Icon: TextIcon },
      { text: "question", Icon: QuestionIcon },
    ].map((item, index) => (
      <Box key={index} textAlign={"center"}>
        <ButtonBase
          onClick={() => {
            handleAddElement(item.text);
          }}
          sx={{
            border: "2px solid transparent",
            width: "80px",
            height: "54px",
            boxShadow:
              "rgba(0, 18, 71, 0.15) 0px 0px 1px 0px, rgba(0, 0, 33, 0.08) 0px 0px 2px 1px",
            ":hover": {
              border: "2px solid rgb(89, 126, 255)",
            },
            mb: 0.6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img width={30} height={30} src={item.Icon} alt="images" />
        </ButtonBase>
        <Typography
          sx={{ fontSize: "14px", textTransform: "capitalize" }}
        >
          {item.text}
        </Typography>
      </Box>
    ))}
  </Grid>)
}

export default ElementSelectorOptions;