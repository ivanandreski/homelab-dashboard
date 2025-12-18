<script lang="ts">
	const { data } = $props();
  const hardwareInfoHistoryEntries = $derived(data.hardwareInfoHistoryEntries);
</script>

<!-- TODO: fill graph with chart.js or something similar -->
<ul>
{#each hardwareInfoHistoryEntries as entry}
  <li>
    <strong>{new Date(entry.timestamp).toLocaleString()}:</strong>
    CPU Usage: {entry.hardwareInfo.cpu.usage}%, RAM Usage: {entry.hardwareInfo.memory.usage}%
  </li>
{/each}
</ul>