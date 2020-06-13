import { getAllChildren, createDOMnode } from "./utils";

// generates React element from JSX
// returns an object with two properties: type and props
function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: getAllChildren(children)
    }
  };
}
// render the element tree to a container
// render: is where React changes the DOM
// add/update/delete nodes to DOM
function render(element, container) {
  const { type, props } = element;
  const node = createDOMnode(type);

  // set all the props to the node except its children
  Object.entries(props).forEach(([key, val]) => {
    if (key !== "children") {
      node[key] = val;
    }
  });

  // render all children recursively
  props.children.forEach(child => render(child, node));
  container.appendChild(node);
}

export { createElement, render };
