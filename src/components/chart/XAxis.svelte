<script>
  import { getContext } from 'svelte';
  export let scale;

  const { dimensions: dimensionsStore } = getContext('chart');
  $: dimensions = $dimensionsStore;

  const numberOfTicks = (pixelsAvailable, pixelsPerTick = 75) =>
    Math.floor(Math.abs(pixelsAvailable) / pixelsPerTick);

  $: [xMin, xMax] = scale.range();
  $: ticks = scale.ticks(numberOfTicks(xMax - xMin));
</script>

<g
  class="x-axis"
  transform={`translate(0 ${dimensions.boundedHeight + dimensions.marginTop})`}
>
  <line class="axis__line" x1={xMin} x2={xMax} y1={0} y2={0} />

  {#each ticks as tick}
    <g transform={`translate(${scale(tick)}  35)`}>
      <line class="axis__tick" y1={0} y2={6} />/>
      <text class="axis__text" y={8} dy="0.8em" text-anchor="middle">
        {tick}
      </text>
    </g>
  {/each}
</g>

<style>
  .axis__line {
    stroke: none;
  }
  .axis__tick {
    stroke: #808080;
  }
  .axis__text {
    fill: #808080;
  }
</style>
