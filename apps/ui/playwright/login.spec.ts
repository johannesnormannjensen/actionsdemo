import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/login');
  await page.mainFrame().waitForURL('/login', {timeout: 2000})
  await page.getByRole('button', { name: 'Login with Google' }).click();
  const count = await page.locator('li').filter({ hasText: 'Owner Nestech owner@nestech.dk' }).count();
  expect(count).toBe(1);
});
