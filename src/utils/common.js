import { useSelector } from "react-redux";
import {
  getPages,
  getSelectedPageId,
  getSelectedWidgetId,
} from "../slices/formBuilder";

export const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getSelectedWidget = (pages,SelectedPageId, SelectedWidgetId) => {
  

  const page = pages[SelectedPageId];
  const widget = page.widgets[SelectedWidgetId];

  return widget;
};
