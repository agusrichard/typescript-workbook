# Playwright Tutorial

<br />

## List of Contents:
### 1. [Playwright - Official Documentation (Getting Started)](#content-1)

<br />

---

## Contents:

## [Installation](https://playwright.dev/docs/intro) <span id="content-1"></span>

### Installing Playwright
- How to install:
  ```shell
  npm init playwright@latest
  ```
  
### Writing Tests
- Playwright automatically waits for the wide range of actionability checks to pass prior to performing each action.
- Navigate:
  ```typescript
  await page.goto('https://playwright.dev/')
  ```
- Interaction:
  ```typescript
  // Create a locator.
  const getStarted = page.getByRole('link', { name: 'Get started' });
  // Click it.
  await getStarted.click();
  ```
- Assertion:
  ```typescript
  await expect(page).toHaveTitle(/Playwright/);
  ```
- Pages are isolated between tests due to the Browser Context, which is equivalent to a brand new browser profile, where every test gets a fresh environment, even when multiple tests run in a single Browser.
- Using test hooks:
  ```typescript
  import { test, expect } from "@playwright/test";
  
  test.describe("navigation", () => {
    test.beforeEach(async ({ page }) => {
      // Go to the starting url before each test.
      await page.goto("https://playwright.dev/");
    });
  
    test("main navigation", async ({ page }) => {
      // Assertions use the expect API.
      await expect(page).toHaveURL("https://playwright.dev/");
    });
  });
  ```
- Other hooks include the `test.beforeAll` and `test.afterAll` which are executed once per worker before/after all tests.

### Running Tests
- Running all tests:
  ```typescript
  npx playwright test
  ```
- Running a single test file:
  ```typescript
  npx playwright test landing-page.spec.ts
  ```
- Run a set of test files:
  ```typescript
  npx playwright test tests/todo-page/ tests/landing-page/
  ```
- Running tests in headed mode:
  ```typescript
  npx playwright test landing-page.spec.ts --headed
  ```
- Running tests on a specific project:
  ```typescript
  npx playwright test landing-page.ts --project=chromium
  ```

**[⬆ back to top](#list-of-contents)**

<br />

---
## References:
- https://playwright.dev/docs/intro