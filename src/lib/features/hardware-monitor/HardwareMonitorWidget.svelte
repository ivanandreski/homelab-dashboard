<script lang="ts">
  let cpuPercentage = $state<number>(35);
  let memoryUsage = $state<number>(4.3);
  const memoryMax = 16;

  $effect(() => {
    const interval = setInterval(() => {
      cpuPercentage = (Math.floor(Math.random() * 100));
      memoryUsage = parseFloat((Math.random() * memoryMax).toFixed(1));
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div>
  <h2>Hardware Monitor</h2>
  <div>
    <strong>CPU Usage:</strong> {cpuPercentage}%
  </div>
  <div>
    <strong>Memory Usage:</strong> {memoryUsage} GB / {memoryMax} GB
  </div>
</div>