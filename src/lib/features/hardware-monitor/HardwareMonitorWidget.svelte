<script lang="ts">
	import ProgressBar from '@/lib/components/ProgressBar.svelte';
	import type { HardwareInfo, CPUInfo, MemoryInfo } from '@/types/hardware-types';
	import { source } from 'sveltekit-sse';

	const hardwareInfoMessage = source('/sse/hardware-info').select('hardware-info');
	let hardwareInfo: HardwareInfo | undefined = $state();

	$effect(() => {
		// TODO: Handle this initial state and errors better
		if ($hardwareInfoMessage.length > 0) {
			hardwareInfo = JSON.parse($hardwareInfoMessage || '{}');
		}
	});

	const memoryFromKBToGb = (kilobytes: number): number => {
		return parseFloat((kilobytes / 1024 / 1024).toFixed(2));
	};
</script>

<div class="widget">
	<h2>Hardware Monitor</h2>
	{#if hardwareInfo}
		{@render cpuUsage(hardwareInfo.cpu)}
		{@render memoryUsage(hardwareInfo.memory)}
	{/if}
</div>

{#snippet cpuUsage(cpu: CPUInfo)}
	<div class="cpu-usage">
		<div>
			<strong>CPU Usage:</strong>
			{cpu.usage}%
			<ProgressBar value={cpu.usage} />
		</div>
		{#each cpu.coresUsage as coresUsage, index}
			<div>
				<strong>Core {index} Usage:</strong>
				{coresUsage}%
				<ProgressBar value={coresUsage} />
			</div>
		{/each}
		<!-- <div>
			<strong>CPU Temp:</strong>
			{cpu.temperature}°C
		</div> -->
	</div>
{/snippet}

{#snippet memoryUsage(memory: MemoryInfo)}
	<div class="memory-usage">
		<strong>Memory Usage:</strong>
		{memoryFromKBToGb(memory.usage)} GB / {memoryFromKBToGb(memory.total)} GB
		<ProgressBar value={(memory.usage / memory.total) * 100} />
	</div>
{/snippet}
