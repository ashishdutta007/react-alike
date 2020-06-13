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
function createDOMnode(type) {
  if (type === "TEXT_ELEMENT") {
    return document.createTextNode();
  } else {
    return document.createElement(type);
  }
}

export { getAllChildren, createDOMnode, createTextElement };
