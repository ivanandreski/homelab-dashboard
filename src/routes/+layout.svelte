<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/"><strong>Dashboard</strong></a> |
	<a href="/hardware-monitor-history"><strong>Hardware Monitor History</strong></a>
</nav>

{@render children()}
