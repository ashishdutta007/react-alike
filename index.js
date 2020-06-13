import "./style.css";
import { createElement, render } from "./Freact";

const element = createElement(
  "div",
  { id: "foo" },
  createElement("a", null, "bar"),
  createElement("br")
);
const container = document.getElementById("app");
render(element, container);

// tell babel to use Didact’s createElement instead of React’s?
// when babel transpiles the JSX it will use the function we define.
/** @jsx Didact.createElement */
// <div id="foo">
// <a>bar</a>
// <b />
// </div>
