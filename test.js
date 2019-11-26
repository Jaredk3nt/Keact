/** @jsx createElement */
import Keact, { createElement, useState } from "./src/keact";

function App(props) {
  const [state, setState] = useState(1);
  return (
    <div>
      <h1>Count: {state}</h1>
      <button onClick={() => setState(2)}>2</button>
      <button onClick={() => setState(3)}>3</button>
      <button onClick={() => setState(4)}>4</button>
      <button onClick={() => setState(c => c+1)}>+</button>
    </div>
  );
}

const elem = <App name="foo" />;
const root = document.getElementById("root");
Keact.render(elem, root);
