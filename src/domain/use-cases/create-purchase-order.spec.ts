import { Product } from '../entities/product';
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository';
import { InMemoryPurchaseOrdersRepository } from '../repositories/in-memory/in-memory-purchase-orders-repository';
import { CreatePurchaseOrderUseCase } from './create-purchase-order';

let productsRepository: InMemoryProductsRepository
let purchaseOrdersRepository: InMemoryPurchaseOrdersRepository
let sut: CreatePurchaseOrderUseCase

describe('Create Purchase Order Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    purchaseOrdersRepository = new InMemoryPurchaseOrdersRepository()
    sut = new CreatePurchaseOrderUseCase(productsRepository, purchaseOrdersRepository)
  })

  it('should be able to create a new purchase order', async () => {
    const product = await productsRepository.create(
      Product.create({
        name: 'Product 1',
        description: 'Product description',
        size: 'M',
        color: 'Red',
        salePrice: 100,
        purchasePrice: 50,
        stock: 50,
        minimumStock: 30
      })
    )

    const { purchaseOrder } = await sut.execute({
      productId: product.id.toString(),
      quantity: 10
    })

    expect(purchaseOrder.quantity).toEqual(10)
    expect(product.stock).toEqual(60)
  })

})