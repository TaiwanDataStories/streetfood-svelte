<script>
  export let scale;

  $: [yMin, yMax] = scale.range();

  const ticks = scale.ticks(5);
</script>

<g class="y-axis">
  <line class="axis__line" x1={0} x2={0} y1={yMin} y2={yMax} />

  {#each ticks as tick}
    <g transform={`translate(0 ${scale(tick)})`}>
      <line class="axis__tick" x1={0} x2={-6} />
      <text class="axis__text" dx={-35} dy="0.34em" text-anchor="end">
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
    stroke: none;
  }
  .axis__text {
    fill: #837552;
    font-weight: 700;
  }
</style>
