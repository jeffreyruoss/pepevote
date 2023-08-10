import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sentrySvelteKit({
        sourceMapsUploadOptions: {
            org: "jeff-ruoss-development",
            project: "javascript-sveltekit"
        }
    }), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});