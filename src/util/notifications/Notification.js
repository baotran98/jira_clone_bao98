import { notification } from "antd";

export const Notification = (type, message, description = "") => {
  notification[type]({
    // action.typeNotification = 'success' | 'info' | 'warning' | 'error'
    message: message,
    description: description,
  });
};
