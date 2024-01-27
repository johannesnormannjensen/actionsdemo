import { test, expect } from '@playwright/test';

test.use({
  geolocation: {
    latitude: 55.669599877562,
    longitude: 12.588571683898572
  },
  locale: 'da-DK',
  permissions: ['geolocation'],
  timezoneId: 'Europe/Copenhagen'
});

test('Edit playground name', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.locator('a').filter({ hasText: 'Legepladsen på Christianshavns Vold - Elefantens Bastion 297mGrønne omgivelser o' }).click();
  await page.locator('a').filter({ hasText: 'Legepladsen på Christianshavns Vold - Elefantens Bastion 297mGrønne omgivelser o' }).getByRole('button').click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').press('ArrowLeft');
  await page.getByLabel('Name').press('ArrowLeft');
  await page.getByLabel('Name').press('Home');
  await page.getByLabel('Name').fill('123123123 Legepladsen på Christianshavns Vold - Elefantens Bastion');
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByRole('heading', { name: '123123123 Legepladsen på Christianshavns Vold - Elefantens Bastion', exact: true })).toBeVisible();
});
