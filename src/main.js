import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills.js";
import "./scripts/works";
import "./scripts/burger";
import "./scripts/reviews.js";
import "./scripts/header-menu.js";
