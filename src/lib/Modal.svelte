<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { notes } from "../stores/test";
  export let note = {};
  export let testid;
  export let unique;
  let empty = true;

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal;

  function handleDelete() {
    if (testid != -1) {
      $notes = $notes.slice(0);
      $notes.splice(testid, 1);
      return $notes;
    }
  }

  function handleUpdate() {
    $notes = $notes;
    return $notes;
  }

  function checkInput() {
    if (note.folder == "" || note.title == "") {
      empty = true;
    } else {
      empty = false;
    }
  }

  function checkEmpty() {
    if (empty == false) {
      close();
    }
  }
  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  checkInput();
</script>

<svelte:window on:keydown={handle_keydown} />

<div
  class="modal-background"
  on:mousedown={handleUpdate}
  on:mousedown={checkEmpty}
/>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
  <input
    placeholder="Title Here..."
    maxlength="20"
    bind:value={note.title}
    on:keyup={checkInput}
  />
  <hr />
  <textarea
    placeholder="Content Here..."
    maxlength="120"
    bind:value={note.content}
  />
  {testid}
  <hr />
  <div class="modal-footer">
    <select bind:value={note.folder}>
      {#each unique as folderSelect}
        <option>{folderSelect}</option>
      {/each}
    </select>
    <button on:click={handleDelete} on:click={close}>Delete</button>
    <button disabled={empty} on:click={handleUpdate} on:click={close}
      >Done</button
    >
    <input type="checkbox" bind:checked={note.pinned} />
    <label for="checkbox">Pinned</label>
  </div>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 995;
  }
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: #68a2b9;
    z-index: 999;
  }
  .modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    grid-gap: 1em;
  }
  button,
  select {
    display: inline-flex;
    height: 40px;
    width: 150px;
    border: 2px solid #bfc0c0;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 0.8em;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #001628;
  }
  button:disabled {
    opacity: 0.4;
  }
  input {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
  }
  input,
  textarea {
    display: block;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  textarea {
    min-height: 20vh;
    resize: none;
    width: 100%;
  }
</style>
