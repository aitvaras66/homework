import { Page } from '@playwright/test';
import { SELECTORS, CHECKOUTFIELDS } from './selectors';
import { BASE_URL } from './config'; // Import the BASE_URL

export async function navigateToShop(page: Page) {
  try {
    await page.goto(BASE_URL);
    await page.waitForSelector(SELECTORS.NAVIGATION_ITEM_SHOP);
    await page.click(SELECTORS.NAVIGATION_ITEM_SHOP);
  } catch (error) {
    throw new Error(`Failed to navigate to the shop: ${error.message}`);
  }
}

async function waitAndClick(page: Page, selector: string, errorMessage: string) {
  try {
    await page.waitForSelector(selector);
    await page.click(selector);
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.message}`);
  }
}

export async function waitForProductsToLoad(page: Page) {
  await page.waitForSelector(SELECTORS.PRODUCT);
  const products = await page.$$(SELECTORS.PRODUCT);
  if (products.length === 0) {
    throw new Error('No products found on the page.');
  }
}

export async function selectRandomProduct(page: Page) {
  const products = await page.$$(SELECTORS.PRODUCT);
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  await randomProduct.click();
}

export async function addToBag(page: Page) {
  await page.waitForSelector(SELECTORS.ADD_TO_BAG_BUTTON);
  await page.click(SELECTORS.ADD_TO_BAG_BUTTON);
  const bagText = await page.textContent(SELECTORS.SHOPPING_BAG);
  if (!bagText || !bagText.includes('(1)')) {
    throw new Error('Failed to add product to the bag.');
  }
}

export async function proceedToCheckout(page: Page) {
  await waitAndClick(page, SELECTORS.CHECKOUT_BUTTON, 'Failed to proceed to checkout');
}

export async function selectDropdownOption(page: Page, selector: string, optionLabel: string) {
  await page.click(selector);
  const optionSelector = `.v-list-item:has-text("${optionLabel}")`;
  await page.waitForSelector(optionSelector);
  await page.click(optionSelector);

  const selectedValue = await page.locator(selector).textContent();
  if (!selectedValue?.includes(optionLabel)) {
    throw new Error(`Failed to select the dropdown option: ${optionLabel}`);
  }
}

export async function fillContactInformation(page: Page, email: string, name: string, phone: string, text: string) {
  await page.fill(CHECKOUTFIELDS.EMAIL, email);
  await page.fill(CHECKOUTFIELDS.NAME, name);
  await page.fill(CHECKOUTFIELDS.PHONE, phone);
  await page.fill(CHECKOUTFIELDS.TEXT, text);
}

export async function verifyOrderConfirmation(page: Page) {
  const isOrderSuccessVisible = await page.waitForSelector(SELECTORS.ORDER_SUCCESS_MODAL);
  if (isOrderSuccessVisible) {
  } else {
    throw new Error('Order confirmation modal is not visible.');
  }
}

export function generateRandomEmail(): string {
  const randomString = Math.random().toString(36).substring(2, 10);
  return `${randomString}@example.com`;
}

export function generateRandomName(): string {
  const names = ['John Doe', 'Jane Smith'];
  return names[Math.floor(Math.random() * names.length)];
}

export function generateRandomPhone(): string {
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
  return `+3706${randomDigits}`;
}

export async function completeCheckout(page: Page) {
  await page.waitForSelector(SELECTORS.CHECKOUT_CONTACT_INFO_BUTTON);
  await page.click(SELECTORS.CHECKOUT_CONTACT_INFO_BUTTON);
  await page.waitForSelector(SELECTORS.CHECKOUT_PAY_BUTTON);
  await page.click(SELECTORS.CHECKOUT_PAY_BUTTON);
}