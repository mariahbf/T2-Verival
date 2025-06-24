import { test, expect } from '@playwright/test';
import {
  getFormattedDateTime,
  timeStringToSeconds,
} from '../utils/helperFunctions';

test('New user app navigation', async ({ page }) => {
  await page.goto(process.env.LOCALHOST || 'http://localhost:3000');

  await test.step('User login', async () => {
    await expect(page.getByText(/Bem-vinda ao/i)).toBeVisible();
    await expect(page.getByText(/Meditamamente/i)).toBeVisible();
    await page.getByRole('button', { name: 'Próximo' }).click();

    await page
      .getByRole('textbox', { name: 'Insira seu email' })
      .fill('sandra@email.com');
    await page
      .getByRole('textbox', { name: 'Insira sua senha' })
      .fill('senha456');
    await page.getByRole('button', { name: 'Entrar' }).click();
  });
  await test.step('User is required to complete introduction since it is their first time accessing the app', async () => {
    await expect(page.getByText(/Como/i)).toBeVisible();
    await expect(page.getByText(/Funciona/i)).toBeVisible();
    await page.getByRole('button', { name: 'Next slide' }).click();
    await page.getByRole('button', { name: 'Next slide' }).click();
    await page.getByRole('button', { name: 'Finalizar' }).click();
  });

  await test.step('User reviews introduction', async () => {
    await expect(page.getByText('Olá, Sandra Castro')).toBeVisible();

    await page.getByRole('button', { name: /Ver introdução/i }).click();
    await expect(page.getByText(/Como/i)).toBeVisible();
    await expect(page.getByText(/Funciona/i)).toBeVisible();
    await page.getByRole('button', { name: 'Next slide' }).click();
    await page.getByRole('button', { name: 'Next slide' }).click();

    await page.getByRole('button', { name: 'Finalizar' }).click();
  });

  await test.step('User listens to first week`s audio', async () => {
    await expect(page.getByText('Olá, Sandra Castro')).toBeVisible();

    await page.getByRole('cell', { name: 'Semana 1' }).click();
    await expect(page.getByRole('heading', { name: 'Semana 1' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Audio Icon' })).toBeVisible();
    const initialTimeText = await page
      .getByTestId('time-listened')
      .textContent();
    await page
      .getByRole('button', { name: 'Play Button', exact: true })
      .click();
    await page.waitForTimeout(10000); // Wait for 10 seconds to simulate audio playing
    const finalTimeText = await page.getByTestId('time-listened').textContent();
    const initialTime = timeStringToSeconds(initialTimeText);
    const finalTime = timeStringToSeconds(finalTimeText);
    expect(finalTime).toBeGreaterThan(initialTime);
    await page.getByRole('button', { name: 'Generic Circle Button' }).click();
  });

  await test.step('User adds a diary entry', async () => {
    await expect(page.getByRole('heading', { name: 'Semana 1' })).toBeVisible();

    await page.getByRole('link', { name: 'Diário' }).click();
    await expect(page.getByText(/diário/i)).toBeVisible();
    await expect(page.getByText(/de bordo/i)).toBeVisible();
    await page.getByTestId('add-button').getByRole('button').click();
    await expect(
      page.getByRole('textbox', { name: 'Insira aqui suas anotações...' }),
    ).toBeVisible();
    await page
      .getByRole('textbox', { name: 'Insira aqui suas anotações...' })
      .fill('testing');
    await page.getByTestId('add-diary-entry').getByRole('button').click();
    await expect(
      page.getByRole('button', { name: getFormattedDateTime() }),
    ).toBeVisible();
    await page.getByRole('button', { name: getFormattedDateTime() }).click();
    await expect(page.getByRole('heading', { name: 'testing' })).toBeVisible();
  });
});
