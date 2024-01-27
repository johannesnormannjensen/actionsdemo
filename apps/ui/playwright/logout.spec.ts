import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/login');
  await page.mainFrame().waitForURL('/login', { timeout: 2000 });
  await page.getByRole('button', { name: 'Login with Google' }).click();
  await page.waitForURL(({ href }) => href.includes('auth/handler'), { timeout: 2000 });
  await page.locator('li').filter({ hasText: 'Admin Nestech admin@nestech.dk' }).click();
  await page.waitForURL('/user-organization', { timeout: 2000 });
  await expect(page).toHaveURL('/user-organization');
  await page.goto('/profile');
  await page.getByRole('button', { name: 'Logout' }).click();
  await page.waitForURL('/login', { timeout: 2000 });
  await expect(page).toHaveURL('/login');
});
