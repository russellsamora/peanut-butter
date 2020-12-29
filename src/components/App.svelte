<script>
  import { onMount } from "svelte";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import rawData from "../data/sanwiches.csv";
  import Meta from "./Meta.svelte";
  import Sandwich from "./Sandwich.svelte";
  import Sandwich2 from "./Sandwich2.svelte";

  const sandwichData = rawData.map((d, i) => ({
    index: i,
    id: d.name.toLowerCase().replace(/[^a-z]/g, ""),
    love: 0,
    hate: 0,
    ...d,
  }));

  const firebaseConfig = {
    apiKey: "AIzaSyD6phwPUJCBIAd8hBSldUoxrw-ez61Ck9Q",
    authDomain: "peanut-butter-41a94.firebaseapp.com",
    projectId: "peanut-butter-41a94",
  };

  let app;
  let db;
  let ratingData = {};
  let status = "waiting";
  let data = sandwichData;

  const getRating = (id) => ratingData[id] || {};

  const fetchRatings = async () => {
    try {
      // this does once
      // await db
      //   .collection("ratings")
      //   .get()
      //   .then((snapshot) => {
      // this does realtime
      await db.collection("ratings").onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          ratingData[doc.id] = doc.data();
        });
      });
      ratingData = ratingData;
    } catch (err) {
      console.log(err);
    }
  };

  const setDoc = (d) => {
    console.log(d.id);
    return new Promise((resolve, reject) => {
      db.collection("ratings")
        .doc(d.id)
        .set({
          love: 0,
          hate: 0,
        })
        .then(resolve)
        .catch(reject);
    });
  };

  const reset = async () => {
    status = "pending";
    for (let d of sandwichData) {
      try {
        await setDoc(d);
      } catch (err) {
        console.log(err);
      }
    }
    status = "complete";
  };

  const onRate = ({ detail }) => {
    const { value, id } = detail;
    const doc = db.collection("ratings").doc(id);
    doc.update({ [[value]]: firebase.firestore.FieldValue.increment(1) });
  };

  $: ratingData,
    (data = sandwichData.map((d) => ({
      ...d,
      ...getRating(d.id),
    })));

  onMount(() => {
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
      db = firebase.firestore(app);
      fetchRatings();
    }
  });
</script>

<Meta />

<section>
  <h1>
    The Complete Guide to Peanut Butter Sandwiches
    <span>
      Spice up your PB&amp;J life. Expand your palette &mdash; and mind &mdash;
      with this exhaustive list of peanut butter sandwiches.
    </span>
  </h1>
</section>
<section>
  {#each data as d (d.id)}
    <Sandwich2 {...d} on:rate="{onRate}" />
  {/each}
</section>

<p>*This website contains peanuts</p>

<!-- <p style="margin-top:10em;">warning: this will reset everything.</p>
<button on:click="{reset}">Reset: {status}</button> -->
<style>
  section {
    padding: 2rem;
    overflow-x: hidden;
  }

  h1 {
    font-weight: var(--bold);
    font-size: 7.5vw;
    line-height: 1.1;
    padding: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-shadow: 0.04em 0.04em 0 var(--primary);
  }

  span {
    font-size: 1rem;
    display: inline-block;
    width: 21rem;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
  }

  @media only screen and (min-width: 80em) {
    span {
      width: 12rem;
    }
  }
</style>
