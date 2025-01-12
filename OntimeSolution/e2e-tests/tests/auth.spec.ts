import { test, expect } from '@playwright/test';

// test url
const UI_URL = "http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();

  // get sign in heading
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()
  
  // fill form
  await page.locator('[name="email"]').fill('test@test.com');
  await page.locator('[name="password"]').fill('password');

  // submit form
  await page.getByRole('button', { name: 'Sign In' }).click();
  // expect to be redirected to home page
  await expect(page.getByText('Sign in successfull!')).toBeVisible();
 await expect(page.getByRole('link', { name: 'My Dashboard' })).toBeVisible();
 await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();

});











