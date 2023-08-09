<script lang="ts">
	import { onMount } from 'svelte';
	import { candidatesStore } from '$lib/stores.ts';

	async function getCandidates() { 
		const response = await fetch('/api/server');
		const { data } = await response.json();
		const candidates = data.map((candidate) => {
			const { id, name } = candidate;
			return {
				id,
				name,
				hasVote: false
			}
		})
		candidatesStore.set(candidates);
	}

	onMount(async () => {
		await getCandidates();
	});
</script>

{#each $candidatesStore as $candidate}
	<label>
		<input type="checkbox" bind:checked={$candidate.hasVote} />
		{$candidate.name}
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