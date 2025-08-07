import type { MessageProps } from "~/types/props";

const { fetchMe } = useApi()

export default async (element: HTMLDivElement, props: MessageProps) => {
	console.log("message:", element);
	const me = await fetchMe();

	if (me && props.author?.uuid == me.uuid) {
		const text = element.getElementsByClassName("message-text")[0] as HTMLDivElement;
		text.contentEditable = "true";
		text.focus();
		const range = document.createRange();
		range.selectNodeContents(text);
		range.collapse(false);
		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);
		element.addEventListener("keyup", (e) => {
			console.log("key released:", e.key);
			if (e.key == "Escape") {
				text.contentEditable = "false";
			}
			text.blur();
		}, { once: true });
	}
}
