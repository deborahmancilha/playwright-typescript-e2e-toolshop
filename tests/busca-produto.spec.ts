import { test, expect } from '@playwright/test';

const cenariosDeBusca = [
  {
    termo: 'Cutters',
    produtoEsperado: 'Bolt Cutters'
  },
  {
    termo: 'Claw Hammer with Shock Reduction Grip',
    produtoEsperado: 'Claw Hammer with Shock Reduction Grip'
  },
  {
    termo: 'Combination Pliers',
    produtoEsperado: 'Combination Pliers'
  }
];

for (const cenario of cenariosDeBusca) {

  test(`deve exibir ${cenario.produtoEsperado} ao pesquisar por ${cenario.termo}`, async ({ page }) => {

    await page.goto('/');

    await page
      .locator('[data-test="search-query"]')
      .fill(cenario.termo);

    await page
      .locator('[data-test="search-submit"]')
      .click();

    const produto = page
      .locator('[data-test="product-name"]')
      .filter({ hasText: cenario.produtoEsperado });

    await expect(produto).toHaveText(cenario.produtoEsperado);

    await produto.click();

    await expect(
      page.locator('[data-test="product-name"]')
    ).toHaveText(cenario.produtoEsperado);
  });

}