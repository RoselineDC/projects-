import { test, expect } from "@playwright/test";

// test url
const UI_URL = "http://localhost:5173/";
test("Should allow user to register", async ({ page }) => {
  await page.goto(UI_URL);

  // GET button
  await page.getByRole("link", { name: "Sign In" }).click();

  // get "create acount link"
  await page.getByRole("link", { name: "Create an account here" }).click();
  //  expect heading for register
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  //  ADD FORM FIELDS
  await page.locator('[name="firstName"]').fill("Rossline");
  await page.locator('[name="lastName"]').fill("Dangac");
  await page.locator('[name="email"]').fill("lynne@mai.com");
  await page.locator('[name="password"]').fill("123456");
  await page.locator('[name="confirmPassword"]').fill("123456");

  // submit form
  await page.getByRole("button", { name: "Create Account" }).click();
});

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // get sign in heading
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // fill form
  await page.locator('[name="email"]').fill("lynne@mai.com");
  await page.locator('[name="password"]').fill("123456");

  // submit form
  await page.getByRole("button", { name: "Sign In" }).click();
  // expect to be redirected to home page
  await expect(page.getByText("Sign in successfull!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Dashboard" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
