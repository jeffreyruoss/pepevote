import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'pepe.co' })).toBeVisible();
});

test('index page correct labels', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Message')).toBeVisible();
	await expect(page.getByText('Copy to clipboard')).toBeVisible();
	await expect(page.getByLabel('Signature')).toBeVisible();
	await expect(page.getByLabel('Address')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Validate' })).toBeVisible();
	await expect(page.getByText('pepe.co/vote')).toBeVisible();
});