import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

export class BaseService {
  // phương thức update, edit
  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  // phương thức create,add
  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  // phương thức show, get
  get = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  // phương thức delete,remove
  delete = (url, model) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
