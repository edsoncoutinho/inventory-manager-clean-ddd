import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PurchaseOrdersRepository } from "../repositories/purchase-orders-repository";
import { PurchaseOrder } from "../entities/purchase-order";
import { ProductsRepository } from "../repositories/products-repository";

interface CreatePurchaseOrderUseCaseRequest {
  productId: string
  quantity: number
}

export class CreatePurchaseOrderUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private purchaseOrderRepository: PurchaseOrdersRepository
  ) {}

  async execute({ productId, quantity }: CreatePurchaseOrderUseCaseRequest) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    product.addStock = quantity

    await this.productsRepository.save(product)

    const purchaseOrder = PurchaseOrder.create({
      productId: new UniqueEntityID(productId),
      quantity,
    })

    await this.purchaseOrderRepository.create(purchaseOrder)

    return { purchaseOrder }
  }
}