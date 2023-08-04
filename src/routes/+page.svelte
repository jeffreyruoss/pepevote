<script>
	export const random = '1234'
	let wallet = '';
	let message = '';
	let token = '';
	async function validate() {
		const response = await fetch('/api/server', {
			method: 'POST',
			body: JSON.stringify({ token }),
			headers: {
				'content-type': 'application/json'
			}
		})

		token = await response.json();
	}
</script>

<h1>Welcome to PepeVote</h1>
<p>Message: {random}</p>
<input bind:value={wallet} placeholder="wallet" />
<input bind:value={message} placeholder="signed message" />
<button on:click={() => (validate())}>Submit</button>