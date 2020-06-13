import { getAllChildren, createDOMnode } from "./utils";

// generates React element from JSX
function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: getAllChildren(children)
    }
  };
}

// render: is where React changes the DOM
function render(element, container) {
  const node = createDOMnode(element);

  // set nextUnitOfWork to the root of the fiber tree
  // root fiber element
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };

  // element.props.children.forEach(child => render(child, node));
  // container.appendChild(node);
}

function workloop(deadline){
  while(deadline.timeRemaining > 1 && nextUnitOfWork){
    nextUnitOfWork =  performUnitWork(nextUnitOfWork);
  }

  if(nextUnitOfWork){
    requestIdleCallback(workloop);
  }

}

let nextUnitOfWork = null

requestIdleCallback(workloop);
​
export { createElement, render };
