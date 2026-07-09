import type { Page, Locator } from '@playwright/test';

export class AddToCartPage {
  private page: Page;
  private cartButton: Locator;
  private inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  async addItemsToCart(itemName: string) {
  // 1. Find the specific product box that matches the item name text
  const targetItem = this.inventoryItems.filter({ hasText: itemName });
  
  // 2. Look inside that specific box and click its "Add to cart" button
  await targetItem.locator('button[id^="add-to-cart"]').click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}