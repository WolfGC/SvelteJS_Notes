<script>
  import { notes } from "../stores/test";

  $: currid = $notes.at(-1).id;
  $: id = currid + 1;
  $: lower = folder.toLowerCase();

  let title = "";
  let folder = "";
  let content = "";
  let pinned = false;
  let bounce = false;
  let shake = true;
  let empty = true;
  let spin = false;

  function pinAnimation() {
    bounce = !bounce;
    shake = !shake;
  }

  function checkInput() {
    if (title == "" || folder == "") {
      empty = true;
      document
        .getElementById("createBtn")
        .setAttribute("title", "Title and Folder required");
    } else {
      empty = false;
      document.getElementById("createBtn").removeAttribute("title");
      spin = false;
    }
  }

  const addNote = () => {
    if (!title.trim() && !folder.trim()) return;
    if (title == "" || folder == "") return;
    if (bounce) {
      pinned = true;
    } else {
      pinned = false;
    }

    folder = lower;

    $notes = [
      ...$notes,
      {
        id,
        title,
        folder,
        pinned,
        content,
      },
    ];

    title = "";
    folder = "";
    content = "";
    shake = true;
    bounce = false;
    spin = true;
  };
</script>

<!-- <h1>//ADD NEW ITEM</h1> -->
<div class="newNoteCont">
  <form on:submit|preventDefault on:keyup={checkInput}>
    <div class="note-body">
      <input maxlength="20" placeholder="Title" bind:value={title} />
      <textarea
        maxlength="120"
        placeholder="Note Content"
        bind:value={content}
      />
    </div>
    <div class="note-group">
      <div class="note-custom">
        <div
          class="ico-pin"
          class:bounce
          class:shake
          on:mousedown={pinAnimation}
        >
          <i class="fa-solid fa-thumbtack fa-lg" />
        </div>
        <input maxlength="20" placeholder="Folder" bind:value={folder} />
      </div>
      <button
        id="createBtn"
        disabled={empty}
        class:spin
        title="Title and Folder required"
        on:click={addNote}
        on:click={checkInput}
      >
        <i class="fa-solid fa-plus" />
      </button>
    </div>
  </form>
</div>

<style>
  .newNoteCont {
    /*overflow: hidden;*/
    min-height: 35vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    grid-gap: 2em;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 1em;
    width: 35rem;
    height: 15rem;
    padding: 10px;
    box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
    outline: auto;
  }
  .note-body {
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    row-gap: 0.5em;
  }
  .note-custom {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-gap: 1em;
  }
  .note-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  input {
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
  }
  textarea {
    resize: none;
    line-height: 1.5;
    min-height: 5em;
    max-height: 50vh;
    height: 100%;
    width: 100%;
    font-size: 18px;
  }
  input,
  textarea {
    width: 100%;
    display: block;
    border: 0;
    outline: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  .fa-thumbtack {
    cursor: pointer;
  }
  #createBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #68a2b9;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
    text-align: center;
    box-shadow: 0 1px 2px #3c40434d, 0 2px 6px 2px #3c404326;
  }
  #createBtn:disabled {
    opacity: 0.4;
  }
  .bounce {
    animation-name: bounce;
    animation-duration: 0.5s;
    color: #99d9d9;
  }
  .shake {
    animation-name: shake;
    animation-duration: 0.5s;
  }
  .spin {
    animation-name: spin;
    animation-duration: 0.5s;
  }
  @keyframes bounce {
    0% {
      transform: translateY(-2px);
    }
    60% {
      transform: translateY(5px);
    }
    80% {
      transform: translateY(-2px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    15% {
      transform: rotate(5deg);
    }
    30% {
      transform: rotate(-5deg);
    }
    45% {
      transform: rotate(4deg);
    }
    60% {
      transform: rotate(-4deg);
    }
    75% {
      transform: rotate(2deg);
    }
    85% {
      transform: rotate(-2deg);
    }
    92% {
      transform: rotate(1deg);
    }
    100% {
      transform: rotate(0);
    }
  }
  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @media (max-width: 66rem) {
    form {
      width: 25rem;
    }
  }
  @media (max-width: 27rem) {
    form {
      width: 20rem;
    }
  }
</style>
