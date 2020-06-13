// import "./style.css";
import Freact from '.';

const freact = new Freact();
const element = freact.createElement("h1", { title: "foo" }, "Hello");
const container = document.getElementById("app");
freact.render(element, container);
