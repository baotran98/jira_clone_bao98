import React, { Component } from "react";
const stateDefault = {
  visible: false,
  contentDrawer: <p>Content Demo</p>,
  callBackSubmit: (propsValue) => {
    alert("Click!!!");
  },
  title: "",
};

export const DrawerReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM_EDIT_PROJECT":
      return {
        ...state,
        visible: true,
        contentDrawer: action.Component,
        title: action.showTitle,
      };
    case "SET_SUBMIT_EDIT_PROJECT": {
      return { ...state, visible: true, callBackSubmit: action.submitFunction };
    }
    case "SET_SUBMIT_CREATE_TASK": {
      return { ...state, visible: true, callBackSubmit: action.submitFunction };
    }
    case "OPEN_FORM_CREATE_TASK": {
      return {
        ...state,
        visible: true,
        contentDrawer: action.Component,
        title: action.showTitle,
      };
    }
    case "OPEN_FORM_EDIT_USER": {
      return {
        ...state,
        visible: true,
        contentDrawer: action.Component,
        title: action.showTitle,
      };
    }
    case "SET_SUBMIT_EDIT_USER": {
      return { ...state, visible: true, callBackSubmit: action.submitFunction };
    }
    default:
      return { ...state };
  }
};
