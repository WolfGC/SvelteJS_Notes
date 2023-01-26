import { writable } from "svelte/store";

export let notes = writable([
  {
    id: 1,
    title: "Title 1",
    folder: "first",
    pinned: true,
    content: "Hello",
  },
  {
    id: 2,
    title: "Title 2",
    folder: "second",
    pinned: false,
    content: "Welcome to the project",
  },
  {
    id: 3,
    title: "Title 3",
    folder: "third",
    pinned: true,
    content: "You can create a note at the top",
  },
  {
    id: 4,
    title: "Title 4",
    folder: "third",
    pinned: false,
    content: "Or edit these notes by selecting them",
  },
  {
    id: 5,
    title: "Title 5",
    folder: "second",
    pinned: true,
    content: "Filters for folder tags are seen above",
  },
  {
    id: 6,
    title: "Title 6",
    folder: "third",
    pinned: false,
    content: "Enjoy!",
  },
]);
