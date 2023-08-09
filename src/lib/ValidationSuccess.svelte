<script>
	import { fade } from 'svelte/transition';
	let showValidation = true;

	setTimeout(() => {
		showValidation = false;
	}, 3000);
</script>

<div class="contain">
	{#if showValidation}
		<p class="you-are-valid" in:fade>You are Valid!</p>
	{:else}
		<p class="proceed" in:fade>Proceed with your vote.</p>
	{/if}
</div>

<style>
	.contain {
		height: 70px;
	}
	p {
		color: #08E33D;
		font-size: 1.5em;
	}
</style>
