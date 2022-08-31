<script>
  export let currentStep;
  export let i;
  export let stepContent;
  export let stepWidth;
</script>

<div class="step" class:active={currentStep === i} style="width: {stepWidth}px">
  <h2>{stepContent.h2}</h2>
  <!-- svelte-ignore a11y-missing-attribute -->
  <img
    class={stepContent.image === '' ? 'none' : 'block headerImg'}
    src={stepContent.image === '' ? '' : `img/${stepContent.image}`}
  />
  <h1 class={stepContent.image === '' ? '' : 'title'}>{stepContent.h1}</h1>
  <p class="byline">{@html stepContent.byline}</p>
  {#each stepContent.p as pContent}
    <p>{@html pContent}</p>
  {/each}
</div>

<style>
  .none {
    display: none;
  }
  .block {
    display: block;
  }
  .headerImg {
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .title {
    font-weight: 700;
    text-align: center;
  }
  .byline {
    font-size: 16px;
    text-align: center;
    margin: 10px auto 20px auto;
    color: #837552;
  }

  .step {
    height: auto;
    padding: 30px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
    min-height: 50vh;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.85);
  }
  .step h1 {
    font-size: 2em;
  }
  .step p {
    font-size: 1.1rem;
    text-align: justify;
    line-height: 1.6rem;
  }
  .step.active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  .step img {
    max-width: 350px;
    margin: 20px auto;
    display: block;
    width: 100%;
  }
  @media only screen and (max-width: 900px) {
    .step {
      margin-bottom: 100vh;
      border-radius: 15px;
      max-width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media only screen and (max-width: 600px) {
    .step {
      max-width: 80%;
    }
  }
</style>
