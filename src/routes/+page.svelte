<script lang="ts">
	import '$lib/global.css';
	import Header from '$lib/Header.svelte';
	import CopyMessage from '$lib/CopyMessage.svelte';
	import { onMount, tick } from 'svelte'
	import Footer from '$lib/Footer.svelte';
	import VotedLottie from '$lib/VotedLottie.svelte';
	import SuccessMessage from '$lib/SuccessMessage.svelte';
	import Candidates from '$lib/Candidates.svelte';
	let isFormSubmitted = false;
	let isSubmitLoading = false;
	let showMessage = false;
	let isValidated = false;
	let random = '';

	onMount(async () => {
		random = self.crypto.randomUUID();
	});

	let address = '';
	let message = '';
	let vote = '';

	function handleAnimationComplete() {
        showMessage = true;
    }

	async function validate() {
		isSubmitLoading = true;
		if (!address.trim() || !message.trim()) {
        alert('All fields are required. Please ensure you have entered your signature, wallet address, and selected a candidate.');
        return;
    }
		
		const response = await fetch('/api/server', {
			method: 'POST',
			body: JSON.stringify({ address, message, random }),
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
    	isFormSubmitted = true;
			isValidated = true;

		} else {
				alert('There was an issue submitting your vote. Please try again later.');
		}
	}
</script>

<svelte:head>
  <meta name="description" content="Pepe Vote">
</svelte:head>

<div class="wrap">
	<Header/>
	<main>
		<article>
			{#if !isFormSubmitted}
				<CopyMessage random={random}/>
		
				<form method="POST" on:submit|preventDefault={validate}>
					<label>
							Signature
							<input id="signature" name="message" type="message" placeholder="Your Signature" bind:value={message}>
					</label>
					<label>
							Address
							<input id="input-address" name="address" type="address" placeholder="Your Wallet Address" bind:value={address}>
					</label>
		
					{#if isValidated}
						<h2>Candidates</h2>
						<Candidates/>
					{/if}

					<button type="submit" class:loading={isSubmitLoading}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						VOTE
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
					</button>
				</form>
			{/if}

			{#if isFormSubmitted}
				<VotedLottie on:votedLottieComplete={handleAnimationComplete} />
				<SuccessMessage show={showMessage} />
			{/if}
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
	button.loading svg {
		animation: rotate 3s linear infinite !important;
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
	.success-message {
		margin-top: 0px;
		margin-bottom: 15px;
		color: #ffffffd0;
		font-size: 1.3em;
		text-align: center;
	}
</style>
