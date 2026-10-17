import { test, expect } from '@playwright/test';

test('deve acessar a página inicial do Toolshop', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await expect(page).toHaveTitle(/Practice Software Testing/);
});