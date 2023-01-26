<script>
  export let note;
  $: pin = note.pinned;
  // $: folderTag = note.folder[0].toUpperCase() + note.folder.slice(1);
</script>

<div class="card_content">
  <h2 class="card_title">{note.title}</h2>
  <p class="card_text">{note.content}</p>
  <span
    ><span class:pin><i class="fa-solid fa-thumbtack" /></span> // {note.folder}</span
  >
</div>

<style>
  .pin {
    color: #e9072b;
  }
</style>
