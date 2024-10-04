export const ContentType = {
  PAGE: "page",
  ELEMENT: "element",
  LAYOUT: "layout",
};

export const widgetTypes = {
  SHORTANSWER:'short_answer'
};

export const PageDefault = {
  id: "",
  name: "",
  type: "",
  pageSpecificConfigs: null,
  widgets: {},
};

export const WidgetDefault = {
  id: "",
  name: "",
  type: "",
  position: {
    row: 0,
    column: 0,
  },
  template: {
    label: {
      value: "Type your question here",
      references: {},
    },
    required: false,
    halfWidth: 0,
    maxLength: {
      value: "10",
      expectedTypes: ["string"],
    },
    minLength: {
      value: "4",
      expectedTypes: ["string"],
    },
    alwaysHide: false,
    placeholder: {
      value: "Type your question here",
      expectedTypes: ["string"],
    },
    defaultValue: {
      value: "",
      expectedTypes: ["string"],
    },
    validationErrorMessage: {
      value: "This field is required",
      expectedTypes: ["string"],
    },
  },
};
