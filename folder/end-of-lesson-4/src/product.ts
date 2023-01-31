import { PurchaseContext } from "./purchase-context";

export abstract class Product {
  price: number;

  constructor(price: number) {}

  public abstract getProductDescription(): string;

  getDiscountPrice(context: PurchaseContext): number {
    return this.price - this.calculateDiscount(context);
  }

  protected calculateDiscount(context: PurchaseContext): number {
    return (this.price * (context.user.clientLevel * 10)) / 100;
  }
}