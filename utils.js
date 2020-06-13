function getAllChildren(children) {
  return children.map(child => {
    if (typeof child == "object") return child;
    else return createTextElement(child);
  });
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
// create & set the DOM node
function createDOMnode(fiber) {
  const { type, props } = fiber;
  let dom;
  if (type === "TEXT_ELEMENT") {
    dom = document.createTextNode("");
  } else {
    dom = document.createElement(type);
  }
  // set all the props to the node except its children
  Object.entries(props).forEach(([key, val]) => {
    if (key !== "children") {
      dom[key] = val;
    }
  });
  return dom;
}

export { getAllChildren, createDOMnode, createTextElement };
