import {Language} from "./Language";

const backend = process.env.REACT_APP_BACKEND_URL

const AppConfig = {
  BACKEND_URL: `${backend ? backend : window.location.origin}/api/`,
  LANGUAGE: process.env.REACT_APP_LANGUAGE! as keyof typeof Language
};

export default AppConfig;
