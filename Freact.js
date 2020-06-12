export default class Freact {
  constructor() {}

  // generates React element from JSX
  // returns an object with two properties: type and props
  createElement = (type, props, ...children) => {
    return {
      type: type,
      props: {
        ...props,
        children
      }
    };
  };

  // render the element tree to a container
  // render: is where React changes the DOM
  render = (element, container) => {
    debugger;
    const { type, props = { children } } = element;
    const node = document.createElement(type);
    Object.entries(props).forEach(([key, val]) => {
      if (key !== "children") {
        node[key] = val;
      }
    });
    container.appendChild(node);
    for (child of props.children) {
      if (typeof child == "object") {
        this.render(child, node);
      }
    }
  };
}

const freact = new Freact();

const element = freact.createElement("h1", { title: "foo" }, "Hello");
const container = document.getElementById("app");
freact.render(element, container);
