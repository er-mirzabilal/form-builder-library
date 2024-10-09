// src/slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { PageDefault, WidgetDefault } from "../utils/constants";

export const getPages = (state) => state.formBuilder.template.pages;
export const getSelectedPageId = (state) => state.formBuilder.selectedPageId;
export const getSelectedWidgetID = (state) => state.form.selectedWidgetId;

const initialState = {
  id: "",
  name: "",
  template: {
    theme: "default",
    otherConfigs: null,
    pages: {
        // id:"",
        // name:"",
        // widgets:{}
    },
  },
  selectedPageId: "",
  selectedWidgetId: "",
};

const formSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    updateFormName(state, action) {
      state.formName = action.payload;
    },
    setPageContent(state, action) {
      const { pageId, content } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page = { ...page, ...content };
      }
    },
    addPage(state, action) {
      const pageId = action.payload;
      const pagesLength = Object.keys(state.template.pages).length;
      const newPage = {
        ...PageDefault,
        id: pageId,
        name: `Page ${pagesLength + 1}`,
        type: "form",
      };
      state.template.pages[pageId] = newPage;
      state.selectedPageId = newPage.id;
    },
    addWidget: (state, action) => {
      const { pageId, widgetType, widgetId ,targetWidgetId, position } = action.payload;
      const page = state.template.pages[pageId];

      if (!page) {
        console.error("Page not found!");
        return;
      }

      const widgets = page.widgets;
      const targetWidget = widgets[targetWidgetId];

      if (!targetWidget && Object.keys(widgets)?.length) {
        console.error("Target widget not found!");
        return;
      }

      if(!targetWidget){
        console.log('first element');
        const newWidget = {
              ...WidgetDefault,
              id:widgetId,
              name: widgetType,
              type:widgetType
            }
           state.template.pages[pageId].widgets[widgetId] = newWidget;
        return;
      }

      const targetRow = targetWidget.position.row;
      const newWidgetRow = position === "above" ? targetRow : targetRow + 1;

      // Step 1: Update positions of existing widgets
      Object.keys(widgets).forEach(widgetId => {
        const widget = widgets[widgetId];

        if (widget.position.row >= newWidgetRow) {
          widget.position.row += 1; // Increment the row for widgets below the new position
        }
      });

      // Step 2: Add the new widget at the correct position
      widgets[widgetId] = {
        ...WidgetDefault,
        id:widgetId,
        name: widgetType,
        type: widgetType,
        position: {
          row: newWidgetRow,
          column: 0 // Assuming column is 0; adjust as needed
        }
      };
    },
    // addWidget(state, action) {
    //  const {pageId, widgetType, widgetId} = action.payload;
    //   const newWidget = {
    //     ...WidgetDefault,
    //     id:widgetId,
    //     name: widgetType,
    //     type:widgetType
    //   }
    //  state.template.pages[pageId].widgets[widgetId] = newWidget;
    // },
    updateWidgetPositions: (state, action) => {
      const { pageId, widgetId, newPosition } = action.payload;

      // Find the page
      const page = state.template.pages[pageId];
      if (page && page.widgets) {
          // Find the widget and update its position
          const widget = page.widgets[widgetId];
          if (widget) {
              widget.position = newPosition;
          }
      }
    },
    setSelectedPage(state, action) {
      state.selectedPageId = action.payload;
    },
    setSelectedWidget(state, action) {
      state.selectedWidgetId = action.payload;
    },
    setPageName(state, action) {
      const { pageId, name } = action.payload;
      if (state.template.pages[pageId]) {
        state.template.pages[pageId].name = name;
      }
    },
  },
});

export const {
  updateFormName,
  addPage,
  addWidget,
  setSelectedPage,
  setSelectedWidget,
  setPageName,
  setPageContent,
  updateWidgetPositions
} = formSlice.actions;

export default formSlice.reducer;
