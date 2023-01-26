<script>
  export let allNotes;
  export let pinnedNotes;
  export let actionWhenInViewport;
</script>

<div class="mqDropdown">
  <h1 use:actionWhenInViewport>//FOLDER VALUES</h1>
  <input type="checkbox" bind:checked={allNotes} />
  <label for="checkbox">All</label>
  <input type="checkbox" bind:checked={pinnedNotes} />
  <label for="checkbox">Show Pinned</label>
  <ul class="cards">
    <slot />
  </ul>
</div>
