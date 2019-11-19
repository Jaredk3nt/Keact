// function render(element, parent) {
//   let dom;
//   console.log({ element });
//   if (typeof element === "string") {
//     dom = document.createTextNode(element);
//   } else {
//     const { type, props, children } = element;

//     dom = document.createElement(type);
//     const propsObj = props || {};
//     const isListener = name => name.startsWith("on");
//     Object.keys(propsObj)
//       .filter(isListener)
//       .forEach(name => {
//         const eventType = name.toLowerCase().substring(2);
//         dom.addEventListener(eventType, propsObj[name]);
//       });

//     const isAttribute = name => !isListener(name);
//     Object.keys(propsObj)
//       .filter(isAttribute)
//       .forEach(name => {
//         dom[name] = propsObj[name];
//       });

//     const childElements = children || [];
//     childElements.forEach(childElement => render(childElement, dom));
//   }
//   console.log({ dom });
//   parent.appendChild(dom);
// }

function createElement(type, props = {}, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
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

function render(element, container) {
  let dom;
  // Determine type of node to create
  switch (element.type) {
    case "TEXT_ELEMENT":
      dom = document.createTextNode("");
      break;
    default:
      dom = document.createElement(element.type);
      element.props.children.forEach(child => render(child, dom));
  }
  // Attach HTML properties to the node
  Object.keys(element.props)
    .filter(isHtmlProp)
    .forEach(name => {
      dom[name] = element.props[name];
    });
  // Attach node to the container
  container.appendChild(dom);
}

function isHtmlProp(key) {
  return key !== "children";
}

let nextUnitOfWork = null;
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(nextWork) {

}

export default {
  createElement,
  render
};

export { createElement, render };
