import { test, expect } from '@playwright/test';

test('Should navigate through app', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByText(/Bem-vinda ao/i)).toBeVisible();
  await expect(page.getByText(/Meditamamente/i)).toBeVisible();
  await page.getByRole('button', { name: 'Próximo' }).click();

  await page.getByRole('textbox', { name: 'Insira seu email' }).fill('sandra@email.com');
  await page.getByRole('textbox', { name: 'Insira sua senha' }).fill('senha456')
  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(page.getByText(/Olá, Sandra Castro/i)).toBeVisible();

  await page.getByRole('button', {name: /ver introdução/i}).click();
  await expect(page.getByText(/Como/i)).toBeVisible();
  await expect(page.getByText(/Funciona/i)).toBeVisible();
  await page.getByRole('button', { name: 'Next slide' }).click();
  await page.getByRole('button', { name: 'Next slide' }).click();
  await page.getByRole('button', { name: 'Finalizar' }).click();
  
});
