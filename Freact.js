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
  // 1. Create dom node
  if (fiber.dom == null) {
    fiber.dom = createDOMnode(fiber);
  }
  // 2. Append current fiber dom to parent fiber dom
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  //3. Create new fiber for each children
  let prevSibling = null;
  fiber.props.children.map((child, index) => {
    const newFiber = {
      dom: null,
      parent: fiber,
      props: child.props,
      type: child.type
    };
    //4. Add newFiber to tree as child or sibling
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      // ?????
      prevSibling.sibling = newFiber;
    }
    // ?????
    prevSibling = newFiber;
  });

  // 5. Return the nextUnitOfWork
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

let nextUnitOfWork = null;
requestIdleCallback(workLoop);
console.log("yellow");

export { createElement, render };
