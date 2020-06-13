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
// element : react element {type, props: {children}}
function render(element, container) {
  console.log("render() called");

  // set nextUnitOfWork to the root of the fiber tree
  // root fiber element
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
}

// loop to poll for render tasks
// nextUnitOfWork : render task
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() >= 1) {
    console.log("RIC cb - exec", new Date().getTime());
    nextUnitOfWork = performUnitWork(nextUnitOfWork);
  }
  requestIdleCallback(workLoop);
}

// performing render task of fiber(element) to DOM
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
console.log("freact module import - exec");

export { createElement, render };
