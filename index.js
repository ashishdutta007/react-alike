import Freact from "./Freact";
const freact = new Freact();

// const element = <h1 title="foo">Hello</h1>;
// const container = document.getElementById("root");
// ReactDOM.render(element, container);

const element = freact.createElement("h1", { title: "foo" }, "Hello");
const container = document.getElementById("app")
freact.render(element, container);

