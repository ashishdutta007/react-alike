import { getAllChildren, createDOMnode } from "./utils";

function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: getAllChildren(children)
    }
  };
}

function render(element, container) {
  console.log("render");

  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
}

// loop to poll for render tasks
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() >= 1) {
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
  }
  requestIdleCallback(workLoop);
}

// actual rendering of fiber(element) to DOM
function performUnitWork(fiber) {
  const node = createDOMnode(fiber);
}

let nextUnitOfWork = null;
requestIdleCallback(workLoop);
console.log("yellow");

export { createElement, render };
