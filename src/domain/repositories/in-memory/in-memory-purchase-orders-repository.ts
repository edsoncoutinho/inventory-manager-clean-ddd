import { PurchaseOrdersRepository } from '../purchase-orders-repository';
import { PurchaseOrder } from '@/domain/entities/purchase-order';

export class InMemoryPurchaseOrdersRepository implements PurchaseOrdersRepository {
  public items: PurchaseOrder[] = []

  async create(purchaseOrder: PurchaseOrder) {
    this.items.push(purchaseOrder)
    return purchaseOrder
  }
}