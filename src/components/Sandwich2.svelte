<script>
  import { createEventDispatcher } from "svelte";
  import Ingredient from "./Ingredient.svelte";
  export let id;
  export let index;
  export let name;
  export let ingredients;
  export let description;
  export let love;
  export let hate;

  const ingredientsArr = ["peanut butter"].concat(
    ingredients
      .split(",")
      .map((d) => d.trim())
      .filter((d) => d)
  );

  const dispatch = createEventDispatcher();

  const onClick = (value, id) => {
    dispatch("rate", { value, id });
  };

  $: alt = index % 2 === 0;
</script>

<div class="sandwich" id="{id}" data-id="{id}" class:alt>
  <!-- <p class="sandwich"><img src="assets/sandwiches/test.jpg" alt="test" /></p> -->
  <div class="name">
    <p><strong>{name}</strong></p>
    <p class="rate">
      <!-- <span>{love}%</span> -->
      <button on:click="{() => onClick('love', id)}">🤤</button>
      <!-- <span>{hate}%</span> -->
      <button on:click="{() => onClick('hate', id)}">🤮</button>
    </p>
  </div>
  <ul class="ingredients">
    {#each ingredientsArr as name, i}
      <li>
        <Ingredient
          alt="{alt}"
          name="{name}" />{#if i < ingredientsArr.length - 1}<span>+</span>{/if}
      </li>
    {/each}
  </ul>
  <p class="description">{description}</p>
  <!-- <h3>{name}</h3> -->
  <!-- <p>{ingredients}</p> -->

  <!-- <p>{love} - {hate}</p> -->
</div>

<style>
  .sandwich {
    display: inline;
    margin: 0;
    line-height: 120px;
    margin-right: 1em;
    background: var(--primary);
  }

  .name {
    display: inline;
  }

  .alt {
    background: var(--secondary);
  }

  p {
    display: inline;
    font-size: 2em;
    vertical-align: middle;
    padding: 1em 0.5em;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    background: var(--bg);
    /* background: var(--primary); */
    /* border-radius: 4px; */
  }

  .alt p {
    /* background: var(--secondary); */
  }

  .name {
    position: relative;
    /* background: var(--primary); */
    background: var(--bg);
    padding: 1em 0.5em;
    /* font-size: 2.5em; */
    text-shadow: 2px 2px 0px var(--primary);
    /* border: 4px solid var(--primary); */
  }

  .alt .name {
    background: var(--bg);
    /* background: var(--secondary); */
    text-shadow: 2px 2px 0px var(--secondary);
    /* border: 4px solid var(--secondary); */
  }

  /* img {
    display: inline-block;
    width: 160px;
    height: auto;
    margin-bottom: -80px;
    border: 4px solid var(--fg);
  } */

  img {
    display: none;
  }

  ul {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }

  li {
    list-style-type: none;
    display: inline-flex;
    align-items: center;
  }

  li:first-of-type {
    filter: grayscale(100%);
    /* opacity: 0.33; */
  }

  p {
    /* margin-right: 0.5em; */
  }

  .rate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 1.5em;
    padding: 0;
    background: transparent;
    /* padding-left: 1em; */
    /* transform: translate(-50%, 0); */
    text-align: center;
  }

  button {
    padding: 0.25em 0.5em;
  }
</style>
