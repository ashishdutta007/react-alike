import "./style.css";
import Freact from "./Freact";

const element = Freact.createElement(
  "div",
  { id: "foo" },
  Freact.createElement("a", null, "bar"),
  Freact.createElement("br")
);
const container = document.getElementById("app");
Freact.render(element, container);

// tell babel to use Didact’s createElement instead of React’s?
// when babel transpiles the JSX it will use the function we define.
/** @jsx Didact.createElement */
// <div id="foo">
// <a>bar</a>
// <b />
// </div>
