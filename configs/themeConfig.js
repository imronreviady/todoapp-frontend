import { v4 as uuidv4 } from "uuid";
const themeConfig = {
  app: {
    name: "Todo App By Imron Reviady",
  },
  // layout
  layout: {
    isRTL: false,
    darkMode: false,
    semiDarkMode: false,
    skin: "default",
    contentWidth: "full",
    type: "vertical",
    navBarType: "sticky",
    footerType: "static",
    isMonochrome: false,
    menu: {
      isCollapsed: false,
      isHidden: true,
    },
    mobileMenu: false,
    customizer: false,
  },
};

export default themeConfig;
