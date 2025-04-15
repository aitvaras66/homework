import { test } from '@playwright/test';
import { SELECTORS } from "../utils/selectors";
import { navigateToShop, waitForProductsToLoad, selectRandomProduct, addToBag, proceedToCheckout, selectDropdownOption, fillContactInformation, verifyOrderConfirmation, generateRandomEmail, generateRandomName, generateRandomPhone, completeCheckout } from "../utils/actions";

test.describe('E-commerce Shop Tests', () => {
  test('should navigate to shop, select a random product, and complete checkout', async ({ page }) => {
    await navigateToShop(page);

    await waitForProductsToLoad(page);

    await selectRandomProduct(page);

    await addToBag(page);

    await proceedToCheckout(page);

    await selectDropdownOption(page, SELECTORS.SHIPPING_DESTINATION_SELECT, 'Lithuania');
    await selectDropdownOption(page, SELECTORS.PARCEL_SELECT, "Akmenės NORFA Daukanto paštomatas, S. Daukanto g. 7");

    await page.click(SELECTORS.CHECKOUT_SHIP_DETAILS_BUTTON);

    const randomEmail = generateRandomEmail();
    const randomName = generateRandomName();
    const randomPhone = generateRandomPhone();
    const randomText = generateRandomName();
    await fillContactInformation(page, randomEmail, randomName, randomPhone, randomText);

    await completeCheckout(page)

    await verifyOrderConfirmation(page);

    console.log('Test passed: Order placed successfully.');
  });
});