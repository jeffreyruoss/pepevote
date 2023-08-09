<script>
	import { onMount } from 'svelte';
	import { candidatesStore } from '$lib/stores.ts';

	async function getCandidates() { 
		const candidates = await fetch('/api/server');
		const { data } = await candidates.json();
		candidatesStore.set(data);
	}

	onMount(async () => {
		await getCandidates();
	});
</script>

{#each $candidatesStore as candidate}
	<label>
		<input type="checkbox" value="true" data-id={candidate.id} checked />
		{candidate.name}
	</label>
{/each}

<style>
	input[type="checkbox"] {
		background-color: white;
		border-color: #04A228;
	}
	input[type="checkbox"]:checked {
		background-color: #04A228;
	}
</style>