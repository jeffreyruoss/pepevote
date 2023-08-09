import { writable } from 'svelte/store';

export const candidatesStore = writable([]);
export const isFormSubmittedStore = writable(false);