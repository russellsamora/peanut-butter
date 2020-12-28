<script>
  export let name;
  export let alt;
  const slug = name.toLowerCase().replace(/[^a-z]/g, "");
  const deg = Math.random() * 20 - 10;
</script>

<img
  style="transform: rotate({deg}deg);"
  src="assets/ingredients/{slug}.png"
  class:alt
  alt="{name}" />

<style>
  img {
    max-width: 320px;
    /* margin: 1em; */
    /* width: 8em; */
    width: 160px;
    padding: 1em;
    display: inline-block;
    /* filter: drop-shadow(-4px 0px 0 var(--fg)) drop-shadow(4px 0px 0 var(--fg))
			drop-shadow(0 4px 0 var(--fg)) drop-shadow(0 -4px 0 var(--fg)); */
    filter: drop-shadow(-4px 0px 0 var(--white))
      drop-shadow(4px 0px 0 var(--white)) drop-shadow(0 4px 0 var(--white))
      drop-shadow(0 -4px 0 var(--white)) drop-shadow(-4px 0px 0 var(--primary))
      drop-shadow(4px 0px 0 var(--primary)) drop-shadow(0 4px 0 var(--primary))
      drop-shadow(0 -4px 0 var(--primary));
  }

  .alt {
    filter: drop-shadow(-4px 0px 0 var(--white))
      drop-shadow(4px 0px 0 var(--white)) drop-shadow(0 4px 0 var(--white))
      drop-shadow(0 -4px 0 var(--white))
      drop-shadow(-4px 0px 0 var(--secondary))
      drop-shadow(4px 0px 0 var(--secondary))
      drop-shadow(0 4px 0 var(--secondary))
      drop-shadow(0 -4px 0 var(--secondary));
  }
</style>
