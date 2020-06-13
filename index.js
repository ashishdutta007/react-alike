const utils = {
  getAllChildren: children => {
    return children.map(child => {
      if (typeof child == "object") return child;
      else return utils.createTextElement(child);
    });
  },
  createTextElement: text => ({
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }),
  createDOMnode: type => {
    if (type === 'TEXT_ELEMENT') {
      return document.createTextNode();
    } else {
      return document.createElement(type);
    }
  }
};

const Freact = {
  // generates React element from JSX
  // returns an object with two properties: type and props
  createElement: (type, props, ...children) => {
    return {
      type: type,
      props: {
        ...props,
        children: utils.getAllChildren(children),
      }
    };
  },
  // render the element tree to a container
  // render: is where React changes the DOM
  // add/update/delete nodes to DOM
  render: (element, container) => {
    const { type, props } = element;
    const node = utils.createDOMnode(type);

    // set all the props to the node except its children
    Object.entries(props).forEach(([key, val]) => {
      if (key !== "children") {
        node[key] = val;
      }
    });

    // render all children recursively
    props.children.forEach(child => render(child, node));

    container.appendChild(node);
  },
};

const element = Freact.createElement("div", { id: "foo" },
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