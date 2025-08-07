<template>
  <div :id="props.maxWidth == 'full' ? 'message-reply' : undefined" :class="{ 'message-reply-preview' : props.maxWidth == 'reply' }"
  		:data-message-id="props.id" @click="scrollToReply">
    <span id="reply-text">Replying to <span id="reply-author-field">{{ props.author }}:</span> <span v-html="sanitized"></span></span>
	<!-- <span id="message-reply-cancel"><Icon name="lucide:x" /></span> -->
  </div>
</template>

<script lang="ts" setup>

import DOMPurify from "dompurify";
import { parse } from "marked";

const props = defineProps<{ author: string, text: string, id: string, replyId: string, maxWidth: "full" | "reply" }>();

const existingReply = document.getElementById("message-reply");

if (existingReply) {
	existingReply.remove();
}

console.log("text:", props.text);

const sanitized = ref<string>();

onMounted(async () => {
	
	const parsed = await parse(props.text.trim().replaceAll("<br>", " "), { gfm: true });
	
	sanitized.value = DOMPurify.sanitize(parsed, {
		ALLOWED_TAGS: [],
		ALLOW_DATA_ATTR: false,
		ALLOW_SELF_CLOSE_IN_ATTR: false,
		ALLOWED_ATTR: [],
		KEEP_CONTENT: true
	});
	
	console.log("sanitized:", sanitized.value);

	const messageBoxInput = document.getElementById("message-textbox-input") as HTMLDivElement;
	if (messageBoxInput) {
		messageBoxInput.focus();
	}
});

function scrollToReply(e: MouseEvent) {
	e.preventDefault();
	console.log("clicked on reply box");
	let replyId: string;
	if (props.maxWidth == "reply") {
		replyId = props.replyId;
	} else {
		replyId = props.id;
	}
	const reply = document.querySelector(`.message[data-message-id="${replyId}"]`);
	if (reply instanceof HTMLDivElement) {
		console.log("reply:", reply);
		console.log("scrolling into view");
		reply.scrollIntoView({ behavior: "smooth", block: "center" });
		reply.style.transition = "background-color .3s";
		reply.style.backgroundColor = "var(--chat-featured-message-color)";
		setTimeout(() => {
			reply.style.backgroundColor = "";
		}, 1000);
	}
}

</script>

<style scoped>

#message-reply, .message-reply-preview {
	display: flex;
	text-align: left;
	margin-bottom: .5rem;
	cursor: pointer;
	overflow: hidden;
}

#message-reply {
	width: 100%;
}

.message-reply-preview {
	margin-left: .5dvw;
}

#reply-text {
	color: var(--reply-text-color);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 0;
	margin-top: .2rem;
	border-bottom: 1px solid var(--padding-color);

}

#reply-author-field {
	color: var(--text-color);
}

</style>