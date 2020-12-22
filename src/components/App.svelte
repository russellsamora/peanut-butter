<script>
  import { onMount } from "svelte";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import rawData from "../data/sanwiches.csv";
  import Meta from "./Meta.svelte";
  import Sandwich from "./Sandwich.svelte";

  const sandwichData = rawData.map((d) => ({
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
      // this does realtime
      // await db.collection("ratings").onSnapshot((snapshot) => {
      // this does once
      await db
        .collection("ratings")
        .get()
        .then((snapshot) => {
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

<h1>Peanut Butter &amp; ?</h1>

{#each data as d (d.id)}
  <Sandwich {...d} on:rate="{onRate}" />
{/each}

<p>warning: this will reset everything.</p>
<button style="margin-top:10em;" on:click="{reset}">Reset: {status}</button>
