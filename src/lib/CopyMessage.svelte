<script lang="ts">
	import { onDestroy } from 'svelte';
	export let random = '';
	let showCheckIcon = false;
	// @ts-ignore
	let timeout;

	function copyToClipboard() {
		const messageInput = document.getElementById('message');
		// @ts-ignore
		const copy = messageInput.value;
		navigator.clipboard.writeText(copy);
		// @ts-ignore
		document.getElementById('message').focus();
		showCheckIcon = true;
		const timeout = setTimeout(() => {
			showCheckIcon = false;
		}, 3000);
	}

	onDestroy(() => {
		// @ts-ignore
		clearTimeout(timeout);
	});
</script>

<div>
	<div class="label">
		<span>Message</span>
		<button on:click={() => (copyToClipboard())}>
			Copy to clipboard 
			{#if showCheckIcon}
				<svg class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
			{:else}
				<svg class="clipboard-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clipboard-outline</title><path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z" /></svg>
			{/if}
		</button>
	</div>
	<input id="message" value="{random}"/>
</div>

<style>
	.label {
		margin-bottom: 0.3em;
	}
	input {
		border-color: #3a543b;
		background-color: #000;
		color: #4b784e;
	}
	.label {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
	button {
		margin-bottom: 0;
		padding: 15px 0 0 0;
		border: none;
		width: 170px;
		height: 35px;
		background-color: transparent;
		font-size: 0.8em;
		color: rgb(187, 198, 206);
		transition: opacity 0.2s ease-in-out;
		display: flex;
		justify-content: flex-end;
	}
	@media (min-width: 768px) {
		button {
			height: 40px;
		}
	}
	button:hover {
		opacity: 0.7;
	}
	svg {
		margin-top: 0.2em;
		margin-left: 0.2em;
		width: 18px;
		height: 18px;
		fill: rgb(187, 198, 206);
	}
	.check-icon {
		fill: green;
	}
</style>