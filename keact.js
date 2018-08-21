/** @jsx createElement */
function render(element, parent) {
    let dom;
    console.log({element})
    if (typeof element === 'string') {
        dom = document.createTextNode(element);
    } else {
        const {
            type,
            props,
            children
        } = element;

        dom = document.createElement(type);
        const propsObj = props || {};
        const isListener = name => name.startsWith("on");
        Object.keys(propsObj).filter(isListener).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, propsObj[name]);
        });

        const isAttribute = name => !isListener(name);
        Object.keys(propsObj).filter(isAttribute).forEach(name => {
            dom[name] = propsObj[name];
        });

        const childElements = children || [];
        childElements.forEach(childElement => render(childElement, dom));
    }
    console.log({dom})
    parent.appendChild(dom);
}

function createElement(type, props = {}, ...args) {
    const children = [...args].filter(arg => arg);
    return {
        type,
        props,
        children
    };
}

export default {
    createElement,
    render
};

export {
    createElement,
    render
};