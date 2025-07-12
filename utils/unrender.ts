import { render } from "vue";

export default (div: HTMLDivElement) => {
  render(null, div);
  div.remove();
}
