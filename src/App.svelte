<script>
  import BumpChart from './components/BumpChart.svelte';
  import Scrolly from './components/Scrolly.svelte';
  import Step from './components/Step.svelte';
  import { margins, isScreenSmall } from './stores/store.js';
  import { foodData } from '../public/data/foodData.js';
  import { stepData } from '../public/data/stepData.js';

  let currentStep;
  let graphicWidth;
  let graphicHeight;
  let stepWidth;

  const handleWindowResize = () => {
    $isScreenSmall = window.innerWidth <= 900;

    $margins = {
      top: $isScreenSmall ? 20 : 25,
      bottom: $isScreenSmall ? 20 : 25,
      left: $isScreenSmall ? 50 : 25,
      right: $isScreenSmall ? 50 : 25,
    };
  };

  $: graphicWidth = graphicWidth - $margins.left - $margins.right;
  $: graphicHeight = graphicHeight - $margins.top - $margins.bottom;

  handleWindowResize();
</script>

<svelte:window on:resize={handleWindowResize} />

<a href="http://taiwandatastories.com/" target="_blank">
  <img id="logo" src="./img/logo.svg" alt="Taiwan Data Stories logo" />
</a>

<div class="scroller">
  <div
    class="scroll-graphic"
    bind:clientWidth={graphicWidth}
    bind:clientHeight={graphicHeight}
  >
    <h2>Popularity ranking over time</h2>
    {#if foodData && graphicWidth && graphicHeight}
      <BumpChart {foodData} {currentStep} {graphicWidth} {graphicHeight} />
    {/if}
  </div>
  <section class="scroll-scenes" bind:clientWidth={stepWidth}>
    <Scrolly bind:value={currentStep}>
      {#each stepData as stepContent, i}
        <Step {i} {stepContent} {currentStep} {stepWidth} />
      {/each}
    </Scrolly>
  </section>
</div>

<style>
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('../fonts/source-sans-pro-v21-latin-regular.woff2') format('woff2'),
      url('../fonts/source-sans-pro-v21-latin-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 700;
    src: local(''),
      url('../fonts/source-sans-pro-v21-latin-700.woff2') format('woff2'),
      url('../fonts/source-sans-pro-v21-latin-700.woff') format('woff');
  }
  :root {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    color: #333333;
    background: #fdfbf9;
  }
  :global(a) {
    color: #837552;
    text-decoration: underline;
  }
  :global(a:hover) {
    transition: all 0.3s ease;
    cursor: pointer;
    color: #837552;
    font-weight: 700;
  }
  h2 {
    color: #837552;
    font-weight: 400;
    font-size: 20px;
  }
  #logo {
    position: fixed;
    bottom: 0;
    right: 5px;
    width: 50px;
    z-index: 10;
    padding: 15px;
  }
  .scroller {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: flex-start;
  }
  .scroll-graphic {
    grid-column: 2;
    position: -webkit-sticky;
    position: sticky;
    height: 100vh;
    top: 0;
  }
  .scroll-scenes {
    grid-row: 1;
    grid-column: 1;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-right: 10px;
  }

  @media only screen and (max-width: 900px) {
    .scroller {
      grid-template-columns: 1fr;
      grid-template-rows: 2fr;
    }
    .scroll-scenes {
      grid-row: 1;
      z-index: 2;
      margin-left: auto;
      margin-right: auto;
      border: none;
    }
    .scroll-graphic {
      grid-column: 1;
      grid-row: 1;
      position: -webkit-sticky;
      position: sticky;
      padding-top: 5vh;
      height: 90vh;
      top: 0;
      transition: 1s ease-out;
    }
  }
</style>
