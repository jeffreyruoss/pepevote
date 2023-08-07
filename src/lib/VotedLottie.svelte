<script>
	import lottie from 'lottie-web';
	import animationData from './voted.json';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let votedLottie;
	let animation;

	onMount( async () => {
		animation = lottie.loadAnimation({
			container: votedLottie,
			animationData,
			loop: false,
			autoplay: true,
		});

		animation.addEventListener('complete', () => {
			console.log("Animation completed!");
			dispatch('votedLottieComplete');
			animation.destroy();
		});
	});
</script>

<div bind:this={votedLottie}></div>