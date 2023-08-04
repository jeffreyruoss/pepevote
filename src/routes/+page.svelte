<script>
	import { onMount } from 'svelte'
	export let random = '';
	// Replace with list of candidates
	export const candidates = [
		'14GRxZmNCLHo5Uknr2XYnGA61Hh9uMULXV',
		'19h8nvZWqzpZnEufu611ZG6uZ5jYN1tytn',
		'1FX2EMcKqKQbxPeVSWTdnBwiCp7ijpc9qp'
	];

	onMount(async () => {
		random = self.crypto.randomUUID();
	});

	let address = '';
	let message = '';
	let vote = '';

	async function validate() {
		const response = await fetch('/api/server', {
			method: 'POST',
			body: JSON.stringify({ address, message, random, vote }),
			headers: {
				'content-type': 'application/json'
			}
		})
	}

	function copyToClipboard() {
		// @ts-ignore
		const copy = document.getElementById('message').innerHTML;
		navigator.clipboard.writeText(copy);
	}
</script>

<h1>Welcome to PepeVote</h1>
<p>Message: <span id="message">{random}</span><button on:click={() => (copyToClipboard())}>Copy</button></p>

<form method="POST" on:submit|preventDefault={validate}>
    <label>
        Address
        <input name="address" type="address" bind:value={address}>
    </label>
    <label>
        Message
        <input name="message" type="message" bind:value={message}>
    </label>

	{#each candidates as candidate}
		<label>
			<input
				type="radio"
				name="vote"
				value={candidate}
				bind:group={vote}
			/>
			{candidate}
		</label>
	{/each}
    <button type="submit">Vote</button>
</form>

