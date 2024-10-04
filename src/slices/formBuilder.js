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
    addWidget(state, action) {
     const {pageId, widgetType, widgetId} = action.payload;
      const newWidget = {
        ...WidgetDefault,
        id:widgetId,
        name: widgetType,
        type:widgetType
      }
     state.template.pages[pageId].widgets[widgetId] = newWidget;
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
} = formSlice.actions;

export default formSlice.reducer;
