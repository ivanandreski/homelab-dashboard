<script lang="ts">
	const { value } = $props();
	const progressValue = $derived(value);

	function colorClassFor(percentage: number) {
    // Green
		if (percentage <= 50) return '#3cb371';
    // Yellow
		if (percentage > 50 && percentage < 75) return '#f1c40f';
    // Orange
		if (percentage >= 75 && percentage < 90) return '#e67e22';
    // Red
		return '#e74c3c';
	}

	const fillClass = $derived(colorClassFor(progressValue));
</script>

<div class="progress-bar">
	<div
		class="progress-bar-fill"
		style:width="{progressValue}%"
		style:background-color={fillClass}
	></div>
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 2em;
		background-color: white;
		border: 1px solid gray;
		border-radius: 5px;
		overflow: hidden;
	}

	/* TODO: make this color customisable */
	.progress-bar-fill {
		height: inherit;
		transition: width 300ms ease-in-out;
	}
</style>
