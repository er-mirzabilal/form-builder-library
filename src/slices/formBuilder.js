// src/slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { PageDefault, WidgetDefault, widgetTypes } from "../utils/constants";

export const getPages = (state) => state.formBuilder.template.pages;
export const getSelectedPageId = (state) => state.formBuilder.selectedPageId;
export const getSelectedWidgetId = (state) =>
  state.formBuilder.selectedWidgetId;

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
      const { pageId, widgetType, widgetId, targetWidgetId, position } =
        action.payload;
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

      if (!targetWidget) {
        console.log("first element");
        const newWidget = {
          ...WidgetDefault,
          id: widgetId,
          name: widgetType,
          type: widgetType,
        };
        state.template.pages[pageId].widgets[widgetId] = newWidget;
        return;
      }

      const targetRow = targetWidget.position.row;
      const newWidgetRow = position === "above" ? targetRow : targetRow + 1;

      // Step 1: Update positions of existing widgets
      Object.keys(widgets).forEach((widgetId) => {
        const widget = widgets[widgetId];

        if (widget.position.row >= newWidgetRow) {
          widget.position.row += 1; // Increment the row for widgets below the new position
        }
      });

      // Step 2: Add the new widget at the correct position
      widgets[widgetId] = {
        ...WidgetDefault,
        id: widgetId,
        name: widgetType,
        type: widgetType,
        position: {
          row: newWidgetRow,
          column: 0, // Assuming column is 0; adjust as needed
        },
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
    deleteWidgetWithId: (state, action) => {
      const { pageId, widgetId } = action.payload;

      const page = state.template.pages[pageId];
      if (page && page.widgets) {
        // Delete the widget from the page's widgets
        delete page.widgets[widgetId];
      }
    },
    deletePageWithId: (state, action) => {
      const { pageId } = action.payload;

      if (state.template.pages[pageId]) {
        delete state.template.pages[pageId];
      }

      const pageIds = Object.keys(state.template.pages);

      state.selectedPageId = pageIds.length > 0 ? pageIds[0] : "";
    },
    cloneWidgetWithId: (state, action) => {
      const { pageId, widgetId, cloneWidgetId } = action.payload;
      const page = state.template.pages[pageId];

      if (page && page.widgets) {
        // Delete the widget from the page's widgets
        const widget = page.widgets[widgetId];

        page.widgets[cloneWidgetId] = {
          ...WidgetDefault,
          id: cloneWidgetId,
          name: widget.name,
          type: widget.type,
        };
      }
    },
    handleChangePlaceHolderInput(state, action) {
      const { value } = action.payload;
      const pageId = state.selectedPageId;
      const widgetId = state.selectedWidgetId; // Get the widget ID from the selected widget

      const page = state.template.pages[pageId];
      const widget = page.widgets[widgetId];

      if (widget && widget.type === widgetTypes.SHORTANSWER) {
        if (page && page.widgets && widget) {
          page.widgets[widgetId] = {
            ...page.widgets[widgetId],
            template: {
              ...page.widgets[widgetId].template,
              placeholder: {
                ...page.widgets[widgetId].template.placeholder,
                value: value,
              },
            },
          };
        }
      }
    },
    handleChangeDefaultValueInput(state, action) {
      const { value } = action.payload;
      const pageId = state.selectedPageId;
      const widgetId = state.selectedWidgetId; // Get the widget ID from the selected widget

      const page = state.template.pages[pageId];
      const widget = page.widgets[widgetId];

      if (widget && widget.type === widgetTypes.SHORTANSWER) {
        if (page && page.widgets && page.widgets[widgetId]) {
          page.widgets[widgetId] = {
            ...page.widgets[widgetId],
            template: {
              ...page.widgets[widgetId].template,
              defaultValue: {
                ...page.widgets[widgetId].template.defaultValue,
                value: value,
              },
            },
          };
        }
      }
    },
    handleChangeRequiredValue(state, action) {
      const { value } = action.payload;
      const pageId = state.selectedPageId;
      const widgetId = state.selectedWidgetId; // Get the widget ID from the selected widget

      const page = state.template.pages[pageId];
      const widget = page.widgets[widgetId];

      if (page && page.widgets && widget) {
        page.widgets[widgetId] = {
          ...widget,
          template: {
            ...widget.template,
            required: value,
          },
        };
      }
    },
    handleChangeHalfWidth(state, action) {
      const { value } = action.payload;
      const pageId = state.selectedPageId;
      const widgetId = state.selectedWidgetId; // Get the widget ID from the selected widget

      const page = state.template.pages[pageId];
      const widget = page.widgets[widgetId];

      if (page && page.widgets && widget) {
        page.widgets[widgetId] = {
          ...widget,
          template: {
            ...widget.template,
            halfWidth: value,
          },
        };
      }
    },
    setSelectedPage(state, action) {
      state.selectedPageId = action.payload;
    },
    setSelectedWidgetId(state, action) {
      const { widgetId } = action.payload;

      state.selectedWidgetId = widgetId;
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
  setSelectedWidgetId,
  setPageName,
  setPageContent,
  updateWidgetPositions,
  deleteWidgetWithId,
  deletePageWithId,
  cloneWidgetWithId,
  handleChangePlaceHolderInput,
  handleChangeDefaultValueInput,
  handleChangeRequiredValue,
  handleChangeHalfWidth,
} = formSlice.actions;

export default formSlice.reducer;
