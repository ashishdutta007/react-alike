export default class Freact {
  constructor() {}

  // generates React element from JSX
  createElement = (type, props, ...children) => {
    return {
      type: type,
      props: {
        ...props,
        children
      }
    };
  };

  // render element tree to container
  render = (element, container) => {
    const dom = document.createElement(elemeny.type);
    container.appendChild(element);
  };

  // utility to create DOM node based to el type
  createDOMElement = elType => {
    if (typeof elType === "text") {
      createTextDOMNode(elType);
    }
  };
}
