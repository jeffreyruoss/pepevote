<script>
	import { candidatesStore } from '$lib/stores.ts';
	import { isFormSubmittedStore } from '$lib/stores.ts';
	import { get } from 'svelte/store';

	async function submitVote() {
		console.log(get(candidatesStore))
		const response = await fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify({ "votes": get(candidatesStore) }) ,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		if (response.ok) {
			isFormSubmittedStore.set(true);
		}
	}
</script>

<form method="POST" on:submit|preventDefault={submitVote}>
	<slot />
</form>
