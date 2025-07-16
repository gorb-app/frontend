import { render } from "vue";
import MessageReply from "~/components/UserInterface/MessageReply.vue";
import type { MessageProps } from "~/types/props";

export default (element: HTMLDivElement, props: MessageProps) => {
	console.log("element:", element);
	const messageBox = document.getElementById("message-box") as HTMLDivElement;
	if (messageBox) {
		const div = document.createElement("div");
		const messageReply = h(MessageReply, { author: getDisplayName(props.author), text: props.text || "", id: props.message.uuid, replyId: props.replyMessage?.uuid || element.dataset.messageId!, maxWidth: "full" });
		messageBox.prepend(div);
		render(messageReply, div);
	}
}
