import { render } from "vue";

export default (div: Element) => {
  render(null, div);
  div.remove();
}
