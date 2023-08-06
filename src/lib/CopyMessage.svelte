<script>
	export let random = '';
	function copyToClipboard() {
		// @ts-ignore
		const copy = document.getElementById('message').innerHTML;
		navigator.clipboard.writeText(copy);
	}
</script>

<div>
	<div class="label">
		<span>Message</span>
		<button on:click={() => (copyToClipboard())}>
			Copy to clipboard 
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clipboard-outline</title><path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z" /></svg>
		</button>
	</div>
	<input id="message" value="{random}" readonly/>

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
		/* margin-bottom: 0; */
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
	button:focus {
		outline: none;
	}
	svg {
		margin-left: 0.2em;
		width: 20px;
		height: 20px;
		fill: rgb(187, 198, 206);
	}
</style>