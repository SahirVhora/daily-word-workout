import playwright from '../../node_modules/@playwright/test/index.js';

const { test, expect } = playwright;

test.beforeEach(async ({ page }) => {
  await page.route('https://api.datamuse.com/**', route => route.abort());
  await page.goto('/?date=2026-09-21');
});

test('defaults to a practice worksheet and can reveal the answer sheet', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Grow your word power.' })).toBeVisible();
  await expect(page.locator('.word-card')).toHaveCount(10);
  await expect(page.locator('.word').first()).toHaveText('curious');
  await expect(page.locator('.meaning').first()).toHaveText('');
  await expect(page.locator('.meaning').first().locator('i')).toHaveCount(2);
  await expect(page.locator('.synonyms').first()).toBeEmpty();
  await expect(page.locator('.antonyms').first()).toBeEmpty();
  await expect(page.locator('#worksheet-version-label')).toHaveText('Practice worksheet');
  await page.getByRole('button', { name: /Answer sheet/ }).click();
  await expect(page.locator('.meaning').first()).toContainText('Eager to know');
  await expect(page.locator('.synonyms').first()).toContainText('interested');
  await expect(page.locator('.antonyms').first()).toContainText('uninterested');
  await expect(page.locator('#worksheet-version-label')).toHaveText('Answer sheet');
  await page.getByRole('button', { name: 'Next day' }).click();
  await expect(page.locator('.word').first()).toHaveText('admire');
});

test('supports a direct answer-sheet URL for printing', async ({ page }) => {
  await page.goto('/?date=2026-09-21&version=answers');
  await expect(page.locator('.meaning').first()).toContainText('Eager to know');
  await expect(page.locator('.synonyms').first()).toContainText('interested');
  await expect(page.getByRole('button', { name: 'Print Answer PDF' })).toBeVisible();
});

test('tracks learned words and restores them after reload', async ({ page }) => {
  const firstCheck = page.locator('.learned-check input').first();
  await firstCheck.check();
  await expect(page.locator('#progress-count')).toHaveText('1 of 10');
  await page.reload();
  await expect(page.locator('.learned-check input').first()).toBeChecked();
  await expect(page.locator('#progress-count')).toHaveText('1 of 10');
});

test('has an A4 print action', async ({ page }) => {
  await page.evaluate(() => { window.print = () => { document.body.dataset.printed = 'yes'; }; });
  await page.getByRole('button', { name: /Print Practice PDF/ }).click();
  await expect(page.locator('body')).toHaveAttribute('data-printed', 'yes');
});
