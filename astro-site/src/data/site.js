// One place for values that appear on every page.

// Web3Forms endpoint key. During the build this should be a TEST key so form
// tests never land in the real inbox — WEBSITE_PROCESS.md §3, launch gate #12
// restores the live one. Changing it here changes it on every form.
export const FORM_KEY = 'c8b900d1-4085-4a4b-9b99-5bcbce6175b3';

// Set true when FORM_KEY above is a throwaway test key, so the launch gate
// check can assert it was put back.
export const FORM_KEY_IS_TEST = false;
