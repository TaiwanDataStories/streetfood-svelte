import { writable } from 'svelte/store';

export const margins = writable({
  top: 40,
  right: 50,
  bottom: 20,
  left: 50,
});

export const isScreenSmall = writable(false);
