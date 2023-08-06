<script>
	import Header from '$lib/Header.svelte';
	import CopyMessage from '$lib/CopyMessage.svelte';
	import { onMount } from 'svelte'
	import Footer from '$lib/Footer.svelte';
	let random = '';
	// Replace with list of candidates
	const candidates = [
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
</script>

<svelte:head>
  <meta name="description" content="Pepe Vote">
</svelte:head>

<div class="wrap">
	<Header/>
	<main>
		<article>
			<CopyMessage random={random}/>
	
			<form method="POST" on:submit|preventDefault={validate}>
				<label>
						Address
						<input name="address" type="address" placeholder="Your Wallet Address" bind:value={address}>
				</label>
				<label>
						Signature
						<input name="message" type="message" placeholder="Your Signature" bind:value={message}>
				</label>
	
			<h2>Candidates</h2>
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
				<button type="submit">VOTE</button>
		</form>
		</article>
	</main>
	<Footer/>
</div>

<style>
	.wrap {
		background-image: url('../lib/rarepepes-bg.gif');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		min-height: 100vh;
		display: grid;
    grid-template-rows: auto 1fr auto;
	}
	main {
		padding-left: 15px;
		padding-right: 15px;
	}
	article {
		margin-left: auto;
		margin-right: auto;
		border-radius: 30px;
		padding: 30px 30px 15px 30px;
		background-color: rgba(0, 0, 0, 0.85);
		max-width: 600px;
	}
	input {
		border-color: #00e33d;
		background-color: #ffffffcf;
		color: #8A0A53;
	}
	input::placeholder {
		color: #4b784eb6;
	}
	h2 {
		margin-top: 15px;
		margin-bottom: 5px;
		color: #ffffffd0;
		font-size: 1.6em;
		font-weight: 500;
	}
	button[type=submit] {
		margin-top: 30px;
		background-color: #8a0b53;
		border-color: #ff0090;
		font-size: 1.3em;
	}
</style>
