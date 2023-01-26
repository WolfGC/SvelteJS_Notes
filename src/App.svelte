<script>
  import { notes } from "./stores/test";
  import Folders from "./lib/Folders.svelte";
  import Header from "./lib/Header.svelte";
  import Modal from "./lib/Modal.svelte";
  import NewNote from "./lib/NewNote.svelte";
  import Notes from "./lib/Notes.svelte";
  import Pinned from "./lib/Pinned.svelte";
  import "@fortawesome/fontawesome-free/js/all";

  //init values
  let selectedNote = $notes[0];
  let allNotes = true;
  let pinnedNotes = true;
  let showModal = false;
  let disableScroll = false;
  let inView = false;
  let expand = false;
  let pushed = false;
  let page = document.documentElement;

  // When selected note changes, values should update
  $: folderid = selectedNote.folder;
  $: testid = $notes.indexOf(selectedNote);

  //Filtering duplicate Folders
  $: unique = [...new Set($notes.map((notes) => notes.folder).sort())];

  function scrollCheck() {
    showModal = !showModal;
    disableScroll = !disableScroll;

    if (disableScroll == true) {
      page.style.setProperty("overflow", "hidden");
    } else {
      page.style.removeProperty("overflow");
    }
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function actionWhenInViewport(e) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        inView = false;
      } else {
        inView = true;
      }
    });

    observer.observe(e);
  }

  function mobileExpand() {
    expand = !expand;
    pushed = !pushed;
  }
</script>

<div id="app">
  <a
    href="https://github.com/WolfGC/SvelteJS_Notes"
    rel="noreferrer"
    target="_blank"
    ><h3>
      SvelteJS Notes By Vincent Wolfgram <i class="fa-brands fa-github" />
    </h3></a
  >

  {#if inView}
    <Header
      bind:allNotes
      bind:pinnedNotes
      {expand}
      {pushed}
      {scrollTop}
      {mobileExpand}
    >
      {#each unique as folder}
        <li
          on:mousedown={() => (folderid = folder) && (allNotes = false)}
          on:mousedown={mobileExpand}
          class:active={folderid == folder && allNotes == false}
        >
          {folder[0].toUpperCase() + folder.slice(1)}
        </li>
      {/each}
    </Header>
  {/if}

  {#if showModal}
    <Modal on:close={scrollCheck} bind:note={selectedNote} {testid} {unique} />
  {/if}

  <NewNote />

  <div class="row content">
    <Folders bind:allNotes bind:pinnedNotes {actionWhenInViewport}>
      {#each unique as folder}
        <li class="cards_item">
          <div
            class="card_content_folder"
            class:active={folderid == folder && allNotes == false}
            on:mousedown={() => (folderid = folder) && (allNotes = false)}
          >
            <h2 class="card_title">
              {folder[0].toUpperCase() + folder.slice(1)}
            </h2>
          </div>
        </li>
      {/each}
    </Folders>

    <Notes bind:selectedNote {folderid} {allNotes} {scrollCheck} />

    <Pinned bind:selectedNote {pinnedNotes} {scrollCheck} />
  </div>
</div>

<style>
  a {
    text-decoration: none;
  }
  a:visited {
    color: #fff;
  }
</style>
