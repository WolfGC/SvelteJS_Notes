<script>
  export let scrollTop;
  export let allNotes;
  export let pinnedNotes;
  export let expand;
  export let pushed;
  export let mobileExpand;
</script>

<header class="main_h" class:expand>
  <div class="header_row row">
    <div class="logo" on:mousedown={scrollTop}>Create Note</div>

    <div class="mobile-toggle" class:pushed on:mousedown={mobileExpand} />
    <nav>
      <ul>
        <slot />
      </ul>
      <input type="checkbox" bind:checked={allNotes} />
      <label for="checkbox">All</label>
      <input type="checkbox" bind:checked={pinnedNotes} />
      <label for="checkbox">Show Pinned</label>
      <ul class="cards" />
    </nav>
  </div>
</header>

<style>
  .main_h {
    position: fixed;
    top: 0px;
    max-height: 70px;
    z-index: 990;
    width: 100%;
    padding-top: 17px;
    overflow: hidden;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    padding-bottom: 6px;
    font-family: "Montserrat", sans-serif;
    background-color: rgba(0, 24, 40, 0.65);
    backdrop-filter: blur(12px);
  }
  @media only screen and (max-width: 766px) {
    .main_h {
      padding-top: 25px;
    }
  }
  .logo {
    font-size: 25px;
    color: #fff;
    text-transform: uppercase;
    float: left;
    display: block;
    margin-top: 0;
    line-height: 1;
    cursor: pointer;
  }
  nav {
    float: right;
    width: 100%;
  }
  nav ul {
    list-style: none;
    overflow: hidden;
    text-align: right;
    float: right;

    padding-top: 12px;
    margin-bottom: 22px;
    float: left;
    text-align: center;
    width: 100%;
  }

  .mobile-toggle {
    display: block;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: 22px;
    top: 0;
    width: 30px;
    height: 15px;
    -webkit-transition: all 200ms ease-in;
    -moz-transition: all 200ms ease-in;
    transition: all 200ms ease-in;
    margin-top: 5px;
  }

  .mobile-toggle:before {
    content: "";
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 4px;
    top: 0;
    transition: 0.2s all;
  }

  .mobile-toggle:after {
    content: "";
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 4px;
    bottom: 0;
    transition: 0.2s all;
  }

  .expand {
    max-height: 400px !important;
  }

  .pushed:before {
    top: 50% !important;
    transform: rotate(45deg);
    border-radius: 4px;
    transition: 0.2s all;
  }

  .pushed:after {
    top: 50% !important;
    transform: rotate(-45deg);
    border-radius: 4px;
    transition: 0.2s all;
  }
</style>
