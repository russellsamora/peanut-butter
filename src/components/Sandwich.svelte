<script>
  import { createEventDispatcher } from "svelte";
  import Ingredient from "./Ingredient.svelte";
  export let id;
  export let name;
  export let ingredients;
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
</script>

<div id="{id}" data-id="{id}">
  <!-- <h3>{name}</h3> -->
  <!-- <p>{ingredients}</p> -->
  <div class="rate">
    <!-- <p>Have you eaten this sandwich?</p> -->
    <button on:click="{() => onClick('love', id)}">🤤</button>
    <button on:click="{() => onClick('hate', id)}">🤮</button>
  </div>
  <ul>
    {#each ingredientsArr as name, i}
      <li>
        <Ingredient name="{name}" />{#if i < ingredientsArr.length - 1}
          <span>+</span>
        {/if}
      </li>
    {/each}
  </ul>
  <!-- <p>{love} - {hate}</p> -->
</div>

<style>
  div {
    display: flex;
    margin: 1em 0;
  }

  button {
    font-size: 2em;
    line-height: 1;
    margin: 0.125em 0;
  }

  h3 {
    font-weight: var(--bold);
  }

  ul {
    display: flex;
    align-items: center;
  }

  li {
    list-style-type: none;
    display: flex;
    align-items: center;
  }

  li:first-of-type {
    /* filter: grayscale(50%); */
    opacity: 0.33;
  }

  span {
    display: inline-block;
    font-size: 2em;
  }

  .rate {
    display: flex;
    flex-direction: column;
  }
</style>
