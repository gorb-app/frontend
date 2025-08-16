import { render } from "vue";
import MessageReply from "~/components/UserInterface/MessageReply.vue";
import type { MessageProps } from "~/types/props";

const { getDisplayName } = useProfile()

export default (element: HTMLDivElement, props: MessageProps) => {
	console.log("element:", element);
	const messageBox = document.getElementById("message-box") as HTMLDivElement;
	if (messageBox) {
		const div = document.createElement("div");
		const messageReply = h(MessageReply, { author: getDisplayName(props.message.member), text: props.message.message || "", id: props.message.uuid, replyId: props.replyMessage?.uuid || element.dataset.messageId!, maxWidth: "full" });
		messageBox.prepend(div);
		render(messageReply, div);
		const message = document.querySelector(`.message[data-message-id='${props.message.uuid}']`);
		if (message) {
			message.classList.add("replying-to");
		}
	}
}
