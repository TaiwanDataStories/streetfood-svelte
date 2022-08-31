<script>
  import * as d3 from 'd3';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  export let dish;
  export let xAccessorScaled;
  export let currentYAccessor;
  export let timeSpan;
  export let color;
  import { isScreenSmall } from '../../stores/store.js';

  $: lineGenerator = d3
    .line()
    .x(xAccessorScaled)
    .y(currentYAccessor)
    .curve(d3.curveMonotoneX);

  const tweenOptions = {
    delay: 0,
    duration: 500,
    easing: cubicOut,
  };

  $: tweenLine = tweened(lineGenerator(dish.values), tweenOptions);

  const dishXPadding = 55;

  const rankXPadding = -55;
</script>

<path
  class="line"
  id={dish.name.split(' ').join('-')}
  d={$tweenLine}
  stroke={color}
  stroke-width={$isScreenSmall ? '8' : '10'}
/>

{#if !$isScreenSmall}
  <text
    class="line__label"
    x={xAccessorScaled(dish.values[timeSpan - 1]) + dishXPadding}
    y={currentYAccessor(dish.values[timeSpan - 1])}
    dy="0.34em"
    text-anchor="start"
  >
    {dish.name}
  </text>
{/if}

<text
  class="line__label"
  x={xAccessorScaled(dish.values[0]) + rankXPadding}
  y={currentYAccessor(dish.values[0])}
  dy="0.34em"
  text-anchor="start"
>
  {dish.values[0].rank}
</text>

<style>
  .line {
    fill: none;
    opacity: 0.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .line__label {
    fill: #837552;
    opacity: 0.5;
    font-weight: 700;
    font-size: 15px;
  }
</style>
