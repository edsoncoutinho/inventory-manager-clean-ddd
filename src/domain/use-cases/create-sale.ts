
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { SalesRepository } from "../repositories/sales-repository";
import { Sale } from "../entities/sale";
import { ProductsRepository } from "../repositories/products-repository";

interface createSaleUseCaseRequest {
  productId: string
  quantity: number
}

export class CreateSaleUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private salesRepository: SalesRepository
  ) {}

  async execute({ productId, quantity }: createSaleUseCaseRequest) {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const amount = product.salePrice * quantity

    product.removeStock = quantity

    await this.productsRepository.save(product)

    if (product.stock < product.minimumStock) {
      // Send a notification to the responsible person
      // Generate a purchase order
    }

    const sale = Sale.create({
      productId: new UniqueEntityID(productId),
      quantity,
      amount,
    })

    await this.salesRepository.create(sale)

    return { sale }
  }
}