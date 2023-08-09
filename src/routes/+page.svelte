<script lang="ts">
	import '$lib/global.css';
	import Header from '$lib/Header.svelte';
	import HowToVote from '$lib/HowToVote.svelte';
	import CopyMessage from '$lib/CopyMessage.svelte';
	import { onMount, tick } from 'svelte'
	import Footer from '$lib/Footer.svelte';
	import VotedLottie from '$lib/VotedLottie.svelte';
	import SuccessMessage from '$lib/SuccessMessage.svelte';
	import Candidates from '$lib/Candidates.svelte';
	import VoteForm from '$lib/VoteForm.svelte';
	import { isFormSubmitLoadingStore, isFormSubmittedStore } from '$lib/stores.ts';
	import ValidationSuccess from '$lib/ValidationSuccess.svelte';
	import { validateAddress, validateMessage } from '$lib/formValidation';

	let showMessage = false;
	let isValidated = false;
	let random = '';
	let validationError = { address: '', message: '', vote: '' };

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
		if (validationError.address || validationError.message || validationError.vote) {	
			console.log('validation error');
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
			isValidated = true;

		} else {
				alert('There was an error validating asset.');
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
			{#if !$isFormSubmittedStore}
				<HowToVote/>
			{/if}
			{#if !$isFormSubmittedStore && !isValidated}
				<CopyMessage random={random}/>
		
				<form method="POST" on:submit|preventDefault={validate}>
					<label>
							Signature
							<textarea id="signature" name="message" type="message" placeholder="Your Signature" bind:value={message} on:blur={() => validationError.message = validateMessage(message)}></textarea>
							{#if validationError.message}
								<div class="tooltip">
									{validationError.message}
								</div>
							{/if}
					</label>
					<label>
							Address
							<input id="input-address" name="address" type="address" placeholder="Your Wallet Address" bind:value={address} on:blur={() => validationError.address = validateAddress(address)}>
							{#if validationError.address}
								<div class="tooltip">
									{validationError.address}
								</div>
							{/if}
					</label>

					<button type="submit" class="validate-button">
						VALIDATE
					</button>
				</form>
			{/if}

			{#if isValidated && !$isFormSubmittedStore}
					<VoteForm>
					<ValidationSuccess/>
						<h2>Candidates</h2>
						<Candidates/>
					<button type="submit" class:loading={$isFormSubmitLoadingStore} class="vote-button">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
							VOTE
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>star</title><path d="M12.86,10.44L11,6.06L9.14,10.45L4.39,10.86L8,14L6.92,18.63L11,16.17L15.09,18.63L14,14L17.61,10.86L12.86,10.44M16.59,20.7L11,17.34L5.42,20.7L6.88,14.35L1.96,10.07L8.45,9.5L11,3.5L13.55,9.5L20.04,10.07L15.12,14.34L16.59,20.7Z" /></svg>
						</button>
					</VoteForm>
				{/if}

			{#if $isFormSubmittedStore}
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
		width: 100%;
		max-width: 550px;
	}
	input,
	textarea {
		border: 2px solid #00a228;
		background-color: #ffffffcf;
		color: #454545;
		transition: box-shadow 0.2s ease-in-out;
	}
	input::placeholder {
		color: #919191;
	}
	textarea {
		height: 200px;
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
		font-size: 1.3em;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
	.validate-button {
		border-color: #01ae2c;
		background-color: #057c23;
	}
	.validate-button:hover {
		border-color: #00ff40;
		background-color: #00b52d;
	}
	.vote-button {
		border-color: #b814ef;
		background-color: #8401B0;
	}
	.vote-button:hover {
		border-color: #ff00ff;
		background-color: #b814ef;
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
	button:focus {
		box-shadow: 0 0 7px 5px #00af17;
	}
	.tooltip {
		margin-bottom: 30px;
		background-color: #f4433689;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
	}
</style>