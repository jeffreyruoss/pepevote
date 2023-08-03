<script>
	let name = '';
</script>

<h1>Welcome to PepeVote</h1>

<input bind:value={name} placeholder="enter your name" />
<p>Hello {name || 'stranger'}!</p>