<script>
	export let show = false;
</script>

{#if show}
	<div class="success-message">
		Thank you for voting!<br>
		Your vote has been successfully submitted.
	</div>
{/if}

<style>
	.success-message {
		margin-bottom: 15px;
		text-align: center;
	}
</style>
