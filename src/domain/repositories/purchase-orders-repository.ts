import { PurchaseOrder } from "../entities/purchase-order";

export interface PurchaseOrdersRepository {
  create: (purchaseOrder: PurchaseOrder) => Promise<PurchaseOrder>
}