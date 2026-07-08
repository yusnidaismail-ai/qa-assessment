import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  private page: Page;
  private cartButton: Locator;
  private inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  async addCheapestItems(count: number) {
    // Fetch all items and sort them by price extracted from the UI
    const itemsCount = await this.inventoryItems.count();
    const items: { index: number; price: number }[] = [];

    for (let i = 0; i < itemsCount; i++) {
      const priceText = await this.inventoryItems.nth(i).locator('[data-test="inventory-item-price"]').innerText();
      const price = parseFloat(priceText.replace('$', ''));
      items.push({ index: i, price });
    }

    // Sort ascendingly by price
    items.sort((a, b) => a.price - b.price);

    // Add the top N cheapest items to the cart
    for (let i = 0; i < count; i++) {
      const targetItem = this.inventoryItems.nth(items[i].index);
      await targetItem.locator('button[id^="add-to-cart"]').click();
    }
  }

  async goToCart() {
    await this.cartButton.click();
  }
}