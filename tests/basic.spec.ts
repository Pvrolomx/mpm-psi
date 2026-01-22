import { test, expect } from '@playwright/test';

test.describe('MPM-Psi Tests', () => {
  
  test('Landing carga correctamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Psicóloga/);
    await expect(page.locator('h1')).toContainText('bienestar emocional');
  });

  test('Navegación a Agendar funciona', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Agendar cita');
    await expect(page).toHaveURL(/\/agendar/);
    await expect(page.locator('h1')).toContainText('Agenda tu cita');
  });

  test('Navegación a Tienda funciona', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Talleres');
    await expect(page).toHaveURL(/\/tienda/);
    await expect(page.locator('h1')).toContainText('Talleres y Paquetes');
  });

  test('Servicios visibles en landing', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#servicios')).toBeVisible();
    await expect(page.locator('text=Terapia Individual')).toBeVisible();
    await expect(page.locator('text=Terapia de Pareja')).toBeVisible();
    await expect(page.locator('text=Talleres Grupales')).toBeVisible();
  });

  test('Footer con firma Duendes visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=hecho con ❤️ por Duendes 2026')).toBeVisible();
  });

  test('Productos visibles en tienda', async ({ page }) => {
    await page.goto('/tienda/');
    await expect(page.locator('text=Manejo del Estrés')).toBeVisible();
    await expect(page.locator('text=Autoestima')).toBeVisible();
    await expect(page.locator('text=Comprar').first()).toBeVisible();
  });

  test('Página agendar tiene placeholder Calendly', async ({ page }) => {
    await page.goto('/agendar/');
    await expect(page.locator('text=Calendly Widget')).toBeVisible();
  });

});
