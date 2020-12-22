<script>
  import { createEventDispatcher } from "svelte";
  export let id;
  export let name;
  export let ingredients;
  export let love;
  export let hate;

  const dispatch = createEventDispatcher();

  const onClick = (value, id) => {
    dispatch("rate", { value, id });
  };
</script>

<div id="{id}" data-id="{id}">
  <p>{name}</p>
  <p>{ingredients}</p>
  <p>{love} - {hate}</p>
  <button on:click="{() => onClick('love', id)}">🤤</button>
  <button on:click="{() => onClick('hate', id)}">🤮</button>
</div>

<style>
  button {
    font-size: 3em;
    line-height: 1;
  }
</style>
