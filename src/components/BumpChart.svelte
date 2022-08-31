<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import * as d3 from 'd3';
  import XAxis from './chart/XAxis.svelte';
  import Line from './chart/Line.svelte';
  import { isScreenSmall } from '.././stores/store.js';

  export let foodData;
  export let currentStep;
  export let graphicWidth;
  export let graphicHeight;

  const timeSpan = foodData[0].data[0].values.length;

  const xAccessor = d => +d.year;
  const yAccessor = d => +d.rank;

  let highlightedFood = 'all';

  const inactiveColor = '#808080';

  $: width = graphicWidth;
  $: height = graphicHeight;

  $: margins = {
    marginTop: 40,
    marginRight: $isScreenSmall ? 10 : 160,
    marginBottom: 100,
    marginLeft: 70,
  };

  $: dimensions = {
    width,
    height,
    ...margins,
    boundedHeight: Math.max(
      height - margins.marginTop - margins.marginBottom,
      0,
    ),
    boundedWidth: Math.max(width - margins.marginLeft - margins.marginRight, 0),
  };

  $: xScale = d3
    .scaleLinear()
    .domain(d3.extent(foodData[0].data[0].values, xAccessor))
    .range([dimensions.marginLeft, dimensions.boundedWidth]);

  $: yScale = d3
    .scaleLinear()
    .domain([1, 5])
    .range([dimensions.marginTop, dimensions.boundedHeight]);

  $: yScaleInitial = d3
    .scaleLinear()
    .domain([1, 5])
    .range([dimensions.marginTop, dimensions.boundedHeight / 2]);

  $: xAccessorScaled = d => xScale(xAccessor(d));
  $: yAccessorScaled = d => yScale(yAccessor(d));
  $: yAccessorInitialScaled = d => yScaleInitial(yAccessor(d));

  const tweenOptions = {
    delay: 0,
    duration: 500,
    easing: cubicOut,
  };

  const move = (x, y) => `transform: translate(${x}px, ${y}px)`;

  $: downSavory = tweened(0);
  $: downSweet = tweened(
    dimensions.boundedHeight / 2 + dimensions.marginTop,
    tweenOptions,
  );

  let currentDimensions = writable(dimensions);

  $: {
    currentDimensions.set(dimensions);
  }

  setContext('chart', {
    dimensions: currentDimensions,
  });

  //update y scale
  $: currentYAccessor = yAccessorInitialScaled;
  $: currentYScale = yScaleInitial;
  $: imgTranslate = 0;

  const setHighlight = currentFood => {
    highlightedFood = currentFood;
    d3.select(`#${currentFood.split(' ').join('-')}`).raise();
    d3.selectAll(`.${currentFood.split(' ').join('-')}-circle`).raise();
  };

  const colorElement = (dish, highlightedFood) => {
    return highlightedFood == 'all' || highlightedFood == dish.name
      ? dish.color
      : inactiveColor;
  };

  const setBackgroundRadius = (size, step) => {
    if (size) {
      if (step == 0) {
        return 20;
      } else return 30;
    } else {
      if (step == 0) {
        return 30;
      } else return 40;
    }
  };

  const setImageSize = (size, step) => {
    if (size) {
      if (step == 0) {
        return 60;
      } else return 100;
    } else {
      if (step == 0) {
        return 80;
      } else return 120;
    }
  };

  //Steps
  $: {
    if (currentStep == 0) {
      downSweet.set(dimensions.boundedHeight / 2 + dimensions.marginTop);
      currentYAccessor = yAccessorInitialScaled;
      currentYScale = yScaleInitial;
      imgTranslate = 0;
    }
    if (currentStep == 1) {
      downSweet.set(
        dimensions.boundedHeight +
          dimensions.marginTop +
          dimensions.marginBottom,
      );
      currentYAccessor = yAccessorScaled;
      currentYScale = yScale;
      imgTranslate = (currentYScale(2) - currentYScale(1)) / 2;
      highlightedFood = 'all';
    }
    if (currentStep == 2) {
      setHighlight('Popcorn chicken');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
      //make sure the images are over the lines
    }
    if (currentStep == 3) {
      setHighlight('Stinky tofu');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 4) {
      setHighlight('Taiwanese meatball');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 5) {
      setHighlight('Fried chicken');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 6) {
      setHighlight('Scallion pancake');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
      downSweet.set(
        dimensions.boundedHeight +
          dimensions.marginTop +
          dimensions.marginBottom,
      );
      downSavory.set(0);
    }
    if (currentStep == 7) {
      highlightedFood = 'all';
      downSweet.set(0);
      downSavory.set(
        0 -
          dimensions.boundedHeight -
          dimensions.marginTop -
          dimensions.marginBottom,
      );
    }
    if (currentStep == 8) {
      setHighlight('Douhua');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 9) {
      setHighlight('Fried sweet potato balls');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 10) {
      setHighlight('Boba tea');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 11) {
      setHighlight('Papaya milk');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
    if (currentStep == 12) {
      setHighlight('Shaved ice');
      d3.selectAll('.savoryGroup, .sweetGroup').selectAll('image').raise();
    }
  }
</script>

<div class="wrapper" bind:clientWidth={width} style="height: {height}px">
  <svg class="chart" width={dimensions.width} height={dimensions.height}>
    <g>
      <XAxis scale={xScale} />
      {#each foodData as foodType, index}
        <g
          class="{foodData[index].type}Group"
          style={index === 1 ? move(0, $downSweet) : move(0, $downSavory)}
        >
          {#each foodType.data as dish}
            <Line
              {dish}
              {xAccessorScaled}
              {currentYAccessor}
              {timeSpan}
              color={colorElement(dish, highlightedFood)}
            />
            {#each dish.values as d, i}
              {#if i > 0 && i < timeSpan - 1}
                <circle
                  class={`chart__point ${dish.name
                    .split(' ')
                    .join('-')}-circle`}
                  r={$isScreenSmall ? '5' : '7'}
                  cx={xAccessorScaled(d)}
                  cy={currentYAccessor(d)}
                  fill={colorElement(dish, highlightedFood)}
                />
              {:else}
                <circle
                  class="chart_background"
                  r={setBackgroundRadius($isScreenSmall, currentStep)}
                  cx={xAccessorScaled(d)}
                  cy={currentYAccessor(d)}
                  fill={dish.color}
                />
                <image
                  class="chart_image"
                  width={setImageSize($isScreenSmall, currentStep)}
                  height={setImageSize($isScreenSmall, currentStep)}
                  x={xAccessorScaled(d) -
                    setImageSize($isScreenSmall, currentStep) / 2}
                  y={currentYAccessor(d) -
                    setImageSize($isScreenSmall, currentStep) / 2}
                  xlink:href={`./img/${dish.name.split(' ').join('_')}.png`}
                />
              {/if}
            {/each}
          {/each}
        </g>
      {/each}
    </g>
  </svg>
</div>

<style>
  .chart__point {
    stroke: #ffffff;
    stroke-width: 2px;
  }

  .chart_background {
    opacity: 0.2;
  }

  image {
    transition: width 0.5s ease;
    transition: height 0.5s ease;
  }
</style>
