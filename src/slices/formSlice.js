// src/slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { ContentType } from "../utils/constants";

export const getSelectedContent = (state) => state.form.selectedContent;
export const getSelectedContentType = (state) => state.form.selectedContentType;
export const getPages = (state) => state.form.pages;
export const getCurrentPageId = (state) => state.form.currentPageId;
export const getSelectedLayoutId = (state) => state.form.selectedLayoutId;

const initialState = {
  formName: "",
  pages: [],
  currentPageId: null,
  selectedContent: null,
  selectedContentType: "",
  selectedLayoutId: "",
};

const formSlice = createSlice({
  name: "form",
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
    addPage(state) {
      const pagesLength = state.pages.length;
      const newPage = {
        id: Date.now().toString() + "-page",
        name: `Page ${pagesLength + 1}`,
        layouts: [
          {
            id: Date.now().toString() + "-layout",
            // name: `Layout 1`,
            columns: 1,
            backgroundColor: "white",
            elements: [
              // Default fields: Email and Password
              {
                id: Date.now().toString() + "-email",
                type: "email",
                columns: 1,
                appendArray: [{}],
                prependArray: [],
                properties: {
                  label: "Email",
                  placeholder: "Enter your email",
                  isRequired: true,
                },
              },
              {
                id: Date.now().toString() + "-text",
                type: "text",
                columns: 1,
                properties: {
                  label: "Full Name",
                  placeholder: "Enter your name",
                  isRequired: true,
                },
              },
            ],
          },
        ],
      };
      state.pages.push(newPage);
      state.currentPageId = newPage.id;
    },
    setCurrentPage(state, action) {
      state.currentPageId = action.payload;
    },
    setPageName(state, action) {
      const { pageId, name } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.name = name;
      }
    },
    addElement(state, action) {
      const { pageId, layoutId, element } = action.payload;
      return {
        ...state,
        pages: state.pages.map((page) => {
          // Find the page with the matching pageId
          if (page.id === pageId) {
            return {
              ...page,
              layouts: page.layouts.map((layout) => {
                // Find the layout with the matching layoutId
                if (layout.id === layoutId) {
                  return {
                    ...layout,
                    elements: [...layout.elements, element], // Add the new element to the elements array
                  };
                }
                return layout; // Return other layouts unchanged
              }),
            };
          }

          return page; // Return other pages unchanged
        }),
      };
    },
    addLayout(state, action) {
      const { pageId, element, index, position } = action.payload;

      return {
        ...state,
        pages: state.pages.map((page) => {
          if (page.id === pageId) {
            const updatedLayouts = [...page.layouts]; // Create a copy of the layouts array

            if (position && index >= 0) {
              // Insert at a specific index based on position
              if (position === "top") {
                updatedLayouts.splice(index, 0, {
                  id: Date.now().toString() + "-layout",
                  columns: 1,
                  backgroundColor: "white",
                  elements: [element],
                });
              } else if (position === "bottom") {
                updatedLayouts.splice(index + 1, 0, {
                  id: Date.now().toString() + "-layout",
                  columns: 1,
                  backgroundColor: "white",
                  elements: [element],
                });
              }
            } else {
              // Append the new layout when no index/position is provided
              updatedLayouts.push({
                id: Date.now().toString() + "-layout",
                columns: 1,
                backgroundColor: "white",
                elements: [element],
              });
            }

            // Return the updated page with modified layouts
            return {
              ...page,
              layouts: updatedLayouts,
            };
          }

          // Return the unchanged page if id doesn't match
          return page;
        }),
      };
    },
    updateElementProperties(state, action) {
      const { pageId, elementId, properties } = action.payload;

      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        const layout = page.layouts.find(
          (l) => l.id === state.selectedLayoutId
        );
        if (layout) {
          const element = layout.elements.find((el) => el.id === elementId);
          if (element) {
            element.properties = { ...element.properties, ...properties };
            state.selectedContent.properties = {
              ...element.properties,
              ...properties,
            };
          }
        }
      }
    },
    updateLayoutColumns(state, action) {
      const { pageId, layoutId, columns } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);

      if (page) {
        const layout = page.layouts.find((el) => el.id === layoutId);
        if (layout) {
          layout.columns = columns;
        }
        if (
          state.selectedContent.columns &&
          state.selectedContentType === ContentType.LAYOUT
        ) {
          state.selectedContent.columns = columns;
        }
      }
    },
    updateLayoutBackground(state, action) {
      const { pageId, layoutId, color } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        const layout = page.layouts.find((el) => el.id === layoutId);
        if (layout) {
          layout.backgroundColor = color;
        }
      }
    },
    setSelectedContent(state, action) {
      const payload = action.payload;
      state.selectedContent = payload;
    },
    setSelectedContentType(state, action) {
      const payload = action.payload;
      state.selectedContentType = payload;
    },
    setSelectedLayoutId(state, action) {
      const payload = action.payload;
      state.selectedLayoutId = payload;
    },
    updateSelectedContentBackground(state, action) {
      const payload = action.payload;
      state.selectedContent.backgroundColor = payload;
    },
  },
});

export const {
  updateFormName,
  addPage,
  setCurrentPage,
  addLayout,
  addElement,
  updateElementProperties,
  updateLayoutColumns,
  updateLayoutBackground,
  setSelectedContentType,
  setSelectedContent,
  setPageName,
  setSelectedLayoutId,
  setPageContent,
  updateSelectedContentBackground,
} = formSlice.actions;

export default formSlice.reducer;
