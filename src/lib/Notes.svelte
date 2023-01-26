<script>
  import { notes } from "../stores/test";
  import Note from "./Note.svelte";
  export let folderid;
  export let selectedNote;
  export let allNotes;
  export let scrollCheck;
</script>

<h1>//NOTES</h1>
<ul class="cards">
  {#each $notes as note}
    {#if note.folder == folderid}
      <li class="cards_item">
        <div
          class="card"
          on:mousedown={() => (selectedNote = note)}
          on:mousedown={scrollCheck}
        >
          <Note {note} />
        </div>
      </li>
    {:else if allNotes}
      <li class="cards_item">
        <div
          class="card"
          on:mousedown={scrollCheck}
          on:mousedown={() => (selectedNote = note)}
        >
          <Note {note} />
        </div>
      </li>
    {/if}
  {/each}
</ul>
