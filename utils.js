export const utils = {
  getAllChildren: children => {
    return children.map(child => {
      if (typeof child == "object") return child;
      else return createTextElement(child);
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
}