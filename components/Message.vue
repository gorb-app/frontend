<template>
	<div v-if="props.type == 'normal'" :id="props.last ? 'last-message' : undefined" class="message normal-message">
		<div class="left-column">
			<img v-if="props.img" class="message-author-avatar" :src="props.img" :alt="username" />
			<Icon v-else name="lucide:user" class="message-author-avatar" />
		</div>
		<div class="message-data">
			<div class="message-metadata">
				<span class="message-author-username" tabindex="0">
					{{ username }}
				</span>
				<span class="message-date" :title="date.toString()">
					{{ date.toLocaleTimeString(undefined, { timeStyle: "short" }) }}
				</span>
			</div>
			<div class="message-text" v-html="sanitized" tabindex="0"></div>
		</div>
	</div>
	<div v-else ref="messageElement" :id="props.last ? 'last-message' : undefined" class="message grouped-message" :class="{ 'message-margin-bottom': props.marginBottom }">
		<div class="left-column">
			<span :class="{ 'invisible': dateHidden }" class="message-date side-message-date" :title="date.toString()">
				{{ date.toLocaleTimeString(undefined, { timeStyle: "short" }) }}
			</span>
		</div>
		<div class="message-data">
			<div class="message-text" :class="$style['message-text']" v-html="sanitized" tabindex="0"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import DOMPurify from 'dompurify';
import { parse } from 'marked';

const props = defineProps<{
	class?: string,
	img?: string | null,
	username: string,
	text: string,
	timestamp: number,
	format: "12" | "24",
	type: "normal" | "grouped",
	marginBottom: boolean,
	last: boolean
}>();

const messageElement = ref<HTMLDivElement>();

const dateHidden = ref<boolean>(true);

const date = new Date(props.timestamp);

console.log("message:", props.text);
console.log("author:", props.username);

const sanitized = ref<string>();

onMounted(async () => {
	const parsed = await parse(props.text, { gfm: true });
	sanitized.value = DOMPurify.sanitize(parsed, { ALLOWED_TAGS: ["strong", "em", "br", "blockquote", "code", "ul", "ol", "li", "a", "h1", "h2", "h3", "h4", "h5", "h6"] });
	console.log("adding listeners")
	await nextTick();
	messageElement.value?.addEventListener("mouseenter", (e: Event) => {
		dateHidden.value = false;
	});

	messageElement.value?.addEventListener("mouseleave", (e: Event) => {
		dateHidden.value = true;
	});
	console.log("added listeners");
});

//function toggleTooltip(e: Event) {
//	showHover.value = !showHover.value;
//}

</script>

<style scoped>
.message {
	text-align: left;
	/* border: 1px solid lightcoral; */
	display: grid;
	grid-template-columns: 2rem 1fr;
	align-items: center;
	column-gap: 1dvw;
	width: 100%;
}

.message:hover {
	background-color: rgb(20, 20, 20);
}

.normal-message {
	margin-top: 1dvh;
}

.grouped-message {
	margin-top: .3em;
}

#last-message {
	margin-bottom: 2dvh;
}

.message-metadata {
	display: flex;
	gap: .5dvw;
	align-items: center;
}

.message-data {
	/* border: 1px solid white; */
	margin-left: .5dvw;
	display: flex;
	flex-direction: column;
	height: fit-content;
	width: 100%;
}

.message-author {
	display: flex;
	align-items: center;
}

.message-author-avatar {
	width: 100%;
	border-radius: 50%;
}

.left-column {
	min-width: 2rem;
	display: flex;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
}

.author-username {
	margin-right: .5dvw;
	color: white;
}

.message-date {
	font-size: .7em;
	color: rgb(150, 150, 150);
	cursor: default;
}

.side-message-date {
	font-size: .625em;
	display: flex;
	align-items: center;
	align-content: center;
}

/*
.message-date-tooltip {
	height: 20px;;
	width: 20px;
}
*/
</style>

<style module>
.message-text ul, h1, h2, h3, h4, h5, h6 {
	padding-top: 1dvh;
	padding-bottom: 1dvh;
	margin: 0;
}

.message-text ul  {
	padding-left: 2dvw;
}
</style>
