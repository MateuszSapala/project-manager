const backend = process.env.REACT_APP_BACKEND_URL

const AppConfig = {
  BACKEND_URL: `${backend ? backend : window.location.origin}/api/`
};

export default AppConfig;
