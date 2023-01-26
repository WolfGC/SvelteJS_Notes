<script>
  import { notes } from "../stores/test";
  import Note from "./Note.svelte";
  export let pinnedNotes;
  export let selectedNote;
  export let scrollCheck;
</script>

<h1>//PINNED NOTES</h1>
<ul class="cards">
  {#each $notes as note}
    {#if note.pinned && pinnedNotes}
      <li class="cards_item">
        <div
          class="card"
          on:mousedown={() => (selectedNote = note)}
          on:mousedown={scrollCheck}
        >
          <Note {note} />
        </div>
      </li>
    {/if}
  {/each}
</ul>
