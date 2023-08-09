import { writable } from 'svelte/store';

export const candidatesStore = writable([]);
export const isFormSubmitLoadingStore = writable(false);
export const isFormSubmittedStore = writable(false);