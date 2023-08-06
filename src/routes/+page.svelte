<script lang="ts">
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
						<input id="input-address" name="address" type="address" placeholder="Your Wallet Address" bind:value={address}>
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
				<button type="submit">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					VOTE
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
				</button>
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
		display: flex;
		align-items: center;
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
		border: 2px solid #00a228;
		background-color: #ffffffcf;
		color: #454545;
		transition: box-shadow 0.2s ease-in-out;
	}
	input::placeholder {
		color: #919191;
	}
	input[type=radio] {
		border-color: #8401B0;
		border-color: #00a228;
	}
	h2 {
		margin-top: 15px;
		margin-bottom: 5px;
		color: #ffffffd0;
		font-size: 1.6em;
		font-weight: 500;
	}
	button {
		margin-top: 30px;
		background-color: #8400af;
		border-color: #bf00ff;
		font-size: 1.3em;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	button svg {
		padding: 0 0 3px 2px;
		width: 30px;
		height: 30px;
		fill: #ffffff;
		opacity: 0.5;
	}
	button:hover svg {
		animation: rotate 3s linear infinite;
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	button:hover {
		background-color: #bf00ff;
	}
	button:focus {
		box-shadow: 0 0 7px 5px #00af17;
	}
</style>
